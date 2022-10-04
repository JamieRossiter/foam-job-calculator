import React from "react";
import TotalsItem from "../TotalsItem/TotalsItem";
import TotalsFinal from "../TotalsFinal/TotalsFinal";
import { UserItemObject } from "../../utils/types"; 

type TotalsWindowProps = {
    items: Array<UserItemObject>
}

function TotalsWindow(props: TotalsWindowProps): JSX.Element {

    function createFoamItems(): Array<JSX.Element> {
        return props.items.map((item: UserItemObject) => <TotalsItem name={item.foam.name} measurements={item.foam.dimensions} quantity={item.foam.quantity} totalPrice={item.foam.totalPrice} eachPrice={item.foam.eachPrice} sku={item.foam.sku} />)
    }

    function createPolyesterItem(): JSX.Element {

        let totalPolyPrice: number = 0;
        let totalPolyLength: number = 0;

        props.items.forEach((item: UserItemObject) => {
            totalPolyPrice += parseInt(item.extras.polyTotalPrice);
            totalPolyLength += parseInt(item.extras.polyLength);
        });

        return <TotalsItem name="Polyester Fibre" measurements={totalPolyLength.toString()} quantity={0} totalPrice={totalPolyPrice.toString()} eachPrice={"16.95"} sku="SKU: 293488"/>;
    }

    // function createFabricItems(): Array<JSX.Element> {

    // }

    return(
        <>
            {createFoamItems()}
            {createPolyesterItem()}
            <TotalsFinal />
        </>
    )

}

export default TotalsWindow;