import React from "react";
import "./TotalsItem.css";
import { Button, Label } from "semantic-ui-react";

function TotalsItem(): JSX.Element {

    return(
        <>
            <div className="totals-item-parent-container">
                <div className="totals-item-image-container">
                    <img src="placeholder.jpeg" />
                </div>
                <div className="totals-item-info-container">
                    <p className="totals-item-name">Enduro Foam - 75mm</p>
                    <p className="totals-item-dimensions">300 x 800 x 75mm</p>
                </div>
                <div className="totals-item-quantity-container">
                    <Label className="totals-item-quantity">x1</Label>
                </div>
                <div className="totals-item-price-container">
                    <p className="totals-item-price">$183.40 <span className="totals-item-price-each">($183.40ea)</span></p>
                </div>
                <div className="totals-item-sku-container">
                    <p className="totals-item-sku">SKU: 10276</p>
                </div>
                <div className="totals-item-button-container">
                    <Button icon="trash" circular basic color="red" />
                </div>
            </div>
        </>
    )

}

export default TotalsItem;