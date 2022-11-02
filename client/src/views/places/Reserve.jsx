import * as React from 'react';
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [currentSelectedTableSate, setSelectedTableState] = React.useState('');
    const [currentReservationDateState, setReservationDateState] = React.useState('');
    const [currentAvailableTimesFromServer, setAvailableTimesFromServer] = React.useState([]);
    const [formattedTableColRowArraryForApi, setFormattedTableColRowArraryForApi] = React.useState([]);
    const [formateedDateForApi, setFormateedDateForApi] = React.useState('');

    const setSelectedTable = (value) => {
      setSelectedTableState(value.target.value);

      setFormattedTableColRowArraryForApi(value.target.value.split("/")); //we need to split here because the need passed into the api as row & col separatly parameters
    };

    const setReservationDate = (value) => {
      setReservationDateState(value);

      setFormateedDateForApi(`${value.$y}-${value.$M}-${value.$D}`);
      var serverResposneTimes = getAvailableTimes(formattedTableColRowArraryForApi[0], formattedTableColRowArraryForApi[1], `${value.$y}-${value.$M}-${value.$D}`);
      setAvailableTimesFromServer(serverResposneTimes);
    };

    const getAvailableTimes = (trow, tcol, rdate) => {
      fetch(`/api/table/getAvailableTimes/${trow}/${tcol}/${rdate}`)
        .then(result => result.json())
        .then(body => {
          console.log(body);
          setAvailableTimesFromServer(body);
        });
    };

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
                value={currentSelectedTableSate}
                label="Table"
                onChange={setSelectedTable}
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
                value={currentReservationDateState}
                onChange={setReservationDate}
                renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            <br/>
            <div>
                <h3>Available Times</h3>
                <p>12:00pm 1:00pm 2:00pm 3:00pm 4:00pm 5:00pm 6:00pm 7:00pm 8:00pm</p>
            </div>
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

