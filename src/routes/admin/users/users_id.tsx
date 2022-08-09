import { DefaultButton, Dialog, DialogFooter, DialogType, Dropdown, IconButton, Persona, PersonaSize, ScrollablePane, SearchBox, Separator, Stack, TextField } from "@fluentui/react"
import React, { Reducer, useEffect, useReducer } from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { ComposedFullUser, User, UserLevel } from "../../../apiv2/types"
import { cloneComposedFullUser, createComposedFullUser } from "../../../apiv2/types/methods"
import IndentSection from "../../../components/IndentSection"
import api from "../../../apiv2"
import { json } from "../../../request"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SliceActionTypes } from "../../../redux/types"

interface AdminUserIdViewState {
    original: ComposedFullUser
    current: ComposedFullUser
    
    loading: boolean
    sending: boolean
    deleting: boolean
    loading_available_users: boolean
    
    available_users: User[]
    known_users: {[key: string]: boolean}

    password: string

    prep_delete: boolean
    changes_made: boolean
}

function makeInitialState(): AdminUserIdViewState { 
    return {
        original: createComposedFullUser(),
        current: createComposedFullUser(),
    
        loading: false,
        sending: false,
        deleting: false,
        loading_available_users: false,
    
        available_users: [],
        known_users: {},
    
        password: "",
    
        prep_delete: false,
        changes_made: false
    }
}

const adminUserIdViewSlice = createSlice({
    name: "admin_user_id_view",
    initialState: makeInitialState(),
    reducers: {
        set_password: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },

        set_loading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        set_sending: (state, action: PayloadAction<boolean>) => {
            state.sending = action.payload;
        },
        set_deleting: (state, action: PayloadAction<boolean>) => {
            state.deleting = action.payload;
        },
        set_loading_available_users: (state, action: PayloadAction<boolean>) => {
            state.loading_available_users = action.payload;
        },

        set_available_users: (state, action: PayloadAction<User[]>) => {
            state.available_users = action.payload;
        },

        set_user: (state, action: PayloadAction<ComposedFullUser>) => {
            state.original = action.payload;
            state.current = cloneComposedFullUser(action.payload);
            state.password = "";
            state.known_users = {};

            for (let rec of state.current.access) {
                state.known_users[rec.allowed_for] = true;
            }
        },
        update_user: (state, action: PayloadAction<any>) => {
            state.current[action.payload.key] = action.payload.value;
        },
        reset_user: (state) => {
            state.current = cloneComposedFullUser(state.original);
            state.password = "";
            state.known_users = {};

            for (let rec of state.current.access) {
                state.known_users[rec.allowed_for] = true;
            }
        },

        set_prep_delete: (state, action: PayloadAction<boolean>) => {
            state.prep_delete = action.payload;
        },

        add_user_access: (state, action: PayloadAction<User>) => {
            if (state.known_users[action.payload.id] ?? false) {
                return;
            }
            let is_manager = state.current.user.level === UserLevel.Manager;
            let access = {
                owner: is_manager ? state.current.user.id : action.payload.id,
                ability: "r",
                allowed_for: is_manager ? action.payload.id : state.current.user.id
            }

            state.current.access.push(access);
            state.known_users[action.payload.id] = true;
        },
        drop_user_access: (state, action: PayloadAction<number>) => {
            delete state.known_users[state.current.access[action.payload].allowed_for];
            state.current.access.splice(action.payload, 1);
        }
    }
});

const reducer_actions = {
    ...adminUserIdViewSlice.actions
};

type AdminUserIdViewActions = SliceActionTypes<typeof reducer_actions>;
type AdminUserIdViewReducer = Reducer<AdminUserIdViewState, AdminUserIdViewActions>;

const UserInformation = () => {
    const params = useParams<{user_id: string}>();
    const navigate = useNavigate();

    let [state, dispatch] = useReducer<AdminUserIdViewReducer>(
        adminUserIdViewSlice.reducer, makeInitialState()
    );

    const sendUpdate = () => {
        if (state.sending) {
            return;
        }

        dispatch(reducer_actions.set_sending(true));

        let promise = null;
        
        if (params.user_id === "0") {
            let post: any = {...state.current};
            post.user["password"] = state.password;

            api.admin.users.post({post}).then(res => {
                let record = res.body.data;
                dispatch(reducer_actions.set_user(record));
                navigate(`/admin/users/${record.user.id}`);
            }).catch(console.error).then(() => {
                dispatch(reducer_actions.set_sending(false));
            });
        } else {
            api.admin.users.id.put({
                id: params.user_id, 
                post: {
                    user: {...state.current.user},
                    data: {...state.current.data},
                    access: state.current.access.map(rec => {
                        return rec.allowed_for
                    })
                }
            }).then(res => {
                dispatch(reducer_actions.set_user(res.body.data));
            }).catch(console.error).then(() => {
                dispatch(reducer_actions.set_sending(false));
            });
        }
    }

    const sendDelete = () => {
        if (state.deleting) {
            return;
        }

        if (params.user_id === "0") {
            return;
        }

        dispatch(reducer_actions.set_deleting(true));

        json.delete(`/admin/users/${params.user_id}`).then(() => {
            navigate("/admin/users");
        }).catch((e) => {
            console.error(e);
            dispatch(reducer_actions.set_deleting(false));
        });
    }

    const fetchUser = async (): Promise<ComposedFullUser | null> => {
        if (state.loading) {
            return;
        }

        dispatch(reducer_actions.set_loading(true));
        let u = null;
        
        try {
            let res = await api.admin.users.id.get({id: params.user_id});
            u = res.body.data;
            dispatch(reducer_actions.set_user(u));
        } catch (e) {
            console.error(e);
        }

        dispatch(reducer_actions.set_loading(false));

        return u;
    }

    const fetchAvailableUsers = (current_level = state.current.user.level) => {
        if (state.loading_available_users || state.loading) {
            return;
        }

        dispatch(reducer_actions.set_loading_available_users(true));

        api.admin.users.get({query: {level: current_level == 20 ? 10 : 20}}).then(res => {
            dispatch(reducer_actions.set_available_users(res.body.data));
        }).catch(console.error).then(() => {
            dispatch(reducer_actions.set_loading_available_users(false));
        });
    }

    useEffect(() => {
        let user_id = parseInt(params.user_id);

        if (isNaN(user_id) || user_id === 0) {
            fetchAvailableUsers();
            return;
        }

        fetchUser().then(v => {
            if (v) fetchAvailableUsers(v.user.level)
        });
    }, [params.user_id]);

    let available_users_components = [];

    for (let user of state.available_users) {
        if (state.known_users[user.id] ?? false) {
            continue;
        }

        available_users_components.push(
            <Stack key={user.id} horizontal verticalAlign="center">
                <Stack.Item grow>
                    <Persona
                        text={user.full_name ?? user.username}
                        secondaryText={user.full_name != null ? user.username : null}
                    />
                </Stack.Item>
                <IconButton
                    iconProps={{iconName: "Add"}}
                    onClick={() => dispatch(reducer_actions.add_user_access(user))}
                />
            </Stack>
        );
    }

    return <>
        <Stack horizontal>
            <DefaultButton
                text="Save"
                primaryDisabled={state.sending}
                split
                iconProps={{iconName: "Save"}}
                onClick={sendUpdate}
                menuProps={{
                    items: [
                        {
                            key: "delete",
                            text: "Delete",
                            iconProps: {iconName: "Delete"},
                            onClick: () => dispatch(reducer_actions.set_prep_delete(true))
                        }
                    ]
                }}
            />
        </Stack>
        <Stack horizontal>
            <Persona size={PersonaSize.size120}/>
            <Stack horizontal tokens={{childrenGap: 8}}>
                <Stack tokens={{childrenGap: 8}}>
                    <TextField placeholder="Full Name" value={state.current.user.full_name ?? ""} onChange={(e, full_name) =>
                        dispatch(reducer_actions.update_user({key: "full_name", value: full_name}))
                    }/>
                    <TextField placeholder="Username" value={state.current.user.username} onChange={(e, username) => 
                        dispatch(reducer_actions.update_user({key: "username", value: username}))
                    }/>
                </Stack>
                <Stack tokens={{childrenGap: 8}}>
                    <Dropdown
                        styles={{"root": {width: 120}}}
                        options={[
                            {key: "manager", text: "Manager", selected: state.current.user.level === 10, data: 10},
                            {key: "user", text: "User", selected: state.current.user.level === 20, data: 20}
                        ]}
                        onChange={(e, o, i) => {
                            dispatch(reducer_actions.update_user({key: "level", value: o.data}));
                            fetchAvailableUsers(o.data);
                        }}
                    />
                </Stack>
            </Stack>
        </Stack>
        <IndentSection content="Personal Information">
            <Stack tokens={{childrenGap: 8}} styles={{root: {width: 250}}}>
                <TextField label="Email" value={state.current.user.email ?? ""} onChange={(e, email) => 
                    dispatch(reducer_actions.update_user({key: "email", value: email}))
                }/>
            </Stack>
        </IndentSection>
        <IndentSection content="Authenticiation">
            <Stack tokens={{childrenGap: 8}} styles={{root: {width: 250}}}>
                <TextField label="Password" value={state.password} onChange={(e,v) => dispatch(reducer_actions.set_password(v))}/>
            </Stack>
        </IndentSection>
        <IndentSection content="User Access">
            <Stack horizontal tokens={{childrenGap: 8}}>
                <Stack.Item grow>
                    <SearchBox defaultValue=""/>
                </Stack.Item>
            </Stack>
            <Stack horizontal styles={{root: {width: "100%"}}}>
                <Stack.Item styles={{"root": {width: "50%"}}}>
                    <Stack tokens={{childrenGap: 8}}>
                        <Separator children={"Available"}/>
                        {available_users_components}
                    </Stack>
                </Stack.Item>
                <Stack.Item grow>
                    <Stack tokens={{childrenGap: 8}}>
                        <Separator children={"Assigned"}/>
                        {state.current.access.map((v, index) =>
                            <Stack key={v.allowed_for} horizontal verticalAlign="center">
                                <Stack.Item grow>
                                    <Persona
                                        text={""}
                                        secondaryText={""}
                                    />
                                </Stack.Item>
                                <IconButton 
                                    iconProps={{iconName: "Delete"}}
                                    onClick={() => dispatch(reducer_actions.drop_user_access(index))}
                                />
                            </Stack>
                        )}
                    </Stack>
                </Stack.Item>
            </Stack>
        </IndentSection>
        <Dialog
            hidden={!state.prep_delete}
            onDismiss={() => dispatch(reducer_actions.set_prep_delete(false))}
            dialogContentProps={{
                type: DialogType.normal,
                title: "Delete Field",
                subText: "Are you sure you want to delete this field?"
            }}
        >
            <DialogFooter>
                <DefaultButton
                    text="Yes"
                    primary
                    onClick={() => {
                        dispatch(reducer_actions.set_prep_delete(false));
                        sendDelete();
                    }}
                />
                <DefaultButton
                    text="No"
                    onClick={() => dispatch(reducer_actions.set_prep_delete(false))}
                />
            </DialogFooter>
        </Dialog>
    </>
}

const AdminUserIdView = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return <Stack 
        horizontal
        verticalAlign="center"
        horizontalAlign="center"
        style={{
            position: "absolute",
            top: 0, zIndex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)"
        }}
    >
        <Stack style={{
            width: 600, height: "100%",
            backgroundColor: "white",
            position: "relative"
        }}>
            <IconButton
                iconProps={{iconName: "Cancel"}}
                style={{position: "absolute", top: 0, right: 0, zIndex: 2}}
                onClick={() => {
                    let new_path = location.pathname.split("/");
                    new_path.pop();

                    navigate(new_path.join("/"));
                }}
            />
            <ScrollablePane>
                <Stack tokens={{childrenGap: 8, padding: 8}}>
                    <UserInformation/>
                </Stack>
            </ScrollablePane>
        </Stack>
    </Stack>
}

export default AdminUserIdView;