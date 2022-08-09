import { Stack, Toggle } from "@fluentui/react";
import React from "react"
import { CustomFieldType, TimeRangeConfig } from "../../apiv2/types";

interface TimeRangeEditViewProps {
    config: TimeRangeConfig

    onChange?: (config: TimeRangeConfig) => void
}

export const TimeRangeEditView = ({config, onChange}: TimeRangeEditViewProps) => {
    return <Stack horizontal tokens={{childrenGap: 8}}>
        <Toggle label="As 12hr clock" onText="On" offText="Off" checked={config.as_12hr} onChange={(e,c) => 
            onChange?.({type: CustomFieldType.TimeRange, as_12hr: c, show_diff: config.show_diff})
        }/>
        <Toggle label="Show Time Difference" onText="On" offText="Off" checked={config.show_diff} onChange={(e,c) => 
            onChange?.({type: CustomFieldType.TimeRange, as_12hr: config.as_12hr, show_diff: c})
        }/>
    </Stack>
}

interface TimeRangeReadViewProps {

}

export const TimeRangeReadView = ({}: TimeRangeReadViewProps) => {
    return <div>TimeRangeRead</div>
}