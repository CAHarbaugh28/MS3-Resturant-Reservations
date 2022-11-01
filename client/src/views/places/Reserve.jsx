import React from 'react';

function Reserve () {
    return (
        <div className="makeReservation">
          <div className="pickTable">
            <h2>#1. Select which table you'd like to set your reservation for.</h2>

            <img src="images/tableLayout.jpeg" alt="table selection" useMap="#table_select" width="689px" height="409"/>

            <map name="table_select">
                <area shape="rect" coords="149, 24, 245, 85" alt="A1" href=""/>
                <area shape="rect" coords="225, 26, 346, 85" alt="A2" href="" />
                <area shape="rect" coords="351, 31, 445, 85" alt="A3" href="" />
                <area shape="rect" coords="452, 28, 534, 85" alt="A4" href="" />
                <area shape="poly" coords="144, 137, 193, 116, 230, 143, 175, 161" alt="B1" href="" />
                <area shape="rect" coords="317, 101, 373, 131" alt="B2" href=""/>
                <area shape="poly" coords="454, 145, 488, 120, 536, 142, 509, 170" alt="B3" href=""/>
                <area shape="rect" coords="107, 228, 141, 359" alt="C1" href=""/>
                <area shape="poly" coords="282, 196, 327, 166, 378, 193, 331, 227" alt="C2" href=""/>
                <area shape="poly" coords="505, 273, 542, 235, 616, 275, 580, 318" alt="C3" href=""/>
                <area shape="poly" coords="284, 334, 347, 283, 415, 331, 352, 385" alt="D1" href=""/>
            </map>
          </div>

            <div className="pickTimeDate">
                <h2>#2. Select a Date.</h2>
                <p for="reserveDate"></p>
                <input type="date" id="reserveDate" name="reservationDate"/>

                <h2>#3. Select Time.</h2>
                <p for="reserveTime"></p>
                <input type="time" id="reserveTime" name="reservationTime"/>
            </div>

            <div className="getCustInfo">
                <h2>#3. Add your reservation info.</h2>
                <form action="/users/create" method="POST">
                    <p for="fname">First Name</p>
                    <input type="text" id="fname" placeholder="Enter First Name" name="firstName" required/>

                    <p for="lname">Last Name</p>
                    <input type="text" id="lname" placeholder="Enter Last Name" name="lastName" required/>

                    <p for="phonenum">Phone Number</p>
                    <input type="text" id="phonenum" placeholder="Enter Phone Number" name="phoneNumber" required/>

                    <p for="email">Email</p>
                    <input type="text" id="email" placeholder="Enter Email Adress" name="emailAdress" required/>

                    <button type="submit">Submit</button>
                </form>
                </div>
        </div>
    )
}


export default Reserve;
