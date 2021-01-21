import React from 'react';

import "./forum.css";

const TopBar = props => {
    return (
        <div className="forum-appbar">
            <img 
                className="unir-banner"
                alt="unir" 
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Wu_fS0dkmzySGilebvpqfwHaB5%26pid%3DApi&f=1" 
            />
            <button className="logout-btn">
                Cerrar sesión
            </button>
        </div>
    );
}

export default TopBar;
