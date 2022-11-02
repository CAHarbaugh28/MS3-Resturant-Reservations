# Resturant Server Built with NodeJs & Express
---
>### /api/tables
	>>**GET /getAvailableTimes/:trow/:tcol/:rdate**
	>>Description: Return avaible times for the table and date. The data is queried from the the table_info and reservactions tables.
	>>Params
	>>- :trow is the row number of the table
	>>- :tcol is the column number of the table
	>>- :rdate is the date 2022-11-04 of the reservaction
	>>
	>>Response
	>>[`
		{
			"hours": "12:00:00"
		},
		{
			"hours": "13:00:00"
		},
		{
			"hours": "14:00:00"
		},
		{
			"hours": "15:00:00"
		}
	   ]`
	>>---
	>>**GET /getAvailableTables/:rdate/:rtime/:numseats**
	>>Description: Return availible tables by date and number of seats. The data is queried from the the open_list, table_info, and reservactions tables.
	>>Params
	>>- :rdate is the date (2022-11-04) of the reservation
	>>- :rtime is the time (07:00 PM) of the reservation
	>>- :numseats is the number of seats for the reservaction
	>>
	>>Response
	>>`[
		{
			"id": 5,
			"table_column": "B",
			"table_row": "1"
		},
		{
			"id": 6,
			"table_column": "B",
			"table_row": "2"
		},
		{
			"id": 7,
			"table_column": "B",
			"table_row": "3"
		},
		{
			"id": 8,
			"table_column": "B",
			"table_row": "4"
		}
	   ]`

>### /api/customers
	>>**POST /**
	>>Description: Saves or updates customer record. The data is inserted into the customer table.
	>>Request
		`{
			"firstName": "Bart",
			"lastName": "Mhoff",
			"phone": "1234445678",
			"email": "9015554347@gmail.com"
		}`
	>>
	>>Response
	>>`{
  		"customerid": 64
	  }`
	>>---
	>>**GET /:id**
	>>Description: Return customre record. The data is returned from the customer table.
	>>Params
	>>- :id is the primary key of the customer.
	>>
	>>Response
	>>`{
	"id": 63,
	"firstname": "Becky",
	"lastname": "Jones",
	"phone": "1015554347",
	"email": "9eASDF15554347@gmail.com",
	"created": "2022-10-30T22:07:13.918Z"
	}`


>### /api/reservations
	>>**GET /:id**
	>>Description: Returns the reservation record by primary key. The data is queried from the reservation table.
	>>Params
	>>- :id is the primary key of the customer.
	>>
	>>Response
	>>`{
  		"id": 1,
		"customerid": 1,
		"tableid": 1,
		"rdate": "2022-11-11T06:00:00.000Z",
		"rtime": "12:00:00",
		"arrived": false,
		"cancelled": false,
		"confirmationcode": "15520278",
		"created": "2022-10-30T18:06:58.143Z"
	   }`
	>>---
	>>**GET /getAllByDate/:rdate**
	>>Description: Returns all the reservations by date. The date is queried from the reservation table.
	>>Params
	>>- :id is the primary key of the customer.
	>>
	>>Response _(array for reservations)_
	>>`[
		{
			"id": 1,
			"customerid": 1,
			"tableid": 1,
			"rdate": "2022-11-11T06:00:00.000Z",
			"rtime": "12:00:00",
			"arrived": false,
			"cancelled": false,
			"confirmationcode": "15520278",
			"created": "2022-10-30T18:06:58.143Z"
		},
		{
			"id": 2,
			"customerid": 1,
			"tableid": 1,
			"rdate": "2022-11-11T06:00:00.000Z",
			"rtime": "13:00:00",
			"arrived": false,
			"cancelled": false,
			"confirmationcode": "A5028640",
			"created": "2022-10-30T18:06:58.143Z"
		}
	  ]`
	>>---	  
	>>**POST /**
	>>Description: Saves or updates the reservation record. The data is inserted into the reservation table. Responds with Confirmation Code to give to customer.
	>>Request
		`{
			"customerId":63,
			"tableId": 3,
			"rdate": "2022-11-20",
			"rtime": "05:00 PM"
		}`
	>>
	>>Response
	>>`{
		"confirmationcode": "D86533AE"
	  }`
	>>---
	>>**POST /cancel/:confirmationCode**
	>>Description: Cancelles reservation by confirmation code. The date is updated from the reservation table.
	>>Params
	>>- :confirmationCode is the code responded to after saving a new reservation. This is given to the customer text, email, etc.
	>>
	>>Response _(204 No Content)_
	>>
	>>---
	>>**POST /arrived/:confirmationCode**
	>>Description: Marks the reservation as arrived and possibly waiting or to check which customers showed up for their reservation. The date is updated from the reservation table.
	>>Params
	>>- :confirmationCode is the code responded to after saving a new reservation. This is given to the customer text, email, etc.
	>>
	>>Response _(204 No Content)_	
	>>