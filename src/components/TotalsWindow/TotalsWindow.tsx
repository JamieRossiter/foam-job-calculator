import React from "react";
import TotalsItem from "../TotalsItem/TotalsItem";
import TotalsFinal from "../TotalsFinal/TotalsFinal";
import { UserItemObject } from "../../utils/types"; 
import "./TotalsWindow.css";

type TotalsWindowProps = {
    items: Array<UserItemObject>
}

function TotalsWindow(props: TotalsWindowProps): JSX.Element {

    function createFoamItems(): Array<JSX.Element> {
        return props.items.map((item: UserItemObject) => <TotalsItem name={item.foam.name} measurements={item.foam.dimensions} quantity={item.foam.quantity} totalPrice={item.foam.totalPrice} eachPrice={item.foam.eachPrice} sku={item.foam.sku} />)
    }

    function createPolyesterItem(): JSX.Element | undefined {

        if(props.items.length <= 0) return;
        
        let totalPolyPrice: number = 0;
        let totalPolyLength: number = 0;

        props.items.forEach((item: UserItemObject) => {
            totalPolyPrice += parseInt(item.extras.polyTotalPrice);
            totalPolyLength += parseInt(item.extras.polyLength);
        });

        return <TotalsItem name="Polyester Fibre" measurements={totalPolyLength.toString()} quantity={1} totalPrice={totalPolyPrice.toFixed(2)} eachPrice={"16.95"} sku="SKU: 293488"/>;
    }

    function createPolyesterLabourItem(): JSX.Element | undefined {

        if(props.items.length <= 0) return;

        let totalPolyLabourCost: number = 0;
        
        props.items.forEach((item: UserItemObject) => {
            totalPolyLabourCost += parseInt(item.extras.labourPrice);
        })

        return <TotalsItem name="Labour for Cut and Glue" measurements="0" quantity={1} totalPrice={totalPolyLabourCost.toFixed(2)} eachPrice="0" sku="SKU: 813" />;

    }

    function createFabricItems(): Array<JSX.Element> {

        let fabricCostMerger: {[fabricSku: string]: {totalLength: number, totalPrice: number}} = {};

        props.items.forEach((item: UserItemObject) => {

            if(!fabricCostMerger[item.upholstery.sku]) fabricCostMerger[item.upholstery.sku] = { totalLength: 0, totalPrice: 0 }; // Initialise on first entry only
            fabricCostMerger[item.upholstery.sku].totalLength += parseInt(item.upholstery.fabricLength);
            fabricCostMerger[item.upholstery.sku].totalPrice += parseInt(item.upholstery.fabricPrice);
                    
        })

        return Object.keys(fabricCostMerger).map((sku: string) => {

            const targetFabric: UserItemObject | undefined = props.items.find((item: UserItemObject) => item.upholstery.sku === sku);
            if(!targetFabric) return <></>;
            return <TotalsItem name={targetFabric.upholstery.fabricName} measurements={fabricCostMerger[sku].totalLength.toFixed()} quantity={1} totalPrice={fabricCostMerger[sku].totalPrice.toFixed(2)} eachPrice={targetFabric.upholstery.fabricPmPrice} sku={`SKU: ${sku}`} />;
        
        })

    }

    function createUpholsteryLabourItem(): JSX.Element | undefined {

        if(props.items.length <= 0) return;

        let totalUpholsteryLabourCost: number = 0;
        
        props.items.forEach((item: UserItemObject) => {
            totalUpholsteryLabourCost += parseInt(item.upholstery.estimatedLabour);
        })

        return <TotalsItem name="Estimated Upholstery Labour" measurements="0" quantity={1} totalPrice={totalUpholsteryLabourCost.toFixed(2)} eachPrice="0" sku="SPECIAL ITEM" />;

    }

    return(
        <>
            <div className="totals-window-items-container">
                <div className="totals-window-foam-items-container">
                    {createFoamItems()}
                </div>
                <hr hidden={props.items.length <= 0} />
                <div className="totals-window-extras-items-container">
                    {createPolyesterItem()}
                    {createPolyesterLabourItem()}
                </div>
                <hr hidden={props.items.length <= 0} />
                <div className="totals-window-upholstery-items-container">
                    {createFabricItems()}
                    {createUpholsteryLabourItem()}
                </div>
            </div>
            <TotalsFinal />
        </>
    )

}

export default TotalsWindow;