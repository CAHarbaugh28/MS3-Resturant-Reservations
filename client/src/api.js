export async function SaveCustomerAndMakeReservation(customer, reservation){
    const customerid = await fetch('/api/customer', {
        method: 'POST',
        //mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    })
    .then(result => result.json())
    .then(body => {
        debugger;
        return body.customerid;
    });
debugger;
console.log(customerid);
    await fetch('/api/reservation', {
        method: 'POST',
        //mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(setupReservation(customerid, reservation))
    })
    .then(result => result.json())
    .then( body => {
        debugger;
        return body; //confirmationCode
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