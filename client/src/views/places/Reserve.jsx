import React, {useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import BasicModal from '../../components/reserve';

export default function Reserve() {
    const [resTable, setResTable] = useState();
    const [formatedResTable, setResFormatedTable] = useState();
    const [resDate, setResDate ] = useState();
    const [resTime, setResTime ] = useState();
    const [formatedResDate, setResFormatedDate ] = useState();
    const [timeResponse, setTimeResponse] = useState();

    const onResTableChange = ({target}) => {
      const {value} = target;
      setResTable(value);
      setResFormatedTable(value.split("/"));
    }
    const onResDateChange = (target) => {
      setResDate(target);
      setResFormatedDate(`${target.$y}-${target.$M}-${target.$D}`);
    }
    const onResTimeChange = (target) => {
      debugger;
      setResTime(target);
    }

    useEffect(() =>{
      if (formatedResTable && formatedResDate) { 
        fetch(`/api/table/getAvailableTimes/${formatedResTable ? formatedResTable[0] : null}/${formatedResTable ? formatedResTable[1] : null}/${formatedResDate}`)
          .then(result => result.json())
          .then(body => {
            setTimeResponse(body);
          });
      }
    }, [ resDate, resTable, formatedResTable, formatedResDate] )

    function transformHours(inputHours) {
      switch (inputHours) {
        case "12:00:00":
          return "12:00PM";
        case "13:00:00":
          return "1:00PM";
        case "14:00:00":
          return "2:00PM";
        case "15:00:00":
          return "3:00PM";
        case "16:00:00":
          return "4:00PM";
        case "17:00:00":
          return "5:00PM";
        case "18:00:00":
          return "6:00PM";
        case "19:00:00":
          return "7:00PM";
        case "20:00:00":
          return "8:00PM";  
      };
    }
    
  return (

    <Box         
    display="flex" 
    width="100%" height= "auto" 
    paddingTop="1em"
    alignItems="center"
    textAlign="center"
    justifyContent="center"
    >
    <Paper>
        <div className="reservePage"/>
            <div className="tableSelect">
            <h2>Select a Table for Your Reservation</h2>
            <FormControl sx={{ mr: 5, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Table</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={resTable}
                label="Table"
                onChange={onResTableChange}
                >
                    <MenuItem value={'1/A'}>1A</MenuItem>
                    <MenuItem value={'1/B'}>1B</MenuItem>
                    <MenuItem value={'1/C'}>1C</MenuItem>
                    <MenuItem value={'1/D'}>1D</MenuItem>
                    <MenuItem value={'2/A'}>2A</MenuItem>
                    <MenuItem value={'2/B'}>2B</MenuItem>
                    <MenuItem value={'2/C'}>2C</MenuItem>
                    <MenuItem value={'3/A'}>3A</MenuItem>
                    <MenuItem value={'4/A'}>4A</MenuItem>
                    <MenuItem value={'4/B'}>4B</MenuItem>
                    <MenuItem value={'4/C'}>4C</MenuItem>
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                label="Reservation Date"
                inputFormat="MM/DD/YYYY"
                value={resDate}
                onChange={onResDateChange}
                renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            <br/>
            <div className="pickTime">
            <FormControl sx={{ mr: 5, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label-2">Available Times</InputLabel>
                <Select
                labelId="demo-simple-select-label-2"
                id="demo-simple-select-2"
                value={resTime}
                label="Availible Times"
                onChange={onResTimeChange}
                >
                  {timeResponse && timeResponse.map((row) => {

                    return <MenuItem value={row.hours}>{transformHours(row.hours)}</MenuItem>
                  })}
                </Select>
            </FormControl>              
            </div>
            {/* <Button>Next</Button> open modal for contact info */}
            <br/>
                <img src="images/tablesLayout.jpeg" alt="table selection"/>
                <div className='next'>
                <BasicModal/>
                </div>
            </div>
    </Paper>
    </Box>
  );

}

