import React from "react";
import "./TotalsItem.css";
import { Button, Icon, Label, Popup, SemanticICONS } from "semantic-ui-react";

type TotalsItemProps = {
    id?: string,
    name: string,
    image?: SemanticICONS,
    measurements: string,
    quantity: number,
    totalPrice: string,
    eachPrice?: string,
    sku: string,
    onDelete?: Function | undefined,
    isDeletable: boolean
}

function TotalsItem(props: TotalsItemProps): JSX.Element {

    function handleDelete(): void {
        if(!props.isDeletable){
            return;
        }
        if(props.onDelete) props.onDelete(props.id);
    }
    
    return(
        <>
            <div className="totals-item-parent-container">
                <div className="totals-item-image-container">
                    <Icon name={props.image ?? "square outline"} size="big" />
                </div>
                <div className="totals-item-info-container">
                    <p className="totals-item-name">{props.name}</p>
                    <p className="totals-item-dimensions">{props.measurements}</p>
                </div>
                <div className="totals-item-quantity-container">
                    <Label className="totals-item-quantity">x{props.quantity}</Label>
                </div>
                <div className="totals-item-price-container">
                    <p className="totals-item-price">${props.totalPrice} <span hidden={!props.eachPrice} className="totals-item-price-each">(${props.eachPrice} ea)</span></p>
                </div>
                <div className="totals-item-sku-container">
                    <p className="totals-item-sku">{props.sku}</p>
                </div>
                <div className="totals-item-button-container">
                    <Popup 
                        on="click"
                        header={<Icon name="warning sign"/>}
                        content="This item cannot be deleted from the quotation."
                        disabled={props.isDeletable} 
                        trigger={
                            <Button 
                                onClick={() => { handleDelete() }} 
                                icon="trash" 
                                circular 
                                basic 
                                color={props.isDeletable ? "red" : "grey"}
                            />
                        }
                    />
                </div>
            </div>
        </>
    )

}

export default TotalsItem;