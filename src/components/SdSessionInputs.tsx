import { useContext } from "react";
import { SdSessionContext } from "./SdSessionContext";
import { IParameterApi } from "@shapediver/viewer";
import styles from "../../styles/Home.module.scss";
import { Slider, TextInput, Dropdown, ColorSwatch } from "./Inputs";

const inputsToDisplay = [
    "Duplex_Area",
    "Visibility_Compatability_Envelope",
    "Visibility_Buildable_Envelope",
    "Visibility_Setback_Envelope",
    "Unit_Density",
    "Single_Family_Area",
    "Single_Family_Mix",
    "Duplex_Mix",
    "Triplex_Area",
    "Triplex_Mix",
    "Quadplex_Area",
    "Quadplex_Mix",
    "Townhome_Area",
    "Townhome_Mix",
    "Masterplan_Configuration",
];

// Adapted from ShapediverReactExample:
export default function SdSessionInputs(): JSX.Element {
    const { state } = useContext(SdSessionContext);
    const error = state.error;
    const session = state.session;

    if (error) {
        return (
            // TODO: Style warning state:
            <div>{error.message}</div>
        );
    } else if (session) {
        const parameters = Object.values(session.parameters);
        parameters.sort(
            (a, b) => (a.order || Infinity) - (b.order || Infinity)
        );

        let newModelInputs: JSX.Element[] = [];

        // Helper code to extract new input names from the list of all inputs:
        // const names = parameters.map((p) => {
        //     if (p.name !== "Colour Swatch" && p.name !== "Number Slider") {
        //         return p.name;
        //     }
        // });
        // window.console.log('names:', names);
        
        
        parameters.forEach((item, index) => {
            // get the parameter and assign the properties
            const parameterObject = item;
            if (inputsToDisplay.includes(parameterObject.name)) {
                const formattedName = parameterObject.name.replaceAll("_", " ");
                const label = (
                    <label htmlFor={parameterObject.id}>
                        {formattedName}
                    </label>
                );
                
                const parameterInputElement = buildInputByType(parameterObject, index);
                
                if ( parameterInputElement !== null && parameterObject.hidden === false ) {
                    newModelInputs.push(
                        <div className={styles.sdvInputContainer}>
                            <div className={styles.inputLabels}>
                                {label}
                                {parameterObject.value.toString()}
                            </div>
                            {parameterInputElement}
                        </div>
                    );
                }
            }
        });

        return ( <>{newModelInputs}</> );
    } else {
        return <div>Loading Inputs...</div>;
    }
}

function buildInputByType(parameterObject: IParameterApi<any>, index: number): JSX.Element | null {    
    switch (parameterObject.visualization) {
        case ("slider"):
            return ( <Slider key={index} param={parameterObject} /> );
        case ("toggle"):
            // return <Toggle key={index} param={parameterObject}/>
            return <div>Boolean toggle unsupported</div>;
        case ("text"):
            return <TextInput key={index} param={parameterObject}/>
        case ("swatch"):
            return <ColorSwatch key={index} param={parameterObject}/>
        case ("dropdown"):
            return <Dropdown key={index} param={parameterObject}/>
        default:
            return <div>No supported input for this data type: {parameterObject.type}</div>;
    }
}
