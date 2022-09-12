import React from "react";
import { Input, Dropdown, Checkbox, Header } from "semantic-ui-react";
import "./UpholsteryCard.css";
import { measurementSystemList } from "../../utils/dropdown_lists";
import { DropdownItem, FabricDatum } from "../../utils/types";

function UpholsteryCard(props: { fabricsList: Array<FabricDatum> }): JSX.Element {

    const [ upholsteryRequired, setUpholsteryRequired ] = React.useState<boolean>(true);

    function generateFabricList(fabrics: Array<FabricDatum>): Array<DropdownItem>{
        const formatted: Array<DropdownItem> = fabrics.map((fabric: FabricDatum) => { 
            return { key: fabric.sku, text: `${fabric.name}`, value: fabric.sku } 
        });
        return formatted.filter((dItem: DropdownItem) => { return dItem.key != "" })
    }

    return(
        <>
            <div className="upholstery-card-container">
                <Header className="upholstery-card-header" size="medium">3. Add Upholstery</Header>
                <div className="upholstery-card-upholstery-container upholstery-card-subcontainer">
                    <label htmlFor="upholster-card-upholstery-checkbox">Upholstery required</label>
                    <Checkbox id="upholstery-card-upholstery-checkbox" defaultChecked toggle onChange={() => {setUpholsteryRequired(!upholsteryRequired)}} />
                </div>
                <div className="upholstery-card-fabric-container upholstery-card-subcontainer">
                    <label htmlFor="upholstery-card-fabric-input">Fabric</label>
                    <Dropdown id="upholstery-card-fabric-input" search selection options={generateFabricList(props.fabricsList)} disabled={!upholsteryRequired} />
                </div>
                <div className="upholstery-card-labour-container upholstery-card-subcontainer">
                    <label htmlFor="upholster-card-labour-checkbox">Labour required</label>
                    <Checkbox id="upholstery-card-labour-checkbox" defaultChecked toggle disabled={!upholsteryRequired} />
                </div>
            </div>
        </>
    )
}

export default UpholsteryCard;