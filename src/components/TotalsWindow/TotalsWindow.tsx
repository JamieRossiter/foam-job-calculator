import React from "react";
import TotalsItem from "../TotalsItem/TotalsItem";
import TotalsFinal from "../TotalsFinal/TotalsFinal";

function TotalsWindow(): JSX.Element {

    return(
        <>
            <TotalsItem />
            <TotalsItem />
            <TotalsItem />
            <TotalsFinal />
        </>
    )

}

export default TotalsWindow;