import React, {useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


export default function Confirmation () {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const code = {
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

    return (
        <div className='confirmation'>
        <Button onClick={handleOpen}>Set Reservation</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Stack  
                component="form" 
                sx={code}
                spacing={2}
                noValidate
                autoComplete="off">
                <Typography sx={modalHeader}>Your Confirmation Code</Typography>
                <h2>483920483290</h2>

            </Stack>

            </Modal>
        </div>
    )
}