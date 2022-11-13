import * as React from 'react';


export default function Menu () {
    return (
        <div className="menu">
            <h1>Menu</h1>
            <hr/>
            <div className="menuItems">
            <h3>Burgers</h3>
            <ul>
                <li>Bacon Jalapeno Pickle Burger<span className="dots"></span><span>$22.98</span></li>
                <li>Garden Burger *vegan<span className="dots"></span><span>$26.98</span></li>
            </ul>

            <h3>Drinks</h3>
            <ul>
                <li>Blue Frost Margarita<span className="dots"></span><span>$11.98</span></li>
                <li>Straberry Martini<span className="dots"></span><span>$13.98</span></li>
                <li>Red White and Blue<span className="dots"></span><span>$9.98</span></li>
            </ul>

            <h3>Deserts</h3>
            <ul>
                <li>Triple Fudge Chocolate Cake<span className="dots"></span><span>$11.98</span></li>
                <li>Strawberry Shortcak<span className="dots"></span><span>$13.98</span></li>
                <li>Powdered Sugar and Rasberry Pancakes<span className="dots"></span><span>$10.98</span></li>
            </ul>
            </div>

        </div>
    )
}