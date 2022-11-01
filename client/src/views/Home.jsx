const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid xs={5}>
        <Item>xs=8</Item>
      </Grid>
      <Grid xs={3}>
        <Item>xs=4</Item>
      </Grid>
      <Grid xs={4}>
        <Item>xs=4</Item>
      </Grid>
    </Grid>
  </Box>
  );
}



const Home = () => {
    return (
      <div className ="mainPhotos">
        <ul className="cocktail-photos"> 
          <li><img src="../images/margirita.jpg" alt=""/></li>
          <li><img src="../images/martini.jpg" alt=""/></li>
          <li><img src="../images/redwhiteandblue.jpg" alt=""/></li>
        </ul>

      <ul className="burger-photos"> 
        <li><img src="../images/baconburger.jpg" alt=""/></li>
        <li><img src="../images/breakfeastburger.jpg" alt=""/></li>
        <li><img src="../images/veganburger.jpg" alt=""/></li>
      </ul>

      <ul className="dessert-photos"> 
        <li><img src="../images/chocolatecake.jpg" alt=""/></li>
        <li><img src="../images/sundae.jpg" alt=""/></li>
        <li><img src="../images/strawberrypancakes.jpg" alt=""/></li>
      </ul>


    </div>
    );
  };


