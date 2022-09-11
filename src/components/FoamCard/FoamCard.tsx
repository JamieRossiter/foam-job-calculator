import React from "react";
import { Dropdown, Input, Button, Icon, Header, Label } from "semantic-ui-react";
import "./FoamCard.css";
import { densityList, thicknessList, measurementSystemList } from "../../utils/dropdown_lists";

type DropdownItem = {
    key: string,
    text: string,
    value: string
    image?: { avatar: boolean, src: string }
}

function FoamCard() : JSX.Element {

    const [ density, setDensity ] = React.useState<string>("");
    const [ thickness, setThickness ] = React.useState<string>("");
    const [ dimensions, setDimensions ] = React.useState<[number, number]>([0, 0]);
    const [ amount, setAmount ] = React.useState<number>(0);
    const [ measurementSystem, setMeasurementSystem ] = React.useState<string>("mm");

    return(
        <>
            <div className="foam-card-parent-container">
            <Header size="medium" className="foam-card-header">1. Add Foam</Header>
                <div className="foam-card-content-container">
                    <div className="foam-left-container">
                        <div className="foam-density-container foam-card-sub-container">
                            <label htmlFor="densities-select" id="densities-select-label">Foam Density</label>
                            <Dropdown fluid name="densities-select" id="densities-select" placeholder="Select density..." options={densityList} selection />
                        </div>
                        <div className="foam-length-container foam-card-sub-container">
                            <label htmlFor="dimensions-length">Length</label>
                            <Input className="length-input" type="number" id="dimensions-length" labelPosition="right" placeholder="e.g. 500" label={<Dropdown options={measurementSystemList} defaultValue="millimetres" />} />
                        </div>
                    </div>
                    <div className="foam-right-container">
                        <div className="foam-thickness-container foam-card-sub-container">
                            <label htmlFor="thicknesses-select">Foam Thickness</label>
                            <Dropdown fluid name="thicknesses-select" id="thicknesses-select" placeholder="Select thickness..." options={thicknessList} selection />
                            {/* <Label>36-130</Label> */}
                        </div>
                        <div className="foam-width-container foam-card-sub-container">
                            <label htmlFor="dimensions-width">Width</label>
                            <Input className="width-input" type="number" id="dimensions-width" labelPosition="right" placeholder="e.g. 300" label={<Dropdown options={measurementSystemList} defaultValue="millimetres" />} />
                        </div>
                    </div>
                </div>
                <div className="foam-amount-container foam-card-sub-container">
                    <label htmlFor="foam-amount">Quantity</label>
                    <Input type="number" id="foam-amount" defaultValue={0} label="cushions" labelPosition="right" />
                </div>
            </div>
        </>
    )

};

export default FoamCard;