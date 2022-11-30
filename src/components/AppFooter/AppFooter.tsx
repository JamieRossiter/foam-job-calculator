import React from "react";
import { Icon } from "semantic-ui-react";
import "./AppFooter.css";

function AppFooter(): JSX.Element {

    return(
        <>
            <div className="footer-parent-container">
                <Icon name="cog" />
                <p>Created by <a href="https://www.github.com/JamieRossiter" target="_blank">Jamie Rossiter</a> (© 2022)</p>
            </div>
        </>
    )

}

export default AppFooter;