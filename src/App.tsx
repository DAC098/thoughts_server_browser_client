import { Stack } from "@fluentui/react"
import { RouteObject, useRoutes } from "react-router-dom"

import NavSection from "./NavSection"
import EntriesView from "./routes/EntriesView"
import CustomFieldsView from "./routes/CustomFieldsView"
import EntryIdView from "./routes/EntryIdView"
import Users from "./routes/users"
import UserIdView from "./routes/users/user_id"
import AccountView from "./routes/account"
import SettingsView from "./routes/settings"
import AdminUserListView from "./routes/admin/users"
import AdminUserIdView from "./routes/admin/users/users_id"
import TagsView from "./routes/TagsView"
import { FluentProvider } from "@fluentui/react-components"
import NotFound from "./routes/NotFound"
import CustomFieldIdView from "./routes/CustomFieldIdView"
import TagsIdView from "./routes/TagsIdView"

const App = () => {
    let core_routes: RouteObject[] = [
        {
            path: "tags",
            element: <TagsView/>,
            children: [
                {
                    path: ":tag_id",
                    element: <TagsIdView/>
                }
            ]
        },
        {
            path: "custom_fields",
            element: <CustomFieldsView/>,
            children: [
                {
                    path: ":field_id",
                    element: <CustomFieldIdView/>
                }
            ]
        },
        {
            path: "entries",
            element: <EntriesView/>,
            children: [
                {
                    path: ":entry_id",
                    element: <EntryIdView/>
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
            element: <NotFound/>
        }
    ];

    let routes_element = useRoutes(routes);

    return <FluentProvider>
        <Stack id={"main"} horizontal style={{position: "relative", width: "100vw", height: "100vh"}}>
            <Stack.Item id={"nav_section"} shrink={0} grow={0}>
                <NavSection/>
            </Stack.Item>
            <Stack.Item id={"content"} grow styles={{root: {position: "relative", width: "100%", height: "100%"}}}>
                {routes_element}
            </Stack.Item>
        </Stack>
    </FluentProvider>
}

export default App;