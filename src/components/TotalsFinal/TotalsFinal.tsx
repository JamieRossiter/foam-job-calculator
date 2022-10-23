import React from "react";
import { Header, Button, Icon } from "semantic-ui-react";
import { CostTotals } from "../../utils/types";
import "./TotalsFinal.css";

export type TotalsFinalProps = {
    absoluteTotal: number,
    individualTotals: CostTotals,
    onClearAll: Function
}

function TotalsFinal(props: TotalsFinalProps): JSX.Element {
    return(
        <>
            <hr className="totals-final-divider" />
            <div className="totals-final-parent-container">
                <div className="totals-final-header-container">
                    <Header size="large">Total</Header>
                </div>
                <div className="totals-final-total-container">
                    <Header size="huge">${props.absoluteTotal.toFixed(2)}</Header>
                </div>
            </div>
            <div className="totals-final-parent-container">
                <div className="totals-final-header-container">
                    <Header size="small" color="grey">Foam Total</Header>
                </div>
                <div className="totals-final-total-container">
                    <Header size="medium">${props.individualTotals.foamTotal.toFixed(2)}</Header>
                </div>
            </div>
            <div className="totals-final-parent-container ">
                <div className="totals-final-header-container">
                    <Header size="small" color="grey">Polyester Total</Header>
                </div>
                <div className="totals-final-total-container">
                    <Header size="medium">${props.individualTotals.extrasTotal.toFixed(2)}</Header>
                </div>
            </div>
            <div className="totals-final-parent-container">
                <div className="totals-final-header-container">
                    <Header size="small" color="grey">Upholstery Total</Header>
                </div>
                <div className="totals-final-total-container">
                    <Header size="medium">${props.individualTotals.upholsteryTotal.toFixed(2)}</Header>
                </div>
            </div>
            <div className="totals-final-clear-button-container">
                    <Button icon color="red" labelPosition="right" onClick={() => props.onClearAll()}>
                        Clear All
                        <Icon name="x" />
                    </Button>
            </div>
        </>
    )
}

export default TotalsFinal;