import { createContext, Dispatch } from "react";

type Step = "username" | "password" | "otp";

export interface State {
    username: string
    step: Step
}

interface Action<Type = string> {
    type: Type
}

interface SetUsername extends Action<"set_username"> {
    value: string
}

interface SetStep extends Action<"set_step"> {
    value: Step
}

export type Actions = SetUsername | SetStep;

export function reducer(state: State, action: Actions): State {
    switch (action.type) {
        case "set_username":
            return {
                ...state,
                username: action.value
            };
        case "set_step":
            return {
                ...state,
                step: action.value
            };
        default:
            throw new Error("invalid action type in Login reducer");
    }
}

export type Reducer = typeof reducer;

export function initial(): State {
    return {
        username: "",
        step: "username"
    }
}

export const StateContext = createContext<State>(null);
export const DispatchContext = createContext<Dispatch<Actions>>(null);