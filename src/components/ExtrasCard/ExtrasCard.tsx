import React from "react";
import { Checkbox, Input, Header } from "semantic-ui-react";
import "./ExtrasCard.css";

function ExtrasCard() : JSX.Element {

    const [ polyRequired, setPolyRequired ] = React.useState<boolean>(true); 
    const [ labourRequired, setLabourRequired ] = React.useState<boolean>(false);
    const [ polyLayers, setPolyLayers ] = React.useState<number>(0);

    return(
        <>
            <div className="extras-card-container">
                <div className="extras-card-header-container">
                    <Header size="medium" className="extras-card-header">Add Polyester Fibre</Header>
                </div>
                <div className="poly-container extras-card-subcontainer">
                    <label htmlFor="poly-checkbox">Polyester fibre required</label>
                    <Checkbox defaultChecked={polyRequired} id="poly-checkbox" toggle />
                </div>
                <div className="layers-container extras-card-subcontainer">
                    <label htmlFor="layer-input">How many layers?</label>
                    <Input id="layer-input" type="number" disabled={!polyRequired} defaultValue={1} />
                </div>
                <div className="labour-container extras-card-subcontainer">
                    <label htmlFor="labour-checkbox">Glue/labour required</label>
                    <Checkbox id="labour-checkbox" toggle defaultChecked={labourRequired} disabled={!polyRequired} />
                </div>
            </div>
        </>
    )

}

export default ExtrasCard;