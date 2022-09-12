import React from "react";
import "./AppHeader.css";
import { Label, Icon } from "semantic-ui-react";

function AppHeader(): JSX.Element {
    return(
        <>
            <div className="header-logo-container">
                <img src="logo.png" />
                <p>Foam and Upholstery Calculator</p>
                {/* <div className="header-creator-label-container">
                    <Label color="blue" size="small">
                        <Icon name="cog" />
                        Created by Jamie Rossiter
                    </Label>
                </div> */}
            </div>
        </>
    )
}

export default AppHeader;