import React from "react"
import { Stack, Toggle } from "@fluentui/react";
import { CustomFieldType, TimeConfig } from "../../apiv2/types";

interface TimeEditViewProps {
    config: TimeConfig,
    
    onChange?: (config: TimeConfig) => void
}

export const TimeEditView = ({config, onChange}: TimeEditViewProps) => {
    return <Stack horizontal tokens={{childrenGap: 8}}>
        <Toggle label="As 12hr clock" onText="On" offText="Off" checked={config.as_12hr} onChange={(e,c) => 
            onChange?.({type: CustomFieldType.Time, as_12hr: c})
        }/>
    </Stack>
}

interface TimeReadViewProps {

}

export const TimeReadView = ({}: TimeReadViewProps) => {
    return <div>TimeRead</div>
}