import { useEffect, useState } from "react"
import { CommandBar, IGroup, ScrollablePane, ShimmeredDetailsList, Stack, Sticky, StickyPositionType } from "@fluentui/react";
import { useNavigate, useParams, Link, useOutlet } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch"
import useAppSelector from "../../hooks/useAppSelector"
import { CustomField } from "../../api/types";
import { custom_field_actions } from "../../redux/slices/custom_fields"
import { useUserId } from "../../hooks/useUserId";
import { useGlobalFetchCustomFields } from "../../hooks/useGlobalFetchCustomFields";
import OverlayedPage from "../../components/OverlayedPage";

interface CustomFieldsViewProps {
    user_specific?: boolean
}

const CustomFieldsView = ({user_specific = false}: CustomFieldsViewProps) => {
    const params = useParams<{user_id?: string}>();
    const navigate = useNavigate();
    const outlet = useOutlet();

    const custom_fields_state = useAppSelector(state => state.custom_fields);

    const globalFetchCustomFields = useGlobalFetchCustomFields();

    const user_id = useUserId();

    useEffect(() => {
        if (custom_fields_state.owner !== user_id) {
            globalFetchCustomFields({});
        }
    }, [user_id]);

    let groups: IGroup[] = null;

    return <>
    <Stack
        style={{
            width: "100%", height: "100%",
            position: "relative"
        }}
    >
        <ScrollablePane>
            <Sticky stickyPosition={StickyPositionType.Header} stickyBackgroundColor={"white"}>
                <CommandBar items={[
                    {
                        key: "new_field",
                        text: "New Field",
                        split: true,
                        iconProps: {iconName: "Add"},
                        onClick: () => navigate("/custom_fields/0"),
                        subMenuProps: {
                            items: [
                                {
                                    key: "new_global_field",
                                    text: "New Global Field"
                                }
                            ]
                        }
                    },
                    {
                        key: "refresh",
                        text: "Refresh",
                        iconProps: {iconName: "Refresh"},
                        onClick: () => globalFetchCustomFields({})
                    },
                ]}/>
            </Sticky>
            <ShimmeredDetailsList
                items={custom_fields_state.custom_fields}
                groups={groups}
                enableShimmer={custom_fields_state.loading}
                onRenderDetailsHeader={(p, d) => {
                    return <Sticky stickyPosition={StickyPositionType.Header}>
                        {d != null ? d(p) : null}
                    </Sticky>
                }}
                columns={[
                    {
                        key: "name",
                        name: "Name",
                        minWidth: 80,
                        maxWidth: 120,
                        onRender: (item: CustomField) => {
                            return <Link to={{
                                pathname: `${user_id ? `/users/${user_id}` : ""}/custom_fields/${item.id}`
                            }}>
                                {item.name}
                            </Link>
                        }
                    },
                    {
                        key: "order",
                        name: "Order",
                        minWidth: 40,
                        maxWidth: 60,
                        onRender: (item: CustomField) => {
                            return item.order;
                        }
                    },
                    {
                        key: "type",
                        name: "Type",
                        minWidth: 80,
                        maxWidth: 120,
                        onRender: (item: CustomField) => {
                            return item.config.type
                        }
                    },
                    {
                        key: "comment",
                        name: "Comment",
                        minWidth: 80,
                        fieldName: "comment"
                    }
                ]}
            />
        </ScrollablePane>
    </Stack>
    {outlet != null ?
        <OverlayedPage>
            {outlet}
        </OverlayedPage>
        :
        null
    }
    </>
}

export default CustomFieldsView;