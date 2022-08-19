import { IconButton, INavLinkGroup, Nav, Persona, Stack } from "@fluentui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "./api"
import useAppSelector from "./hooks/useAppSelector"

const NavSection = () => {
    const nav_width = 200;
    const navigate = useNavigate();
    const active_user_state = useAppSelector(state => state.active_user);

    const [view_menu, setViewMenu] = useState(true);

    const logout = () => {
        api.auth.session.del({}).then(res => {
            if (res.status === 200) {
                window.location.pathname = "/auth/session"
            }
        }).catch(console.error)
    }

    let full_name = null;
    let username = "unknown";

    if (active_user_state.user) {
        username = active_user_state.user.username;
        full_name = active_user_state.user.full_name;
    }

    let nav_groups: INavLinkGroup[] = [
        {
            links: [
                {
                    name: "New Entry",
                    url: "/entries/0",
                    icon: "Add"
                },
                {
                    name: "Entries",
                    url: "/entries",
                    icon: "List"
                },
                {
                    name: "Fields",
                    url: "/custom_fields",
                    icon: "FieldNotChanged"
                },
                {
                    name: "Tags",
                    url: "/tags",
                    icon: "Tag"
                },
            ]
        },
        {
            name: "Manage",
            collapseByDefault: true,
            links: [
                {
                    name: "Users",
                    url: "/users"
                },
                {
                    name: "Account",
                    url: "/account"
                },
                {
                    name: "Settings",
                    url: "/settings"
                }
            ]
        }
    ];

    if (active_user_state.user.level === 1) {
        nav_groups.push({
            name: "Admin",
            collapseByDefault: true,
            links: [
                {
                    name: "Users",
                    url: "/admin/users"
                }
            ]
        });
    }

    nav_groups.push({
        links: [
            {
                name: "Logout",
                url: "/auth/session",
                icon: "Leave",
                onClick: logout
            }
        ]
    })

    return <div style={{
        width: view_menu ? nav_width : "min-content"
    }}>
        <Stack
            tokens={{padding: 4, childrenGap: 8}}
            styles={{root: {
                position: "relative",
                top: 0,
                height: "100%",
                zIndex: 2,
                backgroundColor: "white"
            }}}
        >
            {/* <IconButton
                iconProps={{iconName: view_menu ? "DoubleChevronLeft" : "DoubleChevronRight"}}
                styles={{"root": {
                    position: view_menu ? "absolute" : null,
                    top: view_menu ? 0 : null,
                    right: view_menu ? 0 : null,
                    zIndex: 1
                }}}
                onClick={() => setViewMenu(!view_menu)}
            /> */}
            <Persona
                text={full_name ?? username}
                secondaryText={full_name != null ? username : null}
            />
            <Nav
                styles={{
                    "groupContent": {
                        marginBottom: 0
                    }
                }}
                onLinkClick={(e,i) => {
                    if (e != null) {
                        e.preventDefault();
                    }

                    if (i != null) {
                        navigate(i.url);
                    }
                }}
                groups={nav_groups}
            />
        </Stack>
    </div>
}

export default NavSection;