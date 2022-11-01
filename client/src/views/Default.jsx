import React from "react"
import '../scss/style.scss'
import { Link } from 'react-router-dom'



function Header () {
    return (
        <div className='header'>
            <h1>~ Carter's Gourmet Burgers ~</h1>
            <nav className='headerNav'>
                <ul>
                    <Link to="./">Home</Link>
                    <Link to="./menu">Menu</Link>
                    <Link to="./reserve">Reserve by Table</Link>
                </ul>
            </nav>
         </div>
    )
}

export default Header