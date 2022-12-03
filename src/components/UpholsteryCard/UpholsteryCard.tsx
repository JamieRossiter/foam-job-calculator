import React from "react";
import { Dropdown, Checkbox, Header, CheckboxProps, DropdownProps } from "semantic-ui-react";
import "./UpholsteryCard.css";
import { DropdownItem, FabricDatum, UserUpholsteryData } from "../../utils/types";

type UpholsteryCardProps = {
    fabricsList: Array<FabricDatum>,
    upholsteryRequired: boolean,
    handleChange: Function,
    data: UserUpholsteryData
}

function UpholsteryCard(props: UpholsteryCardProps): JSX.Element {

    function generateFabricList(fabrics: Array<FabricDatum>): Array<DropdownItem>{
        const formatted: Array<DropdownItem> = fabrics.map((fabric: FabricDatum) => { 
            return { key: fabric.sku, text: `${fabric.name}`, value: fabric.sku } 
        });
        return formatted.filter((dItem: DropdownItem) => { return dItem.key != "" })
    }

    function handleChange(key: string, outgoing: any): void {
        props.handleChange(key, outgoing);
    }

    function handleFabricChange(sku: string) : void {
        const outgoingFabric: FabricDatum | undefined = props.fabricsList.find((fabric: FabricDatum) => sku === fabric.sku);
        if(outgoingFabric) props.handleChange("fabric", outgoingFabric);
    }

    return(
        <>
            <div className="upholstery-card-container">
                <Header className="upholstery-card-header" size="medium">3. Add Upholstery</Header>
                <div className="upholstery-card-upholstery-container upholstery-card-subcontainer">
                    <label htmlFor="upholster-card-upholstery-checkbox">Upholstery required</label>
                    <Checkbox tabIndex={4} checked={props.data.upholsteryRequired} id="upholstery-card-upholstery-checkbox" toggle onChange={(e: any, data: CheckboxProps) => { handleChange("upholsteryRequired", data.checked) }} />
                </div>
                <div className="upholstery-card-fabric-container upholstery-card-subcontainer">
                    <label htmlFor="upholstery-card-fabric-input">Fabric</label>
                    <Dropdown tabIndex={4} value={props.data.fabric.sku} id="upholstery-card-fabric-input" search selection options={generateFabricList(props.fabricsList)} disabled={!props.upholsteryRequired} onChange={(e: any, data: DropdownProps) => { handleFabricChange(data.value as string) }} />
                </div>
                <div className="upholstery-card-labour-container upholstery-card-subcontainer">
                    <label htmlFor="upholster-card-labour-checkbox">Labour required</label>
                    <Checkbox tabIndex={4} checked={props.data.labourRequired} id="upholstery-card-labour-checkbox" defaultChecked toggle disabled={!props.upholsteryRequired} onChange={(e: any, data: CheckboxProps) => { handleChange("labourRequired", data.checked) }} />
                </div>
            </div>
        </>
    )
}

export default UpholsteryCard;