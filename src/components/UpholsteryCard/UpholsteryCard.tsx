import React from "react";
import { Input, Dropdown, Checkbox, Header } from "semantic-ui-react";
import "./UpholsteryCard.css";
import { measurementSystemList } from "../../utils/dropdown_lists";

function UpholsteryCard(): JSX.Element {

    return(
        <>
            <div className="upholstery-card-container">
                <Header className="upholstery-card-header" size="medium">Add Upholstery</Header>
                <div className="upholstery-card-upholstery-container upholstery-card-subcontainer">
                    <label htmlFor="upholster-card-upholstery-checkbox">Upholstery required</label>
                    <Checkbox id="upholstery-card-upholstery-checkbox" defaultChecked toggle />
                </div>
                <div className="upholstery-card-width-container upholstery-card-subcontainer">
                    <label htmlFor="upholstery-card-width-input">Fabric width</label>
                    <Input id="upholstery-card-width-input" type="number" labelPosition="right" placeholder="e.g. 1380" label={<Dropdown options={measurementSystemList} defaultValue="millimetres" />} />
                </div>
                <div className="upholstery-card-labour-container upholstery-card-subcontainer">
                    <label htmlFor="upholster-card-labour-checkbox">Labour required</label>
                    <Checkbox id="upholstery-card-labour-checkbox" defaultChecked toggle />
                </div>
            </div>
        </>
    )
}

export default UpholsteryCard;