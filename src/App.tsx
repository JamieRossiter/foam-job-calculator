import React from "react";
import FoamCard from "./components/FoamCard/FoamCard";
import ExtrasCard from "./components/ExtrasCard/ExtrasCard";
import UpholsteryCard from "./components/UpholsteryCard/UpholsteryCard";
import AddClearButtonsParent from "./components/AddClearButtonsParent/AddClearButtonsParent";
import "./App.css";

function App(): JSX.Element {
    return(
        <>
            <div className="app-parent-container">
                <div className="app-foam-container">
                    <FoamCard />
                </div>
                <div className="app-extras-upholstery-container">
                    <div>
                        <ExtrasCard />
                    </div>
                    <div>
                        <UpholsteryCard />
                        <AddClearButtonsParent />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;