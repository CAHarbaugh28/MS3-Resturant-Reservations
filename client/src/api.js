export function SaveCustomerAndMakeReservation(customer, reservation){
    console.log(JSON.stringify(customer));
    fetch('/api/customer', {
        method: 'POST',
        //mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    })
    .then(result => result.json())
    .then(body => {
        fetch('/api/reservation', {
            method: 'POST',
            //mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(setupReservation(body.customerid, reservation))
        })
        .then(result => result.json())
        .then( body => {
            return body; //confirmationCode
        });  
    });
}

function setupReservation(customerid, reservation) {
    return {
        customerId: customerid,
        tableId: reservation.tableid,
        rdate: reservation.rdate,
        rtime: reservation.rtime
    }
}