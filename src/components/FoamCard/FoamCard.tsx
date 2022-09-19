import React from "react";
import { Dropdown, Input, Button, Icon, Header, Label, DropdownProps, InputOnChangeData } from "semantic-ui-react";
import "./FoamCard.css";
import { densityList, thicknessList, measurementSystemList } from "../../utils/dropdown_lists";
import { UserFoamData } from "../../utils/types";

type FoamCardProps = {
    handleChange: Function,
    currentMeasurementSystem: "mm" | "in"
}

function FoamCard(props: FoamCardProps) : JSX.Element {

    function handleChange(key: string, outgoing: any): void {
        props.handleChange(key, outgoing);
    }

    return(
        <>
            <div className="foam-card-parent-container">
            <Header size="medium" className="foam-card-header">1. Add Foam</Header>
                <div className="foam-card-content-container">
                    <div className="foam-left-container">
                        <div className="foam-density-container foam-card-sub-container">
                            <label htmlFor="densities-select" id="densities-select-label">Foam Density</label>
                            <Dropdown onChange={(e: any, data: DropdownProps) => { handleChange("density", data.value) }} fluid name="densities-select" id="densities-select" placeholder="Select density..." options={densityList} selection />
                        </div>
                        <div className="foam-length-container foam-card-sub-container">
                            <label htmlFor="dimensions-length">Length</label>
                            <Input onChange={(e: any, data: InputOnChangeData) => { handleChange("length", data.value) }} className="length-input" type="number" id="dimensions-length" labelPosition="right" placeholder="e.g. 500" label={<Dropdown onChange={(e: any, data: DropdownProps) => { handleChange("measurementSystem", data.value) }} options={measurementSystemList} defaultValue="mm" value={props.currentMeasurementSystem} />} />
                        </div>
                    </div>
                    <div className="foam-right-container">
                        <div className="foam-thickness-container foam-card-sub-container">
                            <label htmlFor="thicknesses-select">Foam Thickness</label>
                            <Dropdown onChange={(e: any, data: DropdownProps) => { handleChange("thickness", data.value) }} fluid name="thicknesses-select" id="thicknesses-select" placeholder="Select thickness..." options={thicknessList} selection />
                        </div>
                        <div className="foam-width-container foam-card-sub-container">
                            <label htmlFor="dimensions-width">Width</label>
                            <Input onChange={(e: any, data: InputOnChangeData) => { handleChange("width", data.value) }} className="width-input" type="number" id="dimensions-width" labelPosition="right" placeholder="e.g. 300" label={<Dropdown onChange={(e: any, data: DropdownProps) => { handleChange("measurementSystem", data.value) }} options={measurementSystemList} defaultValue="mm" value={props.currentMeasurementSystem} />} />
                        </div>
                    </div>
                </div>
                <div className="foam-amount-container foam-card-sub-container">
                    <label htmlFor="foam-amount">Quantity</label>
                    <Input onChange={(e: any, data: InputOnChangeData) => { handleChange("quantity", data.value) }} type="number" id="foam-amount" defaultValue={0} label="cushions" labelPosition="right" />
                </div>
            </div>
        </>
    )

};

export default FoamCard;