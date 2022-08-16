import { SpinButton, Stack, Text } from "@fluentui/react";
import React from "react"
import { IntegerValue, IntegerConfig, CustomFieldType } from "../../api/types";

interface DetailsTextProps {
    value: IntegerValue
    config?: IntegerConfig
}

const DetailsText = ({value, config}: DetailsTextProps) => {
    let detail_text = [
        `type: ${value.type}`
    ];

    if (config != null) {
        if (config.minimum != null) {
            detail_text.push(`minimum: ${config.minimum}`);
        }

        if (config.maximum != null) {
            detail_text.push(`maximum: ${config.maximum}`);
        }
    } else {
        detail_text.push("details unknown")
    }

    return <Text variant="small">{detail_text.join(' | ')}</Text>
}

interface IntegerEditViewProps {
    value: IntegerValue
    config?: IntegerConfig

    onChange?: (value: IntegerValue) => void
}

export const IntegerEditView = ({value, config = null, onChange}: IntegerEditViewProps) => {
    return <Stack tokens={{childrenGap: 2}}>
        <Stack horizontal tokens={{childrenGap: 8}}>
            <SpinButton
                label="Value"
                value={value.value.toString()}
                min={config != null ? config.minimum : null}
                max={config != null ? config.maximum : null}
                onChange={(e, v) => {
                    let int = parseInt(v);

                    if (!isNaN(int)) {
                        onChange?.({type: CustomFieldType.Integer, value: int})
                    }
                }}
            />
        </Stack>
        <DetailsText value={value} config={config}/>
    </Stack>
}

interface IntegerReadViewProps {
    value: IntegerValue
    config?: IntegerConfig
}

export const IntegerReadView = ({value, config}: IntegerReadViewProps) => {
    return <Stack tokens={{childrenGap: 2}}>
        <Text>{`value: ${value.value}`}</Text>
        <DetailsText value={value} config={config}/>
    </Stack>;
}