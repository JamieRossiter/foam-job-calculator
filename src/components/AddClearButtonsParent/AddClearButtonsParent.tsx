import React from "react";
import { Button, Icon } from "semantic-ui-react";
import "./AddClearButtonsParent.css";

function AddClearButtonsParent(): JSX.Element {
    return(
        <>
            <div className="add-clear-buttons-parent-container">
                <div className="add-button-container add-clear-buttons-subcontainer">
                    <Button color="blue" className="add-button" icon labelPosition="right">
                        Add
                        <Icon name="plus" />
                    </Button>
                </div>
                <div className="clear-button-container add-clear-buttons-subcontainer">
                    <Button className="clear-button" icon labelPosition="right">
                        Clear
                        <Icon name="x" />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default AddClearButtonsParent;