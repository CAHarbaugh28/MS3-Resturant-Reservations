import React from 'react';

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


export default Home;
