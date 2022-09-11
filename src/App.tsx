import React from "react";
import FoamCard from "./components/FoamCard/FoamCard";
import ExtrasCard from "./components/ExtrasCard/ExtrasCard";
import UpholsteryCard from "./components/UpholsteryCard/UpholsteryCard";
import AddClearButtonsParent from "./components/AddClearButtonsParent/AddClearButtonsParent";
import TotalsWindow from "./components/TotalsWindow/TotalsWindow";
import AppHeader from "./components/AppHeader/AppHeader";
import "./App.css";

function App(): JSX.Element {
    return(
        <>
            <div className="app-header-container">
                <AppHeader />
            </div>
            <div className="app-parent-container">
                <div>
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
                <div className="app-totals-container">
                    <TotalsWindow />    
                </div>
            </div>
        </>
    )
}

export default App;