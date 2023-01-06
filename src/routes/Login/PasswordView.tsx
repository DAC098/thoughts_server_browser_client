import { DefaultButton, Stack, TextField } from "@fluentui/react";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";
import { actions } from "../../redux/slices/active_user";
import { useAppDispatch } from "../../redux/store";
import { urlFromLocation } from "../../util/url";
import { DispatchContext, StateContext } from "./state";

const PasswordView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const login_state = useContext(StateContext);
    const login_dispatch = useContext(DispatchContext);

    let [sending, setSending] = useState(false);

    let [password, setPassword] = useState("");
    let [password_error, setPasswordError] = useState("");

    const login = () => {
        if (sending) {
            return;
        }

        setSending(true);
        setPasswordError("");

        api.auth.session.post({post: {username: login_state.username, password}}).then((res) => {
            let user = res.body.data;
            let url = urlFromLocation(location);

            dispatch(actions.set_user(user));
            navigate(url.searchParams.get("jump_to") ?? "/entries");
        }).catch(err => {
            if (err.type === "InvalidPassword") {
                setPasswordError(err.message);
                setSending(false);
            } else if (err.type === "VerifySession") {
                login_dispatch({type: "set_step", value: "otp"});
            }
        });
    }

    return <form onSubmit={e => {
        e.preventDefault();
        login();
    }}>
        <Stack tokens={{childrenGap: 8}}>
            <TextField
                label={"Username / Email"}
                type="text" 
                name="username"
                value={login_state.username}
                disabled
            />
            <TextField
                required
                label="Password"
                type="password"
                name="password"
                canRevealPassword
                value={password}
                errorMessage={password_error}
                onChange={(e,v) => {
                    if (v != null) {
                        setPassword(v)
                    }
                }}
            />
            <DefaultButton
                primary
                text={"Login"}
                type="submit"
                disabled={sending}
            />
            <DefaultButton
                text={"Cancel"}
                type="button"
                disabled={sending}
                onClick={() => {
                    login_dispatch({type: "set_step", value: "username"});
                }}
            />
        </Stack>
    </form>
};

export default PasswordView;