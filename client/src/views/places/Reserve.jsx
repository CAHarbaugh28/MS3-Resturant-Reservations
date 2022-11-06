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
import PickTime from '../../components/pickTime';



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
    justifyContent="center">
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
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={setReservationDate}
                renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            <br/>
            <div className="pickTime">
            <PickTime/>
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

