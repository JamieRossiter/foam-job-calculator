import React from "react";
import { Header, Button, Icon } from "semantic-ui-react";
import "./TotalsFinal.css";

function TotalsFinal(): JSX.Element {
    return(
        <>
            <hr />
            <div className="totals-final-parent-container">
                <div className="totals-final-header-container">
                    <Header size="large">Total</Header>
                </div>
                <div className="totals-final-total-container">
                    <Header size="huge">$475.90</Header>
                </div>
            </div>
            <div className="totals-final-clear-button-container">
                    <Button icon color="red" labelPosition="right">
                        Clear All
                        <Icon name="x" />
                    </Button>
            </div>
        </>
    )
}

export default TotalsFinal;