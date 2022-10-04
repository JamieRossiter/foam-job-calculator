import React from "react";
import "./TotalsItem.css";
import { Button, Label } from "semantic-ui-react";

type TotalsItemProps = {
    name: string,
    image?: string,
    measurements: string,
    quantity: number,
    totalPrice: string,
    eachPrice: string,
    sku: string
}

function TotalsItem(props: TotalsItemProps): JSX.Element {

    return(
        <>
            <div className="totals-item-parent-container">
                <div className="totals-item-image-container">
                    <img src={props.image ?? "placeholder.jpeg"} />
                </div>
                <div className="totals-item-info-container">
                    <p className="totals-item-name">{props.name}</p>
                    <p className="totals-item-dimensions">{props.measurements}</p>
                </div>
                <div className="totals-item-quantity-container">
                    <Label className="totals-item-quantity">x{props.quantity}</Label>
                </div>
                <div className="totals-item-price-container">
                    <p className="totals-item-price">${props.totalPrice} <span className="totals-item-price-each">(${props.eachPrice} ea)</span></p>
                </div>
                <div className="totals-item-sku-container">
                    <p className="totals-item-sku">{props.sku}</p>
                </div>
                <div className="totals-item-button-container">
                    <Button icon="trash" circular basic color="red" />
                </div>
            </div>
        </>
    )

}

export default TotalsItem;