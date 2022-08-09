import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../apiv2/types"
import { createUser } from "../../apiv2/types/methods"

interface UpdateInfoPayload {
    full_name: string, 
    username: string, 
    email?: string, 
    email_verified: boolean
}

export const active_user = createSlice({
    name: "active_user",
    initialState: {
        user: <User>window["active_user"] ?? createUser(),
        loading: false
    },
    reducers: {
        set_loading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        set_user: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        clear_user: (state) => {
            state.user = createUser();
        },
        update_info: (state, action: PayloadAction<UpdateInfoPayload>) => {
            state.user.username = action.payload.username;
            state.user.full_name = action.payload.full_name;
            state.user.email = action.payload.email;
            state.user.email_verified = action.payload.email_verified;
        }
    }
});

export const actions = {
    ...active_user.actions
};