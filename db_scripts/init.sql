DROP TABLE IF EXISTS public.reservations;
DROP TABLE IF EXISTS public.customer_info;
DROP TABLE IF EXISTS public.table_info;

CREATE TABLE IF NOT EXISTS public.table_info
(
    id SERIAL PRIMARY KEY,
    table_column character varying COLLATE pg_catalog."default" NOT NULL,
    table_row numeric NOT NULL,
    seat_count numeric NOT NULL
);

INSERT INTO public.table_info (table_row, table_column, seat_count)
	VALUES 
    (1, 'A', 4), (2, 'A', 4), (3, 'A', 4), (4, 'A', 4), (1, 'B', 2), (2, 'B', 2), (3, 'B', 2), (4, 'B', 2), (1, 'C', 4), (2, 'C', 4), (3, 'C', 4), (4, 'C', 4);


CREATE TABLE IF NOT EXISTS public.customer_info
(
    id SERIAL PRIMARY KEY,
    first_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(10) COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    created_date timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT customer_info_phone_number_key UNIQUE (phone_number)
);

ALTER TABLE public.customer_info  ADD CONSTRAINT const_no_duplicate_customer UNIQUE (first_name,last_name,phone_number,email);

INSERT INTO public.customer_info (first_name, last_name, phone_number, email)
	VALUES ('Corey', 'Harbaugh', 8164053997, 'corey.harbaugh@gmail.com');

INSERT INTO public.customer_info (first_name, last_name, phone_number, email)
VALUES('Carter', 'Harbaugh', '1231234444', 'carter.harbaugh@gmail.com');




CREATE OR REPLACE FUNCTION public.reservation_confirmation_code() RETURNS varchar(8)
AS $$
DECLARE
    new_code varchar(8);
BEGIN
	new_code := UPPER(SUBSTRING(MD5(''||NOW()::TEXT||RANDOM()::TEXT) FOR 8));
	RETURN new_code;
END;
$$ LANGUAGE PLPGSQL;

CREATE TABLE IF NOT EXISTS public.reservations
(
    id SERIAL PRIMARY KEY,
    customer_id integer NOT NULL,
    table_id integer NOT NULL,
    r_date date NOT NULL,
    r_time time without time zone NOT NULL,
    created_date timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    arrived boolean NOT NULL DEFAULT false,
    cancelled boolean NOT NULL DEFAULT false,
	confirmationId varchar(8) NOT NULL DEFAULT reservation_confirmation_code(),
    CONSTRAINT "customerID_to_reservation_table" FOREIGN KEY (customer_id)
        REFERENCES public.customer_info (id) MATCH FULL
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
        NOT VALID,
    CONSTRAINT "tableID_to_reservation_table" FOREIGN KEY (table_id)
        REFERENCES public.table_info (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
	CONSTRAINT const_no_duplicate_reservations UNIQUE (customer_id,table_id,r_date,r_time)
);


INSERT INTO public.reservations
(customer_id, table_id, r_date, r_time, created_date, arrived, cancelled)
values (1, 1, '2022-11-11', '12:00 PM', CURRENT_TIMESTAMP, false, false),
(1, 1, '2022-11-11', '01:00 PM', CURRENT_TIMESTAMP, false, false),
(1, 1, '2022-11-11', '02:00 PM', CURRENT_TIMESTAMP, false, false),
(1, 1, '2022-11-11', '03:00 PM', CURRENT_TIMESTAMP, false, false),
(1, 1, '2022-11-11', '04:00 PM', CURRENT_TIMESTAMP, false, false),
(1, 1, '2022-11-11', '05:00 PM', CURRENT_TIMESTAMP, false, false),
(1, 1, '2022-11-11', '06:00 PM', CURRENT_TIMESTAMP, false, false),
(1, 1, '2022-11-11', '07:00 PM', CURRENT_TIMESTAMP, false, false),
(1, 1, '2022-11-11', '08:00 PM', CURRENT_TIMESTAMP, false, false),
(1, 1, '2022-11-11', '09:00 PM', CURRENT_TIMESTAMP, false, false);

delete from public.reservations where id = 4;

INSERT INTO public.reservations
(customer_id, table_id, r_date, r_time, created_date, arrived, cancelled)
VALUES(2, 2, '2022-11-11', '07:00 PM', CURRENT_TIMESTAMP, false, false);




DROP INDEX IF EXISTS public."fki_C";

CREATE INDEX IF NOT EXISTS "fki_C"
    ON public.reservations USING btree
    (customer_id ASC NULLS LAST)
    TABLESPACE pg_default;


DROP INDEX IF EXISTS public."fki_customerID to Reservations table";

CREATE INDEX IF NOT EXISTS "fki_customerID to Reservations table"
    ON public.reservations USING btree
    (customer_id ASC NULLS LAST)
    TABLESPACE pg_default;


DROP INDEX IF EXISTS public."fki_tableID to Reservations table";

CREATE INDEX IF NOT EXISTS "fki_tableID to Reservations table"
    ON public.reservations USING btree
    (table_id ASC NULLS LAST)
    TABLESPACE pg_default;


DROP INDEX IF EXISTS public."fki_tableID_to_reservation-table";

CREATE INDEX IF NOT EXISTS "fki_tableID_to_reservation-table"
    ON public.reservations USING btree
    (table_id ASC NULLS LAST)
    TABLESPACE pg_default;


DROP TABLE IF EXISTS public.hours_list;

CREATE TABLE IF NOT EXISTS public.hours_list
(
    id SERIAL PRIMARY KEY,
	hours time without time zone NOT NULL
);

insert into public.hours_list (hours) values ('12:00 PM'), 
('01:00 PM'), ('02:00 PM'), ('03:00 PM'), ('04:00 PM'), ('05:00 PM'), 
('06:00 PM'), ('07:00 PM'), ('08:00 PM');

create or replace procedure public.new_reservation(
	customerId int,
	tableId int,
	rdate date,
	rtime time, 
	inout confirmationCode varchar(8)
)
language plpgsql    
as $$
begin
	insert into public.reservations
	(customer_id, table_id, r_date, r_time)
	values (customerId, tableId, rdate, rtime)
	on conflict on constraint const_no_duplicate_reservations do nothing;
	
	select confirmationId 
	into confirmationCode 
	from public.reservations r 
	where customer_id = customerId
		and table_id = tableId 
		and r_date = rdate
		and r_time = rtime;
		
    commit;
end;$$;


-- DO
-- $$
-- DECLARE confirmationCode varchar(8);
-- BEGIN
-- CALL public.new_reservation(2,3, '2022-11-25','06:00:00 PM',confirmationCode);
-- raise notice 'ConfirmationId: %', confirmationCode;
-- end;
-- $$;


create or replace procedure public.upsert_customer(
	fname varchar(20),
	lname varchar(20),
	phone varchar(10),
	eaddy varchar,
	inout customerId int
)
language plpgsql    
as $$
begin
	insert into public.customer_info 
		(first_name, last_name, phone_number, email)
	values 
		(fname, lname, phone, eaddy)
	on conflict on constraint const_no_duplicate_customer do nothing;
	
	select id
	into customerId
	from public.customer_info r 
	where first_name = fname 
		and last_name = lname
		and phone_number = phone
		and email = eaddy
	limit 1;

    commit;
end
$$;


drop user if exists api_user;

create user api_user;

alter user api_user with encrypted password 'Trains2022';

alter table if exists public.reservations
owner to api_user;

alter table if exists public.customer_info
owner to api_user;

alter table if exists public.table_info
owner to api_user;

alter table if exists public.hours_list
owner to api_user;

