import React from 'react'
import { Link } from "react-router-dom";
import './styles.css';

//Component to show Navigation bar
function NavigationBar() {
    return (
        <div className="nav">
            <div className="nav-item">
                <span className="nav-link"><Link className="nav-link-text" to="/">Todos</Link></span>
                <span className="nav-link"><Link className="nav-link-text" to="/users">Users</Link></span>
            </div>
        </div>
    )
}

export default NavigationBar
