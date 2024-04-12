import React from 'react';
import { Link } from 'react-router-dom';

// CSS
import '../styles/nav.css';

const NavComponent = () => {
  return (
    <div>
        <nav className='nav'>
            <ul>
                <li>
                <Link to="/">Form</Link>
                </li>
                <li>
                <Link to="/admin">Admin Dashboard</Link>
                </li>
            </ul>
        </nav>
    </div>
  );
}

export default NavComponent;