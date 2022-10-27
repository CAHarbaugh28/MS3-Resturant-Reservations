SELECT * FROM table_info;
SELECT * FROM reservations;
SELECT * FROM customer_info;


SELECT customer_info.*, reservations.*
FROM reservations, customer_info 
WHERE reservations.customer_id=customer_info.id;

select *
from reservations r
inner join customer_info c
    on r.customer_id=c.id;
    
    
    
INSERT INTO public.reservations(
	customer_id, table_id, date, "time")
	VALUES (1000, 3, '2022-11-04', '08:00 PM');
    
ALTER TABLE reservations 
ADD cancelled BOOLEAN NOT NULL
CONSTRAINT DEFAULT_CANCELLED
DEFAULT false;