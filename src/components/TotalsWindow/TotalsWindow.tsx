import React from "react";
import TotalsItem from "../TotalsItem/TotalsItem";
import TotalsFinal from "../TotalsFinal/TotalsFinal";
import { CostTotals, UserItemObject } from "../../utils/types"; 
import "./TotalsWindow.css";
import { Icon } from "semantic-ui-react";

type TotalsWindowProps = {
    items: Array<UserItemObject>,
    onDeleteItem: Function
    onClearAll: Function
}

function TotalsWindow(props: TotalsWindowProps): JSX.Element {

    function createFoamItems(): Array<JSX.Element> {
        return props.items.map((item: UserItemObject) => <TotalsItem id={item.id} name={item.foam.name} measurements={item.foam.dimensions} quantity={item.foam.quantity} totalPrice={item.foam.totalPrice.toFixed(2)} eachPrice={item.foam.eachPrice.toFixed(2)} sku={`SKU: ${item.foam.sku}`} onDelete={(id: string) => {props.onDeleteItem(id)}} isDeletable={true} />)
    }

    function createPolyesterItem(): JSX.Element | undefined {

        if(props.items.length <= 0) return;
        
        let totalPolyPrice: number = 0;
        let totalPolyLength: number = 0;

        props.items.forEach((item: UserItemObject) => {
            totalPolyPrice += item.extras.polyTotalPrice;
            totalPolyLength += item.extras.polyLength;
        });

        const metres: number = totalPolyLength / 1000;

        return <TotalsItem name="Polyester Fibre" measurements={`${metres}m`} quantity={1} totalPrice={Number(totalPolyPrice).toFixed(2)} eachPrice={"16.95"} sku="SKU: 293488" isDeletable={false}/>;
    }

    function createPolyesterLabourItem(): JSX.Element | undefined {

        if(props.items.length <= 0) return;

        let totalPolyLabourCost: number = 0;
        
        props.items.forEach((item: UserItemObject) => {
            totalPolyLabourCost += item.extras.labourPrice;
        })

        return <TotalsItem name="Labour for Cut and Glue" measurements="LABOUR" quantity={1} totalPrice={totalPolyLabourCost.toFixed(2)} sku="SKU: 813" isDeletable={false} />;

    }

    function createFabricItems(): Array<JSX.Element> {

        let fabricCostMerger: {[fabricSku: string]: {totalLength: number, totalPrice: number}} = {};

        props.items.forEach((item: UserItemObject) => {

            if(!fabricCostMerger[item.upholstery.sku]) fabricCostMerger[item.upholstery.sku] = { totalLength: 0, totalPrice: 0 }; // Initialise on first entry only
            fabricCostMerger[item.upholstery.sku].totalLength += item.upholstery.fabricLength;
            fabricCostMerger[item.upholstery.sku].totalPrice += item.upholstery.fabricPrice;
                    
        })

        return Object.keys(fabricCostMerger).map((sku: string) => {

            const targetFabric: UserItemObject | undefined = props.items.find((item: UserItemObject) => item.upholstery.sku === sku);
            if(!targetFabric) return <></>;
            return <TotalsItem name={targetFabric.upholstery.fabricName} measurements={`${(fabricCostMerger[sku].totalLength / 1000).toFixed(2)}m`} quantity={1} totalPrice={fabricCostMerger[sku].totalPrice.toFixed(2)} eachPrice={targetFabric.upholstery.fabricPmPrice.toFixed(2)} sku={`SKU: ${sku}`} isDeletable={false} />;
        
        })

    }

    function createUpholsteryLabourItem(): JSX.Element | undefined {

        if(props.items.length <= 0) return;

        let totalUpholsteryLabourCost: number = 0;
        
        props.items.forEach((item: UserItemObject) => {
            totalUpholsteryLabourCost += item.upholstery.estimatedLabour;
        })

        return <TotalsItem name="Upholstery Labour (estimated)" measurements="LABOUR" quantity={1} totalPrice={totalUpholsteryLabourCost.toFixed(2)} sku="SPECIAL ITEM" isDeletable={false} />;

    }

    function calculateAbsoluteTotal(): number {

        const indTotals: CostTotals = calculateIndividualTotals();
        return indTotals.foamTotal + indTotals.extrasTotal + indTotals.upholsteryTotal;

    }

    function calculateIndividualTotals(): CostTotals {

        let foamTotalCost: number = 0;
        let extrasTotalCost: number = 0;
        let upholsteryTotalCost: number = 0;

        props.items.forEach((item: UserItemObject) => {

            foamTotalCost += item.foam.totalPrice;
            extrasTotalCost += item.extras.polyTotalPrice + item.extras.labourPrice;
            upholsteryTotalCost += item.upholstery.fabricPrice + item.upholstery.estimatedLabour;

        })

        return { foamTotal: foamTotalCost, extrasTotal: extrasTotalCost, upholsteryTotal: upholsteryTotalCost }

    }

    return(
        <>  
            <>
                <div className="totals-window-items-container">
                    {
                        props.items.length <= 0 
                        ? <>
                            <div className="totals-window-placeholder">
                                <Icon size="big" name="long arrow alternate left" />
                                <p>To get started, follow the prompts and click "Add {<Icon name="plus" size="small" />}"</p>
                            </div>
                        </> 
                        : <>
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
                        </>
                    }
                </div>
                <TotalsFinal onClearAll={props.onClearAll} absoluteTotal={calculateAbsoluteTotal()} individualTotals={calculateIndividualTotals()} />
            </>
        </>
    )

}

export default TotalsWindow;