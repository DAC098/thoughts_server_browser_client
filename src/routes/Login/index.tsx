import { Stack } from "@fluentui/react"
import { useReducer } from "react"
import { DispatchContext, initial, reducer, Reducer, StateContext } from "./state";
import PasswordView from "./PasswordView";
import UsernameView from "./UsernameView";
import OtpView from "./OtpView";

const Login = () => {
    let [login_state, login_dispatch] = useReducer<Reducer>(reducer, initial());
    let render: JSX.Element;

    switch (login_state.step) {
        case "username":
            render = <UsernameView/>
            break;
        case "password":
            render = <PasswordView/>
            break;
        case "otp":
            render = <OtpView/>
            break;
    }

    return <StateContext.Provider value={login_state}>
        <DispatchContext.Provider value={login_dispatch}>
            <Stack verticalAlign="center" horizontalAlign="center" style={{
                width: "100vw",
                height: "100vh"
            }}>
                {render}
            </Stack>
        </DispatchContext.Provider>
    </StateContext.Provider>
}

export default Login;