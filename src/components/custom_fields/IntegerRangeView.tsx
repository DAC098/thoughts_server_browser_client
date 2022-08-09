import { Stack, Toggle, SpinButton, Label } from "@fluentui/react";
import React from "react"
import { IntegerRangeConfig, CustomFieldType } from "../../apiv2/types"
import { optionalCloneInteger } from "../../util/clone";

interface IntegerRangeEditViewProps {
    config: IntegerRangeConfig

    onChange?: (config: IntegerRangeConfig) => void
}

export const IntegerRangeEditView = ({config, onChange}: IntegerRangeEditViewProps) => {
    return <Stack horizontal tokens={{childrenGap: 8}}>
        <Stack tokens={{childrenGap: 8}}>
            <Label>Minimum</Label>
            <Stack horizontal verticalAlign="center" tokens={{childrenGap: 8}}>
                <Toggle checked={config.minimum != null} onChange={(e,c) => {
                    onChange?.({type: CustomFieldType.IntegerRange, minimum: c ? 0 : null, maximum: optionalCloneInteger(config.maximum)});
                }}/>
                <SpinButton 
                    disabled={config.minimum == null}
                    value={config.minimum?.toString() ?? "0"}
                    onChange={(e,v) => {
                        let int = parseInt(v);
                        onChange?.({type: CustomFieldType.IntegerRange,minimum: int,maximum: optionalCloneInteger(config.maximum)});
                    }}
                />
            </Stack>
        </Stack>
        <Stack tokens={{childrenGap: 8}}>
            <Label>Maximum</Label>
            <Stack horizontal verticalAlign="center" tokens={{childrenGap: 8}}>
                <Toggle checked={config.maximum != null} onChange={(e,c) => {
                    onChange?.({type: CustomFieldType.IntegerRange, minimum: optionalCloneInteger(config.minimum), maximum: c ? 0 : null});
                }}/>
                <SpinButton
                    disabled={config.maximum == null}
                    value={config.maximum?.toString() ?? "0"}
                    onChange={(e,v) => {
                        let int = parseInt(v);
                        onChange?.({type: CustomFieldType.IntegerRange, minimum: optionalCloneInteger(config.minimum), maximum: int});
                    }}
                />
            </Stack>
        </Stack>
    </Stack>
}

interface IntegerRangeReadViewProps {

}

export const IntegerRangeReadView = ({}) => {
    return <div>IntegerRangeRead</div>
}
