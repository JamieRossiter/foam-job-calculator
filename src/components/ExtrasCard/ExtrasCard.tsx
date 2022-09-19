import React from "react";
import { Checkbox, Input, Header, CheckboxProps, InputOnChangeData } from "semantic-ui-react";
import "./ExtrasCard.css";

type ExtrasCardProps = {
    handleChange: Function
    polyRequired: boolean,
    polySides: { top: boolean, sides: boolean, bottom: boolean } 
}

function ExtrasCard(props: ExtrasCardProps) : JSX.Element {

    function handleChange(key: string, outgoing: any): void {
        props.handleChange(key, outgoing);
    }

    function handlePolySidesChange(innerKey: "top" | "bottom" | "sides", outgoing: { top: boolean, sides: boolean, bottom: boolean }, checked: boolean | undefined): void {
        if(checked != undefined){
            outgoing[innerKey] = checked;
        }
        props.handleChange("polyAreasToCover", outgoing); 
    }

    return(
        <>
            <div className="extras-card-container">
                <div className="extras-card-header-container">
                    <Header size="medium" className="extras-card-header">2. Add Polyester Fibre</Header>
                </div>
                <div className="poly-container extras-card-subcontainer">
                    <label htmlFor="poly-checkbox">Polyester fibre required</label>
                    <Checkbox defaultChecked id="poly-checkbox" toggle onChange={(e: any, data: CheckboxProps) => { handleChange("polyRequired", data.checked) }} />
                </div>
                <div className="layers-container extras-card-subcontainer">
                    <label htmlFor="layer-input">How many layers?</label>
                    <Input id="layer-input" type="number" disabled={!props.polyRequired} defaultValue={1} onChange={(e: any, data: InputOnChangeData) => { handleChange("layers", data.value)}} />
                </div>
                <div className="labour-container extras-card-subcontainer">
                    <label htmlFor="labour-checkbox">Glue/labour required</label>
                    <Checkbox id="labour-checkbox" toggle defaultChecked disabled={!props.polyRequired} onChange={(e: any, data: CheckboxProps) => { handleChange("glueRequired", data.checked) }} />
                </div>
                <div className="sides-container extras-card-subcontainer">
                    <label htmlFor="sides-checkbox" id="sides-container-header-label">Area to cover</label>
                    <Checkbox id="top-sides-checkbox" name="sides-checkbox" label="Top" defaultChecked disabled={!props.polyRequired} onChange={(e: any, data: CheckboxProps) => { handlePolySidesChange("top", props.polySides, data.checked) }} />
                    <Checkbox id="sides-sides-checkbox" name="sides-checkbox" label="Sides" defaultChecked disabled={!props.polyRequired} onChange={(e: any, data: CheckboxProps) => { handlePolySidesChange("sides", props.polySides, data.checked) }}  />
                    <Checkbox id="bottom-sides-checkbox" name="sides-checkbox" label="Bottom" defaultChecked disabled={!props.polyRequired} onChange={(e: any, data: CheckboxProps) => { handlePolySidesChange("bottom", props.polySides, data.checked) }} />
                </div>
            </div>
        </>
    )

}

export default ExtrasCard;