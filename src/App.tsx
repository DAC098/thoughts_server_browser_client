import { Breadcrumb, IconButton, ScrollablePane, Stack } from "@fluentui/react"
import React, { useEffect } from "react"
import { Route, RouteObject, useLocation, useRoutes } from "react-router-dom"

import NavSection from "./NavSection"
import EntriesView from "./routes/entries"
import CustomFieldsView from "./routes/custom_fields"
import EntryId from "./routes/entries/entry_id"
import Users from "./routes/users"
import UserIdView from "./routes/users/user_id"
import AccountView from "./routes/account"
import SettingsView from "./routes/settings"
import FieldIdView from "./routes/custom_fields/field_id"
import AdminUserListView from "./routes/admin/users"
import AdminUserIdView from "./routes/admin/users/users_id"
import TagsView from "./routes/tags"
import TagsIDView from "./routes/tags/tag_id"
import useAppDispatch from "./hooks/useAppDispatch"
import useAppSelector from "./hooks/useAppSelector"
import { view_actions } from "./redux/slices/view"
import resize_listener from "./util/ResizeListener"
import GlobalCustomFieldsView from "./routes/global/custom_fields"
import GlobalCustomFieldIdView from "./routes/global/custom_fields/field_id"

const App = () => {
    const app_dispatch = useAppDispatch();
    const view_state = useAppSelector(state => state.view);

    useEffect(() => {
        let is_min_width = window.innerWidth <= 1080;

        const onResize = (width: number, height: number) => {
            if (width <= 1080) {
                if (!is_min_width) {
                    app_dispatch(view_actions.update_visibility(true));
                    is_min_width = true;
                }
            } else {
                if (is_min_width) {
                    app_dispatch(view_actions.update_visibility(false));
                    is_min_width = false;
                }
            }
        }

        resize_listener.on("resize", onResize);

        return () => {
            resize_listener.off("resize", onResize);
        }
    }, []);

    let core_routes: RouteObject[] = [
        {
            path: "tags",
            element: <TagsView/>
        },
        {
            path: "custom_fields",
            element: <CustomFieldsView/>
        },
        {
            path: "entries",
            element: <EntriesView/>,
            children: [
                {
                    path: ":entry_id",
                    element: <EntryId/>
                }
            ]
        }
    ];

    let routes: RouteObject[] = [
        {
            path: "account",
            element: <AccountView/>
        },
        {
            path: "settings",
            element: <SettingsView/>
        },
        ...core_routes,
        {
            path: "user",
            children: [
                {
                    index: true,
                    element: <Users/>
                },
                {
                    path: ":user_id",
                    children: [
                        {
                            index: true,
                            element: <UserIdView/>
                        },
                        ...core_routes
                    ]
                }
            ]
        },
        {
            path: "admin",
            children: [
                {
                    index: true,
                    element: <div>admin dashboard</div>
                },
                {
                    path: "users",
                    element: <AdminUserListView/>,
                    children: [
                        {
                            path: ":user_id",
                            element: <AdminUserIdView/>
                        }
                    ]
                }
            ]
        },
        {
            path: "*",
            element: <div>Page Not Found</div>
        }
    ];

    let routes_element = useRoutes(routes);

    return <Stack id={"main"} horizontal style={{position: "relative", width: "100vw", height: "100vh"}}>
        <Stack.Item id={"nav_section"} shrink={0} grow={0}>
            <NavSection/>
        </Stack.Item>
        <Stack.Item id={"content_and_header"} grow styles={{root: {
            maxWidth: view_state.is_min_width ? "100vw" : (
                view_state.visible ? "calc(100vw - 200px)" : "100vw"
            ),
            maxHeight: "100vh"
        }}}>
            <Stack styles={{root: {position: "relative", width: "100%", height: "100%"}}}>
                <Stack.Item id={"header"} shrink={0} grow={0} styles={{root: {backgroundColor: "black"}}}>
                    <Stack horizontal verticalAlign="center" tokens={{childrenGap: 8, padding: "4 8px"}}>
                        <IconButton
                            iconProps={{iconName: "GlobalNavButton"}} 
                            onClick={() => app_dispatch(view_actions.set_visible(!view_state.visible))}
                        />
                        <Stack.Item grow></Stack.Item>
                    </Stack>
                </Stack.Item>
                <Stack.Item id="content" grow styles={{root: {
                    position: "relative"
                }}}>
                    {routes_element}
                </Stack.Item>
            </Stack>
        </Stack.Item>
    </Stack>
}

export default App;