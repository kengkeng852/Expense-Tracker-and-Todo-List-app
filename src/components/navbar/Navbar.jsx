import "./navbar.css";
import React from 'react';

const Navbar = () => {
    return (
        <header>
            <a href="/" className="logo">Kengy<span>.</span></a> 
            <nav className="navbar">
                <a href="/">Home</a>
                <a href="/todo">TodoList</a>
                <a href="/expense">ExpenseTracker</a>
            </nav>
        </header>
    );
}

export default Navbar;