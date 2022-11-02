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

    const [age, setAge] = React.useState('');
    const [date, setValue] = React.useState(dayjs());
    const setTableSelection = (event) => {
      setAge(event.target.value);
    };

    const setReservationDate = (newValue) => {
      setValue(newValue);
    };

  return (

    <Box         
    display="flex" 
    width="100%" height= "auto" 
    paddingTop="1em"
    alignItems="center"
    textAlign="center"
    justifyContent="center"
    colro>
    <Paper>
        <div className="reservePage"/>
            <div className="tableSelect">
            <h2>Select a Table for Your Reservation</h2>
            <FormControl sx={{ mr: 5, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Table</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={setTableSelection}
                >
                    <MenuItem value={1}>1A</MenuItem>
                    <MenuItem value={2}>1B</MenuItem>
                    <MenuItem value={3}>1C</MenuItem>
                    <MenuItem value={4}>1D</MenuItem>
                    <MenuItem value={5}>2A</MenuItem>
                    <MenuItem value={6}>2B</MenuItem>
                    <MenuItem value={7}>2C</MenuItem>
                    <MenuItem value={8}>3A</MenuItem>
                    <MenuItem value={9}>3B</MenuItem>
                    <MenuItem value={10}>3C</MenuItem>
                    <MenuItem value={11}>4A</MenuItem>
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={date}
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

