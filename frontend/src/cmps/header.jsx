import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
    return <header className="main-header" >
        <nav className="header-nav container">
            <h1>These are our toys</h1>
            <NavLink className="header-link" to="/">Home</NavLink>
            <NavLink className="header-link" to="/toy">Toys</NavLink>
        </nav>
    </header>
}
