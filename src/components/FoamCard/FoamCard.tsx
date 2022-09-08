import React from "react";
import { Dropdown, Input, Button, Icon } from "semantic-ui-react";
import "./FoamCard.css";

type DropdownItem = {
    key: string,
    text: string,
    value: string
}

function FoamCard() {

    const [ density, setDensity ] = React.useState<string>("");
    const [ thickness, setThickness ] = React.useState<string>("");
    const [ dimensions, setDimensions ] = React.useState<[number, number]>([0, 0]);
    const [ amount, setAmount ] = React.useState<number>(0);
    const [ measurementSystem, setMeasurementSystem ] = React.useState<string>("mm");

    const densityList: Array<DropdownItem> = [
        {
            key: "23-130",
            text: "Med. Density (23-130)",
            value: "23-130"
        },
        {
            key: "29-200",
            text: "High Density (29-200)",
            value: "29-200"
        },
        {
            key: "36-130",
            text: "Enduro (36-130)",
            value: "36-130"
        },
        {
            key: "29-400",
            text: "High Load (29-400)",
            value: "29-400"
        }
    ]

    const thicknessList: Array<DropdownItem> = [
        {
            key: "25",
            text: "25mm",
            value: "25"
        },
        {
            key: "38",
            text: "38mm",
            value: "38"
        },
        {
            key: "50",
            text: "50mm",
            value: "50"
        },
        {
            key: "75",
            text: "75mm",
            value: "75"
        },
        {
            key: "100",
            text: "100mm",
            value: "100"
        },
        {
            key: "125",
            text: "125mm",
            value: "125"
        },
        {
            key: "150",
            text: "150mm",
            value: "150"
        }
    ]

    const measurementSystemList: Array<DropdownItem> = [
        {
            key: "mm",
            text: "mm",
            value: "millimetres"
        },
        {
            key: "in",
            text: "in",
            value: "inches"
        }
    ]

    return(
        <>
            <div className="foam-card-parent-container">
                <div className="foam-card-content-container">
                    <div className="foam-left-container">
                        <div className="foam-density-container small-container">
                            <label htmlFor="densities-select" id="densities-select-label">Foam Density</label>
                            <Dropdown name="densities-select" id="densities-select" placeholder="Select density..." options={densityList} selection />
                        </div>
                        <div className="foam-length-container small-container">
                            <label htmlFor="dimensions-length">Length</label>
                            <Input className="length-input" type="text" id="dimensions-length" labelPosition="right" placeholder="e.g. 500, 700" label={<Dropdown options={measurementSystemList} defaultValue="millimetres" />} />
                        </div>
                        <div className="foam-amount-container small-container">
                            <label htmlFor="foam-amount">Amount</label>
                            <Input type="number" id="foam-amount" defaultValue={0} />
                        </div>
                    </div>
                    <div className="foam-right-container">
                        <div className="foam-thickness-container small-container">
                            <label htmlFor="thicknesses-select">Foam Thickness</label>
                            <Dropdown name="thicknesses-select" id="thicknesses-select" placeholder="Select thickness..." options={thicknessList} selection />
                        </div>
                        <div className="foam-width-container small-container">
                            <label htmlFor="dimensions-width">Width</label>
                            <Input className="width-input" type="text" id="dimensions-width" labelPosition="right" placeholder="e.g. 300, 500" label={<Dropdown options={measurementSystemList} defaultValue="millimetres" />} />
                        </div>
                        <div className="button-parent-container">
                            <div className="add-button-container small-container">
                                <Button className="add-button" icon labelPosition="right">
                                    Add
                                    <Icon name="plus" />
                                </Button>
                            </div>
                            <div className="clear-button-container small-container">
                                <Button className="clear-button" icon labelPosition="right">
                                    Clear
                                    <Icon name="x" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

};

export default FoamCard;