import { IParameterApi, PARAMETER_TYPE } from "@shapediver/viewer";
import { useContext, useState } from "react";
import { SdSessionContext } from "./SdSessionContext";

interface SliderProps {
    param: IParameterApi<number>;
}

// Adapted from ShapediverReactExample:
export const Slider = ({ param }: SliderProps): JSX.Element => {
    const { dispatch } = useContext(SdSessionContext);
    const value = param.type === "Float" ? parseFloat(param.value + "") : parseInt(param.value + "");

    // Distinguish between decimal or integer sliders by setting the step property:
    let step = 1 / Math.pow(10, param.decimalplaces!);
    if (param.type === PARAMETER_TYPE.INT)
        step = 1;
    else if ( param.type === PARAMETER_TYPE.EVEN || param.type === PARAMETER_TYPE.ODD ) {
        step = 2;
    }

    return (
        <input
            type="range"
            min={param.min}
            max={param.max}
            step={step}
            defaultValue={value}
            onChange={(event: any) => dispatch!({ type: "setParameter", id: param.id, value: event.target.value + "", }) }
        />
    );
};

interface ParameterInputProps {
    param: IParameterApi<any>;
}
// Currently unused - appears to be an open bug in ShapeDiver:
// See https://codesandbox.io/s/rudimentary-ui-mvrwsw?file=/src/index.ts:655-697 for reproduction
export const Toggle = ({ param }: ParameterInputProps): JSX.Element => {
    const { state, dispatch } = useContext(SdSessionContext);
    
    return (
        <input
            id={param.id}
            type="checkbox"
            checked={JSON.parse(param.value)}
            onChange={(event: any) =>
                dispatch!({
                    type: "setParameter",
                    id: param.id,
                    value: event.target.value === true ? "on" : "off",
                })
            }
        />
    );
}

export const TextInput = ({ param }: ParameterInputProps): JSX.Element => {
    const { dispatch } = useContext(SdSessionContext);

    const [value, setValue] = useState(param.value);

    // Only dispatch changes when focus leaves the component (using onBlur below to achieve this)
    const handleChange = (event: any) => {
        if (param.value !== value) {   
            dispatch!({
                type: "setParameter",
                id: param.id,
                value: event.target.value,
            });
        }
    }
    return (
        <input
            key={param.id}
            id={param.id}
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onBlur={handleChange}
        />
    );
}

export const Dropdown = ({ param }: ParameterInputProps): JSX.Element => {
    const { dispatch } = useContext(SdSessionContext);

    let options = [];
    for (let j = 0; j < param.choices!.length; j++) {
        let option = document.createElement("option");
        option.setAttribute("value", j + "");
        option.setAttribute("name", param.choices![j]);
        option.innerHTML = param.choices![j];
        if (param.value === j) {
            option.setAttribute("selected", "");
        }
        options.push(
            <option
                id={param.choices![j]}
                value={`${j}`}
                selected={param.value === j ? true : false}
            >
                {param.choices![j]}
            </option>
        );
    }
    return (
        <select
            id={param.id}
            onChange={(event: any) =>
                dispatch!({
                    type: "setParameter",
                    id: param.id,
                    value: event.target.value + "",
                })
            }
        >
            {options}
        </select>
    );
};


export const ColorSwatch = ({ param }: ParameterInputProps): JSX.Element => {
    const { dispatch } = useContext(SdSessionContext);

    return (
        <input
            id={param.id}
            type="color"
            value={param.value}
            onChange={(event: any) =>
                dispatch!({
                    type: "setParameter",
                    id: param.id,
                    value: event.target.value + "",
                })
            }
        />
    );

}

