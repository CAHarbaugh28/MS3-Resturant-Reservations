DROP TABLE IF EXISTS public.table_info;

CREATE TABLE IF NOT EXISTS public.table_info
(
    id SERIAL PRIMARY KEY,
    table_column numeric NOT NULL,
    table_row character varying COLLATE pg_catalog."default" NOT NULL,
    seat_count numeric NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.table_info
    OWNER to postgres;

INSERT INTO public.table_info (table_column, table_row, seat_count)
	VALUES 
    (1, 'A', 4), (2, 'A', 4), (3, 'A', 4), (4, 'A', 4), (1, 'B', 2), (2, 'B', 2), (3, 'B', 2), (4, 'B', 2), (1, 'C', 4), (2, 'C', 4), (3, 'C', 4), (4, 'C', 4);

GO

DROP TABLE IF EXISTS public.customer_info;

CREATE TABLE IF NOT EXISTS public.customer_info
(
    id SERIAL PRIMARY KEY,
    first_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(10) COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    created_date timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT customer_info_phone_number_key UNIQUE (phone_number)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.customer_info
    OWNER to postgres;

INSERT INTO public.customer_info (first_name, last_name, phone_number, email)
	VALUES ('Corey', 'Harbaugh', 8164053997, 'corey.harbaugh@gmail.com');

GO

-- DROP TABLE IF EXISTS public.reservations;

CREATE TABLE IF NOT EXISTS public.reservations
(
    id SERIAL PRIMARY KEY,
    customer_id integer NOT NULL,
    table_id integer NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    created_date timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    arrived boolean NOT NULL DEFAULT false,
    cancelled boolean NOT NULL DEFAULT false,
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
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reservations
    OWNER to postgres;


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
