import React from "react";
import "./AppHeader.css";

function AppHeader(): JSX.Element {
    return(
        <>
            <div className="header-logo-container">
                <img src="logo.png" />
                <p>Foam and Upholstery Calculator</p>
            </div>
        </>
    )
}

export default AppHeader;