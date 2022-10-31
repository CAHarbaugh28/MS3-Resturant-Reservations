select * from public.table_info -- ti where ti.table_column = 1 and ti.table_row ='A'

select hl.hours
from public.hours_list hl
where hours not in (
	select r.*
	from public.reservations r
	inner join public.table_info ti 
		on r.table_id=ti.id
	where 
		ti.id = 1
		and r.r_date = '2022-11-11'
		and r.cancelled = true 
);

select ti.id, ti.table_column, ti.table_row 
from public.table_info ti 
where ti.seat_count = 4
	and ti.id not in (

select r.table_id 
from public.reservations r 
where 
	r.r_date = '2022-11-11'
	and r.r_time = '07:00 PM'
	and r.cancelled = false
)


select * from public.reservations r 	
	
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
(1, 1, '2022-11-11', '09:00 PM', CURRENT_TIMESTAMP, false, false)

delete from public.reservations where id = 12;

insert into public.reservations
(customer_id, table_id, r_date, r_time, created_date, arrived, cancelled)
values (2, 2, '2022-11-11', '09:00 PM', CURRENT_TIMESTAMP, false, false)


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
end;$$


DO
$$
DECLARE confirmationCode varchar(8);
BEGIN
CALL public.new_reservation(2,3, '2022-11-25','06:00:00 PM',confirmationCode);
raise notice 'ConfirmationId: %', confirmationCode;
end;
$$;


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


DO
$$
DECLARE customerId INT;
BEGIN
CALL public.upsert_customer('Phil','Jackson','8164059774','chdev77@gmail.com',customerId);
raise notice 'Value: %', customerId;
end;
$$;

select * from public.customer_info ci 


