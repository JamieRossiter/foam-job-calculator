import React from "react";
import FoamCard from "./components/FoamCard/FoamCard";
import ExtrasCard from "./components/ExtrasCard/ExtrasCard";
import UpholsteryCard from "./components/UpholsteryCard/UpholsteryCard";
import AddClearButtonsParent from "./components/AddClearButtonsParent/AddClearButtonsParent";
import TotalsWindow from "./components/TotalsWindow/TotalsWindow";
import AppHeader from "./components/AppHeader/AppHeader";
import "./App.css";
import { FabricDatum, UserFoamData, UserExtrasData, UserUpholsteryData, UserItemObject } from "./utils/types";

function App(): JSX.Element {

    const [ totalUserItems, setTotalUserItems ] = React.useState<Array<UserItemObject>>([]);

    const [ userFoamData, setUserFoamData ] = React.useState<UserFoamData>({density: "", thickness: "", length: 0, width: 0, quantity: 0, measurementSystem: "mm"});
    const [ userExtrasData, setUserExtrasData ] = React.useState<UserExtrasData>();
    const [ userUpholsteryData, setUserUpholsteryData ] = React.useState<UserUpholsteryData>();

    const [ fabricsData, setFabricsData] = React.useState<Array<FabricDatum>>([]);

    // Fetch fabrics from CSV file
    React.useEffect(() => {
        fetch("fabrics_list.csv")
        .then((response: any) => response.text())
        .then((data: any) => {
            setFabricsData(createFabricsData(formatFabricsData(data)));
        });
    }, [])

    // Format CSV data as an Array of string arrays
    function formatFabricsData(csvStream: string): Array<Array<string>>{
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

    // Handle "add" button press
    function handleAddUserData(): void {
        // Gather data from children
    }

    return(
        <>
            <div className="app-header-container">
                <AppHeader />
            </div>
            <div className="app-parent-container">
                <div>
                    <div className="app-foam-container">
                        <FoamCard 
                            handleChange={(key: string, value: string) => { setUserFoamData( (userFoamData) => { return({...userFoamData, [key]: value })})}}
                            currentMeasurementSystem={userFoamData.measurementSystem}
                        />
                    </div>
                    <div className="app-extras-upholstery-container">
                        <div>
                            <ExtrasCard />
                        </div>
                        <div>
                            <UpholsteryCard fabricsList={fabricsData} />
                            <AddClearButtonsParent onAdd={handleAddUserData} />
                        </div>
                    </div>
                </div>
                <div className="app-totals-container">
                    <TotalsWindow />    
                </div>
            </div>
        </>
    )
}

export default App;