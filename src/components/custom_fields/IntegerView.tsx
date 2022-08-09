import { SpinButton, Stack, Toggle, Label } from "@fluentui/react"
import React from "react"
import { IntegerConfig, CustomFieldType } from "../../apiv2/types"
import { optionalCloneInteger } from "../../util/clone"

interface IntegerEditViewProps {
    config: IntegerConfig

    onChange?: (config: IntegerConfig) => void
}

export const IntegerEditView = ({config, onChange}: IntegerEditViewProps) => {
    return <Stack horizontal tokens={{childrenGap: 8}}>
        <Stack tokens={{childrenGap: 8}}>
            <Label>Minimum</Label>
            <Stack horizontal verticalAlign="center" tokens={{childrenGap: 8}}>
                <Toggle checked={config.minimum != null} onChange={(e,c) => {
                    onChange?.({type: CustomFieldType.Integer, minimum: c ? 0 : null, maximum: optionalCloneInteger(config.maximum)});
                }}/>
                <SpinButton 
                    disabled={config.minimum == null}
                    value={config.minimum?.toString() ?? "0"}
                    onChange={(e,v) => {
                        let int = parseInt(v);
                        onChange?.({type: CustomFieldType.Integer,minimum: int,maximum: optionalCloneInteger(config.maximum)});
                    }}
                />
            </Stack>
        </Stack>
        <Stack tokens={{childrenGap: 8}}>
            <Label>Maximum</Label>
            <Stack horizontal verticalAlign="center" tokens={{childrenGap: 8}}>
                <Toggle checked={config.maximum != null} onChange={(e,c) => {
                    onChange?.({type: CustomFieldType.Integer, minimum: optionalCloneInteger(config.minimum), maximum: c ? 0 : null});
                }}/>
                <SpinButton
                    disabled={config.maximum == null}
                    value={config.maximum?.toString() ?? "0"}
                    onChange={(e,v) => {
                        let int = parseInt(v);
                        onChange?.({type: CustomFieldType.Integer, minimum: optionalCloneInteger(config.minimum), maximum: int});
                    }}
                />
            </Stack>
        </Stack>
    </Stack>
}

interface IntegerReadViewProps {

}

export const IntegerReadView = ({}: IntegerReadViewProps) => {
    return <div>IntegerRead</div>
}