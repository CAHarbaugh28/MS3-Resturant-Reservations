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

delete from public.reservations where id = 4;

INSERT INTO public.reservations
(customer_id, table_id, r_date, r_time, created_date, arrived, cancelled)
VALUES(2, 2, '2022-11-11', '07:00 PM', CURRENT_TIMESTAMP, false, false);