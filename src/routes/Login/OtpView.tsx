import { DefaultButton, Stack, TextField } from "@fluentui/react";
import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { actions } from "../../redux/slices/active_user";
import { useAppDispatch } from "../../redux/store";
import { json } from "../../request";
import { urlFromLocation } from "../../util/url";
import { DispatchContext, StateContext } from "./state"

const OtpView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const login_state = useContext(StateContext);
    const login_dispatch = useContext(DispatchContext);

    let [sending, setSending] = useState(false);
    let [use_recovery, setUseRecovery] = useState(false);

    let [otp_value, setOtpValue] = useState("");
    let [otp_error, setOtpError] = useState("");

    const verify = () => {
        if (sending) {
            return;
        }

        setSending(true);
        setOtpError("");

        json.post("/auth/session/verify", {
            method: use_recovery ? "TotpHash" : "Totp",
            value: otp_value
        }).then(res => {
            let user = res.body.data;
            let url = urlFromLocation(location);

            dispatch(actions.set_user(user));
            navigate(url.searchParams.get("jump_to") ?? "/entries");
        }).catch(err => {
            if (err.type === "InvalidTotpCode") {
                setOtpError(err.message);
            }

            setSending(false);
        });
    }

    return <form onSubmit={e => {
        e.preventDefault();
        verify();
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
                label={use_recovery ? "OTP Recovery" : "OTP"}
                type="text"
                name={use_recovery ? "recovery code" : "otp code"}
                value={otp_value}
                errorMessage={otp_error}
                onChange={(e, v) => {
                    setOtpValue(v);
                }}
            />
            <div style={{position: "relative", display: "flex", flexDirection: "row-reverse"}}>
                <a 
                    onClick={() => {setUseRecovery(v => !v)}}
                    style={{position: "relative", cursor: "pointer"}}
                >
                    {use_recovery ? "Use OTP code" : "Use recovery code"}
                </a>
            </div>
            <DefaultButton
                primary
                text={"Verify"}
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
}

export default OtpView;