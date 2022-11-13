import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Reserve from "./places/Reserve"
import { Link } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Home() {
  return (
    <div className="menuPictures">
    <Box sx={{ flexGrow: 1, padding: 0 }}>
    <Grid container spacing={1}>
      <Grid xs={4}>

           <img src="../images/margirita.jpg" alt=""/>
           <img src="../images/martini.jpg" alt=""/>
           <img src="../images/redwhiteandblue.jpg" alt=""/>

      </Grid>
      <Grid xs={4}>

          <img src="../images/baconburger.jpg" alt=""/>
          <div className='menuBtn'>
          <Link to="./reserve">Reserve by Table</Link>
          </div>
          <img src="../images/veganburger.jpg" alt=""/>
      </Grid>
      <Grid xs={4}>

            <img src="../images/chocolatecake.jpg" alt=""/>
            <img src="../images/sundae.jpg" alt=""/>
            <img src="../images/strawberrypancakes.jpg" alt=""/>

      </Grid>
    </Grid>
  </Box>
  </div>
  );
}



