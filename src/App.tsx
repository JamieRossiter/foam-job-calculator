import React from "react";
import FoamCard from "./components/FoamCard/FoamCard";
import ExtrasCard from "./components/ExtrasCard/ExtrasCard";
import UpholsteryCard from "./components/UpholsteryCard/UpholsteryCard";
import AddClearButtonsParent from "./components/AddClearButtonsParent/AddClearButtonsParent";
import TotalsWindow from "./components/TotalsWindow/TotalsWindow";
import AppHeader from "./components/AppHeader/AppHeader";
import "./App.css";
import { FabricDatum, UserFoamData, UserExtrasData, UserUpholsteryData, UserItemObject, FoamPriceDatum } from "./utils/types";
import { calculateExtras, calculateFoam, calculateUpholstery } from "./utils/calculate";
import { Button, Modal } from "semantic-ui-react";
import { v4 as uuidv4} from "uuid";
 
function App(): JSX.Element {

    const [ totalUserItems, setTotalUserItems ] = React.useState<Array<UserItemObject>>([]);

    const [ userFoamData, setUserFoamData ] = React.useState<UserFoamData>({density: "", thickness: "", length: 0, width: 0, quantity: 0, measurementSystem: "mm"});
    const [ userExtrasData, setUserExtrasData ] = React.useState<UserExtrasData>({polyRequired: true, layers: 0, glueRequired: true, polyAreasToCover: { top: true, sides: true, bottom: true }});
    const [ userUpholsteryData, setUserUpholsteryData ] = React.useState<UserUpholsteryData>({upholsteryRequired: true, fabric: { name: "", width: "", price: "", sku: "" }, labourRequired: true});

    const [ fabricsData, setFabricsData] = React.useState<Array<FabricDatum>>([]);
    const [ foamPricesData, setFoamPricesData ] = React.useState<Array<FoamPriceDatum>>([]);

    const [confirmationModalOpen, setConfirmationModalOpen] = React.useState<boolean>(false);

    // Fetch fabrics from CSV file
    React.useEffect(() => {
        fetch("fabrics_list.csv")
        .then((response: any) => response.text())
        .then((data: any) => {
            setFabricsData(createFabricsData(convertCSVData(data)));
        });
    }, [])

    // Fetch foam prices from CSV file
    React.useEffect(() => {
        fetch("foam_prices.csv")
        .then((response: any) => response.text())
        .then((data: any) => {
            setFoamPricesData(createFoamPricesData(convertCSVData(data)));
        });
    })

    // Format CSV data as an Array of string arrays
    function convertCSVData(csvStream: string): Array<Array<string>>{
        const splitData: Array<string> = csvStream.split("\n");
        return splitData.map((splitDatum: string, index: number) => { 
            let datum: Array<string>;
            if(index != 0){
                datum = splitDatum.split(",");
            } else {
                datum = [];
            }
            return datum.map((element: string) => { return element.trim() })
        })
    }

    // Organise fabrics array into array of FabricDatum JS objects
    function createFabricsData(csvArray: Array<Array<string>>): Array<FabricDatum>{
        return csvArray.map((fabricDatum: Array<string>, index: number) => {
            if(index != 0) return { name: fabricDatum[1], width: fabricDatum[3], price: fabricDatum[2], sku: fabricDatum[0] };
            else return { name: "", width: "", price: "", sku: "" };
        })
    }

    // Create an array containing foam price data
    function createFoamPricesData(csvArray: Array<Array<string>>): Array<FoamPriceDatum>{
        return csvArray.map((foamPriceDatum: Array<string>, index: number) => {
            if(index != 0) return { density: foamPriceDatum[0], name: foamPriceDatum[1], thickness: parseInt(foamPriceDatum[2]), price: parseFloat(foamPriceDatum[3]), sku: foamPriceDatum[4] };
            else return { density: "", name: "", thickness: 0, price: 0.0, sku: "" }
        })
    }

    // Handle "add" button press
    function handleAddUserData(): void {
        setTotalUserItems([...totalUserItems, { 
            id: uuidv4(),
            foam: calculateFoam(userFoamData, foamPricesData),
            extras: calculateExtras(userFoamData, userExtrasData),
            upholstery: calculateUpholstery(userFoamData, userUpholsteryData)
        }])
    }
    
    // Handle "clear all" button press
    function handleClearAll(): void {
        setConfirmationModalOpen(true);
    }

    // Handle item "delete" button press
    function handleDeleteItem(deletedId: string): void {
        const filteredUserItems: Array<UserItemObject> = totalUserItems.filter((item: UserItemObject) => item.id !== deletedId);
        setTotalUserItems(filteredUserItems);
    }

    return(
        <>
            <Modal size="mini" onClose={() => setConfirmationModalOpen(false)} open={confirmationModalOpen} >
                <Modal.Header>Are you sure you want to clear this quotation?</Modal.Header>
                <Modal.Actions>
                    <Button negative onClick={() => { 
                        setTotalUserItems([]);
                        setConfirmationModalOpen(false);
                    }}>Yes, clear all</Button>
                    <Button onClick={() => { setConfirmationModalOpen(false) }} basic>No, go back</Button>
                </Modal.Actions>
            </Modal>

            <div className="app-header-container">
                <AppHeader />
            </div>
            <div className="app-parent-container">
                <div>
                    <div className="app-foam-container">
                        <FoamCard 
                            currentMeasurementSystem={userFoamData.measurementSystem}
                            handleChange={(key: string, value: string) => { setUserFoamData( (userFoamData) => { return({...userFoamData, [key]: value })})}}
                        />
                    </div>
                    <div className="app-extras-upholstery-container">
                        <div>
                            <ExtrasCard 
                                polyRequired={userExtrasData.polyRequired} 
                                polySides={userExtrasData.polyAreasToCover} 
                                handleChange={(key: string, value: string) => { setUserExtrasData( (userExtrasData) => { return({...userExtrasData, [key]: value })})}} 
                            />
                        </div>
                        <div>
                            <UpholsteryCard 
                                fabricsList={fabricsData} 
                                upholsteryRequired={userUpholsteryData.upholsteryRequired}
                                handleChange={(key: string, value: string) => { setUserUpholsteryData( (userUpholsteryData) => { return({...userUpholsteryData, [key]: value })})}} 
                            />
                            <AddClearButtonsParent onAdd={handleAddUserData} />
                        </div>
                    </div>
                </div>
                <div className="app-totals-container">
                    <TotalsWindow items={totalUserItems} onDeleteItem={(id: string) => { handleDeleteItem(id) }} onClearAll={handleClearAll} />    
                </div>
            </div>
        </>
    )
}

export default App;