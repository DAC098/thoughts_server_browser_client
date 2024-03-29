import { IconButton, Persona, Stack } from "@fluentui/react";
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { } from "../api/types"
import api from "../api";

const Users = () => {
    let [allowed, setAllowed] = useState<any[]>([]);
    let [given, setGiven] = useState<any[]>([]);
    let [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const fetchUserList = () => {
        if (loading) {
            return;
        }

        setLoading(true);

        api.users.get({}).then(res => {
            let body = res.body;
        }).catch(console.error).then(() => {
            setLoading(false)
        });
    }

    useEffect(() => {
        fetchUserList();
    }, []);

    return <Stack horizontal tokens={{padding: 8, childrenGap: 8}}>
        <Stack tokens={{childrenGap: 8}}>
            <h4 style={{minWidth: 158}}>Allowed Access</h4>
            {allowed.map(v =>
                <Stack key={v.id} horizontal verticalAlign="center" tokens={{childrenGap: 8}}>
                    <Persona
                        text={v.full_name ?? v.username}
                        secondaryText={v.full_name != null ? v.username : null}
                        onRenderPrimaryText={() => <Link to={`/users/${v.id}`}>
                            {v.full_name ?? v.username}
                        </Link>}
                    />
                    <IconButton
                        menuProps={{
                            items: [
                                {
                                    key: "entries",
                                    text: "Entries",
                                    onClick: () => navigate(`/users/${v.id}/entries`)
                                },
                                {
                                    key: "custom_fields",
                                    text: "Fields",
                                    onClick: () => navigate(`/users/${v.id}/custom_fields`)
                                },
                                {
                                    key: "tags",
                                    text: "Tags",
                                    onClick: () => navigate(`/users/${v.id}/tags`)
                                }
                            ]
                        }}
                    />
                </Stack>
            )}
        </Stack>
        <Stack tokens={{childrenGap: 8}}>
            <h4 style={{minWidth: 158}}>Given Access</h4>
            {given.map(v => <Stack key={v.id} horizontal verticalAlign="center" tokens={{childrenGap: 8}}>
                <Persona
                    text={v.full_name ?? v.username}
                    secondaryText={v.full_name != null ? v.username : null}
                    onRenderPrimaryText={() => <Link to={`/users/${v.id}`}>
                        {v.full_name ?? v.username}
                    </Link>}
                />
                <IconButton
                    menuProps={{
                        items: [
                            {
                                key: "revoke",
                                text: "Revoke",
                                onClick: () => {}
                            }
                        ]
                    }}
                />
            </Stack>)}
        </Stack>
    </Stack>
}

export default Users;