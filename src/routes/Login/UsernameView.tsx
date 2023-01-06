import { DefaultButton, Stack, TextField } from "@fluentui/react"
import { useContext, useState } from "react"
import { DispatchContext, StateContext } from "./state";

const UsernameView = () => {
    const login_state = useContext(StateContext);
    const login_dispatch = useContext(DispatchContext);

    let [username, setUsername] = useState(login_state.username);

    let [sending, setSending] = useState(false);
    let [username_error, setUsernameError] = useState("");

    return <form onSubmit={e => {
            e.preventDefault();
            login_dispatch({type: "set_username", value: username});
            login_dispatch({type: "set_step", value: "password"});
        }}>
        <Stack tokens={{childrenGap: 8}}>
            <TextField 
                required 
                label={"Username / Email"}
                type="text" 
                name="username"
                value={username}
                errorMessage={username_error}
                onChange={(e,v) => {
                    setUsername(v)
                }}
            />
            <DefaultButton
                primary
                text={"Continue"}
                type="submit"
                disabled={sending}
            />
        </Stack>
    </form>
}

export default UsernameView;