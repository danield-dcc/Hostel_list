import React from 'react'
import { Link } from "react-router-dom"

const TituloNavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <Link to="/" className="navbar-brand" href="#">
                <img src="logo_mochila.png" alt="Logo" width="40;" />
                Hostels e pousadas de destaque
            </Link>
            
        </nav>
    )
}

export default TituloNavBar;