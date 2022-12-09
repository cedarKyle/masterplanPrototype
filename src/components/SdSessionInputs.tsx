import { useContext } from "react";
import { SdSessionContext } from "./SdSessionContext";
import { IParameterApi } from "@shapediver/viewer";
import styles from "../../styles/Home.module.scss";
import { Slider, TextInput, Dropdown, ColorSwatch } from "./Inputs";

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

        parameters.forEach((item, index) => {
            // get the parameter and assign the properties
            const parameterObject = item;
                        
            const label = (
                <label htmlFor={parameterObject.id}>
                    {parameterObject.name}
                </label>
            );
            
            const parameterInputElement = buildInputByType(parameterObject, index);

            if ( parameterInputElement !== null && parameterObject.hidden === false ) {
                newModelInputs.push(
                    <div className={styles.inputRow}>
                        {label}
                        {parameterInputElement}
                    </div>
                );
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
