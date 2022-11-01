import React from 'react';
import {  makeStyles, createStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { BorderColor } from '@mui/icons-material';


const useStyles = makeStyles((theme: Theme) =>
createStyles({
	paper: {
	//padding: theme.spacing(2),
	textAlign: 'center',
	//color: theme.palette.text.secondary,
	},
	root: {
	flexGrow: 1,
	},
}),
);

const theme = createTheme();

export default function FullWidthGrid() {
const classes = useStyles();

return (
  <ThemeProvider theme={theme}>
	<div className ="reserveMain" style={{backgroundColor: '$light-white',
				padding: '2em', }}>
	<Grid container spacing={3}>

		<Grid item xs={10} sm={5}>
		<Paper className={classes.paper}>
            <div className="pickTable">
            <h2>Select a table</h2>

            <img src="images/tableLayout.jpeg" alt="table selection" width="689px" height="409"/>

            <div className="tableDd">
                <p>Choose a Table</p>
                <br/>
                    <button value="1a">1A</button>
                    <button value="1b">1B</button>
                    <button value="1c">1C</button>
                    <button value="1d">1D</button>
                    <br/>
                    <button value="2a">2A</button>
                    <button value="2b">2B</button>
                    <button value="2c">2C</button>
                    <br/>
                    <button value="3b">3B</button>
                    <button value="4a">4A</button>
                    <button value="4b">4B</button>
                    <button value="4c">4C</button>
            </div>

            {/* <map name="table_select">
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
            </map> */}
          </div>
        </Paper>
		</Grid>
		<Grid item xs={10} sm={3}>
		<Paper className={classes.paper}>
            <div className="pickTimeDate">
              <div className="pickDate">
                <p htmlFor="reserveDate">Choose a Date</p>
                <input type="date" id="reserveDate" name="reservationDate"/>
              </div>

              <div className="pickTime">
                <p htmlFor="reserveTime">Choose Time</p>
                <input type="time" id="reserveTime" name="reservationTime"/>
              </div>
              <button>Back</button>
            </div>
            </Paper>
		</Grid>
		<Grid item xs={10} sm={4}>
		<Paper className={classes.paper}>
            <div className="getCustInfo">
                <h2>Add your reservation information</h2>
                <form action="/users/create" method="POST">
                    <p htmlFor="fname">First Name</p>
                    <input type="text" id="fname" placeholder="Enter First Name" name="firstName" required/>

                    <p htmlFor="lname">Last Name</p>
                    <input type="text" id="lname" placeholder="Enter Last Name" name="lastName" required/>

                    <p htmlFor="phonenum">Phone Number</p>
                    <input type="text" id="phonenum" placeholder="Enter Phone Number" name="phoneNumber" required/>

                    <p htmlFor="email">Email</p>
                    <input type="text" id="email" placeholder="Enter Email Adress" name="emailAdress" required/>
                
                    <button type="submit">Submit</button>
                </form>
            </div>
            </Paper>
		</Grid>
	</Grid>
	</div>
  </ThemeProvider>
);
}