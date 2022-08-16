import React from "react"
import { SpinButton, Stack, Text } from "@fluentui/react";
import { FloatValue, FloatConfig, CustomFieldType } from "../../api/types";

interface DetailsTextProps {
    value: FloatValue
    config?: FloatConfig
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
        
        detail_text.push(`step: ${config.step}`);
        detail_text.push(`precision: ${config.precision}`);
    } else {
        detail_text.push("details unknown");
    }

    return <Text variant="small">{detail_text.join(' | ')}</Text>
}

interface FLoatEditViewProps {
    value: FloatValue
    config?: FloatConfig

    onChange?: (value: FloatValue) => void
}

export const FloatEditView = ({value, config = null, onChange}: FLoatEditViewProps) => {
    return <Stack tokens={{childrenGap: 2}}>
        <Stack horizontal tokens={{childrenGap: 8}}>
            <SpinButton
                value={value.value.toString()}
                min={config != null ? config.minimum : null}
                max={config != null ? config.maximum : null}
                step={config.step}
                precision={config.precision}
                onChange={(e,v) => {
                    let float = parseFloat(v);

                    if (!isNaN(float)) {
                        onChange?.({type: CustomFieldType.Float, value: float});
                    }
                }}
            />
        </Stack>
        <DetailsText value={value} config={config}/>
    </Stack>
}

interface FloatReadViewProps {
    value: FloatValue
    config?: FloatConfig
}

export const FloatReadView = ({value, config}: FloatReadViewProps) => {
    return <Stack tokens={{childrenGap: 2}}>
        <Text>{`value: ${value.value}`}</Text>
        <DetailsText value={value} config={config}/>
    </Stack>
}