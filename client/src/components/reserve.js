import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { bgcolor, fontFamily, textAlign } from '@mui/system';
import Stack from '@mui/material/Stack';

const customerInfo = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    bgcolor: 'white',
    border: '4px solid #',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px'
  };

const modalHeader = {
    pb: 5,
    color: '#656256',
    fontFamily: 'Optima, sans-serif;',
    fontSize: '30px',
    textAlign: 'center',
  };

const reserveBtn = {
    textTransform: 'none',
    color: '#EBE0CE',
    fontFamily: 'Optima, sans-serif;',
    fontSize: '24px',
    bgcolor: '#656256',

}


  export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div className='custModal'>
        <Button onClick={handleOpen}>Make Reservation</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack  
            component="form" 
            sx={customerInfo}
            spacing={2}
            noValidate
            autoComplete="off">

                <Typography sx={modalHeader}>Enter Your Info</Typography>

                <TextField
                required
                id="outlined-required"
                label="First Name"

                />
                <TextField
                required
                id="outlined-required"
                label="Last Name"

                />
                <TextField
                required
                id="outlined-required"
                label="Phone Number"

                />
                <TextField
                id="outlined-required"
                label="Email Address"
                />
                <Button sx={reserveBtn} onClick={handleOpen}>Reserve</Button>
          </Stack>
        </Modal>
      </div>
    );
  }