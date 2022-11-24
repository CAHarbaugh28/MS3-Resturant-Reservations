import React, {useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {SaveCustomerAndMakeReservation} from '../api';
import Confirmation from './comfirmation';

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

  export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [fname, setCustFName] = useState();
    const [lname, setCustLName] = useState();
    const [phonenum, setCustPhoneNum] = useState();
    const [email, setCustEmail] = useState();
  
  
    const onCustFNameChange = ({target}) => {
      const {value} = target;
      setCustFName(value);
    }
    const onCustLNameChange = ({target}) => {
      const {value} = target;
      setCustLName(value);
    }
    const onCustPhoneNumChange = ({target}) => {
      const {value} = target;
      setCustPhoneNum(value);
    }
    const onCustEmailChange = ({target}) => {
      const {value} = target;
      setCustEmail(value);
    }

    async function save(){
      debugger;
      var customer = {
        firstName: fname,
        lastName: lname,
        phone: phonenum,
        email: email
      }
      var reservation = {
        tableid: props.tableId,
        rdate: props.rdate,
        rtime: props.rtime
      }
      var confirmationCode = await SaveCustomerAndMakeReservation(customer, reservation);
      debugger;
    }

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
                value={fname}
                onChange={onCustFNameChange}

                />
                <TextField
                required
                id="outlined-required"
                label="Last Name"
                value={lname}
                onChange={onCustLNameChange}

                />
                <TextField
                required
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                id="outlined-required"
                label="Phone Number"
                value={phonenum}
                onChange={onCustPhoneNumChange}

                />
                <TextField
                id="outlined-required"
                label="Email Address"
                value={email}
                onChange={onCustEmailChange}
                />
                <Button sx={reserveBtn} onClick={save}>Reserve</Button>
                {/* <Confirmation/> */}
          </Stack>
        </Modal>
      </div>
    );
    if (!props.rrow || !props.rcol || !props.rdate || !props.rtime) {

      return; 
    }
  }