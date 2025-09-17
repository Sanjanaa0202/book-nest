import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { FaBookOpen, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <div className='header'>
        <header className="navbar fixed-header">
        <div class="container header-container">
            <div class="logo">
                <FaBookOpen className="logo-icon"/>
                <span>BookNest</span>
            </div>
            <nav>
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/books'>Browse Books</Link></li>
                    <li><Link to='/wishlist'>Wishlist</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    {/* <li><Link to='/signin'>Sign In</Link></li> */}
                    <li>
                        <Link to='/signin'>
                            <FaUserCircle size={25} /> 
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    </div>
  )
}

export default Header
