import React from "react";
import FoamCard from "./components/FoamCard/FoamCard";
import ExtrasCard from "./components/ExtrasCard/ExtrasCard";
import UpholsteryCard from "./components/UpholsteryCard/UpholsteryCard";
import AddClearButtonsParent from "./components/AddClearButtonsParent/AddClearButtonsParent";
import TotalsWindow from "./components/TotalsWindow/TotalsWindow";
import AppHeader from "./components/AppHeader/AppHeader";
import AppFooter from "./components/AppFooter/AppFooter";
import "./App.css";
import { convertCSVData, createFoamPricesData, createFabricsData } from "./utils/convert_data";
import { FabricDatum, UserFoamData, UserExtrasData, UserUpholsteryData, UserItemObject, FoamPriceDatum } from "./utils/types";
import { calculateExtras, calculateFoam, calculateUpholstery, generateBlankExtrasData, generateBlankUpholsteryData } from "./utils/calculate";
import { Button, Modal } from "semantic-ui-react";
import { foamDefaultState, extrasDefaultState, upholsteryDefaultState } from "./utils/default_states";
import { v4 as uuidv4} from "uuid";
 
function App(): JSX.Element {

    const [ totalUserItems, setTotalUserItems ] = React.useState<Array<UserItemObject>>([]);

    const [ userFoamData, setUserFoamData ] = React.useState<UserFoamData>(foamDefaultState);
    const [ userExtrasData, setUserExtrasData ] = React.useState<UserExtrasData>(extrasDefaultState);
    const [ userUpholsteryData, setUserUpholsteryData ] = React.useState<UserUpholsteryData>(upholsteryDefaultState);

    const [ fabricsData, setFabricsData] = React.useState<Array<FabricDatum>>([]);
    const [ foamPricesData, setFoamPricesData ] = React.useState<Array<FoamPriceDatum>>([]);

    const [ clearQuotationModalOpen, setClearQuotationModalOpen] = React.useState<boolean>(false);
    const [ clearInputsModalOpen, setClearInputsModalOpen ] = React.useState<boolean>(false);

    const [ validationErrorMessages, setValidationErrorMessages ] = React.useState<Array<string>>([]);
    const [ validationErrorModalOpen, setValidationErrorModalOpen ] = React.useState<boolean>(false);

    const [ disclaimerModalOpen, setDisclaimerModalOpen ] = React.useState<boolean>(false);

    // Display disclaimer
    React.useEffect(() => {
        setDisclaimerModalOpen(true);
    }, [])
    
    // Fetch fabrics from CSV file
    React.useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/fabrics_list.csv`)
        .then((response: any) => response.text())
        .then((data: any) => {
            setFabricsData(createFabricsData(convertCSVData(data)));
        });
    }, [])

    // Fetch foam prices from CSV file
    React.useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/foam_prices.csv`)
        .then((response: any) => response.text())
        .then((data: any) => {
            setFoamPricesData(createFoamPricesData(convertCSVData(data)));
        });
    }, [])

    // Handle "add" button press
    function handleAddUserData(): void {
        
        if(!isValid()){
            setValidationErrorModalOpen(true);
            return;
        }

        setTotalUserItems([...totalUserItems, { 
            id: uuidv4(),
            foam: calculateFoam(userFoamData, foamPricesData),
            extras: userExtrasData.polyRequired ? calculateExtras(userFoamData, userExtrasData) : generateBlankExtrasData(),
            upholstery: userUpholsteryData.upholsteryRequired ? calculateUpholstery(userFoamData, userUpholsteryData) : generateBlankUpholsteryData()
        }])

        clearUserData();

    }

    // Handle "clear" button press
    function handleClearUserData(): void {
        setClearInputsModalOpen(true);
    }

    function clearUserData(): void {
        setUserFoamData(foamDefaultState);
        setUserExtrasData(extrasDefaultState);
        setUserUpholsteryData(upholsteryDefaultState);
    }
    
    // Handle "clear all" button press
    function handleClearAll(): void {
        setClearQuotationModalOpen(true);
    }

    // Handle item "delete" button press
    function handleDeleteItem(deletedId: string): void {
        const filteredUserItems: Array<UserItemObject> = totalUserItems.filter((item: UserItemObject) => item.id !== deletedId);
        setTotalUserItems(filteredUserItems);
    }

    // Validate all inputs 
    function isValid(): boolean {

        let errorMsgs: Array<string> = [];
        
        const invalidFoamInputs: Array<string> = isFoamValid(userFoamData);
        const invalidExtrasInputs: Array<string> = isExtrasValid(userExtrasData);
        const invalidUpholsteryInputs: Array<string> = isUpholsteryValid(userUpholsteryData);

        // Check if all inputs are valid
        if(invalidFoamInputs.length <= 0 && invalidExtrasInputs.length <= 0 && invalidUpholsteryInputs.length <= 0) return true;
        
        // Check if foam inputs are valid
        if(invalidFoamInputs.length > 0){
            invalidFoamInputs.forEach((input: string) => {
                errorMsgs.push(`Please enter a valid foam ${input}.`);
            })
        }

        // Check if extras inputs are valid
        if(invalidExtrasInputs.length > 0){
            invalidExtrasInputs.forEach((input: string) => {
                errorMsgs.push(`Please enter a valid polyester fibre ${input}.`)
            })
        }

        // Check if upholstery inputs are valid
        if(invalidUpholsteryInputs.length > 0){
            invalidUpholsteryInputs.forEach((input: string) => {
                errorMsgs.push(`Please enter a valid upholstery ${input}.`);
            })
        }

        setValidationErrorMessages(errorMsgs);
        return false;

    }

    function isFoamValid(foam: UserFoamData): Array<string> {

        const invalidInputs: Array<string> = [];
        
        if(foam.density.length <= 0) invalidInputs.push("density");
        if(foam.thickness.length <= 0) invalidInputs.push("thickness")
        if(foam.length <= 0) invalidInputs.push("length");
        if(foam.width <= 0) invalidInputs.push("width");
        if(foam.quantity <= 0) invalidInputs.push("quantity");

        return invalidInputs;

    }

    function isExtrasValid(extras: UserExtrasData): Array<string> {

        const invalidInputs: Array<string> = [];

        if(!extras.polyRequired) return invalidInputs;
        if(extras.layers <= 0) invalidInputs.push("layer value");
        if(!extras.polyAreasToCover.top && !extras.polyAreasToCover.sides && !extras.polyAreasToCover.bottom) invalidInputs.push("area to cover");

        return invalidInputs;

    }

    function isUpholsteryValid(upholstery: UserUpholsteryData): Array<string> {

        const invalidInputs: Array<string> = [];

        if(!upholstery.upholsteryRequired) return invalidInputs;
        if(upholstery.fabric.sku.length <= 0) invalidInputs.push("fabric");

        return invalidInputs;

    }

    return(
        <>
            <Modal size="mini" onClose={() => setDisclaimerModalOpen(false)} open={disclaimerModalOpen} >
                <Modal.Header>Warning!</Modal.Header>
                <Modal.Content>
                    The prices of foam, upholstery and fabric <span className="app-disclaimer-emphasis">may be outdated</span>. Please ensure items in the quotation are accurate before providing it to the customer.
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => {
                        setDisclaimerModalOpen(false) 
                    }}>Okay</Button>
                </Modal.Actions>
            </Modal>

            <Modal size="mini" onClose={() => setClearQuotationModalOpen(false)} open={clearQuotationModalOpen} >
                <Modal.Header>Are you sure you want to clear this quotation?</Modal.Header>
                <Modal.Content>
                    This action will clear <span className="app-disclaimer-emphasis">all items</span> in the current quotation.
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => { 
                        setTotalUserItems([]);
                        setClearQuotationModalOpen(false);
                    }}>Yes, clear all</Button>
                    <Button onClick={() => { setClearQuotationModalOpen(false) }} basic>No, go back</Button>
                </Modal.Actions>
            </Modal>

            <Modal size="mini" onClose={() => setClearInputsModalOpen(true)} open={clearInputsModalOpen} >
                <Modal.Header>Are you sure you want to clear the data you've inputted?</Modal.Header>
                <Modal.Content>This action <span className="app-disclaimer-emphasis">will not</span> clear the current quotation.</Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => { 
                        clearUserData();
                        setClearInputsModalOpen(false);
                    }}>Yes, clear input data</Button>
                    <Button onClick={() => { setClearInputsModalOpen(false) }} basic>No, go back</Button>
                </Modal.Actions>
            </Modal>

            <Modal size="mini" onClose={() => setValidationErrorModalOpen(false)} open={validationErrorModalOpen}>
                <Modal.Header>There was a problem calculating your quotation!</Modal.Header>
                <Modal.Content>
                    <ul>
                        {validationErrorMessages.map((message: string) => <li>{message}</li>)}
                    </ul>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => {setValidationErrorModalOpen(false)}} positive>Okay</Button>
                </Modal.Actions>
            </Modal>

            <div className="app-container">
                <div className="app-header-container">
                    <AppHeader />
                </div>
                <div className="app-parent-container">
                    <div className="app-inputs-container">
                        <div className="app-foam-container">
                            <FoamCard 
                                currentMeasurementSystem={userFoamData.measurementSystem}
                                handleChange={(key: string, value: string) => { setUserFoamData( (userFoamData) => { return({...userFoamData, [key]: value })})}}
                                data={userFoamData}
                            />
                        </div>
                        <div className="app-extras-upholstery-container">
                            <div>
                                <ExtrasCard 
                                    polyRequired={userExtrasData.polyRequired} 
                                    polySides={userExtrasData.polyAreasToCover} 
                                    handleChange={(key: string, value: string) => { setUserExtrasData( (userExtrasData) => { return({...userExtrasData, [key]: value })})}} 
                                    data={userExtrasData}
                                />
                            </div>
                            <div>
                                <UpholsteryCard 
                                    fabricsList={fabricsData} 
                                    upholsteryRequired={userUpholsteryData.upholsteryRequired}
                                    handleChange={(key: string, value: string) => { setUserUpholsteryData( (userUpholsteryData) => { return({...userUpholsteryData, [key]: value })})}} 
                                    data={userUpholsteryData}
                                />
                                <AddClearButtonsParent onAdd={handleAddUserData} onClear={handleClearUserData} />
                            </div>
                        </div>
                    </div>
                    <div className="app-totals-container">
                        <TotalsWindow items={totalUserItems} onDeleteItem={(id: string) => { handleDeleteItem(id) }} onClearAll={handleClearAll} />    
                    </div>
                </div>
                <div className="app-footer">
                    <AppFooter />
                </div>
            </div>
            
        </>
    )
}

export default App;