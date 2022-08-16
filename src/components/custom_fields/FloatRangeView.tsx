import { Label, Position, SpinButton, Stack, Toggle } from "@fluentui/react";
import React from "react"
import { FloatRangeConfig, CustomFieldType } from "../../api/types";

interface FloatRangeEditViewProps {
    config: FloatRangeConfig

    onChange?: (config: FloatRangeConfig) => void
}

export const FloatRangeEditView = ({config, onChange}: FloatRangeEditViewProps) => {
    return <Stack tokens={{childrenGap: 8}}>
        <Stack horizontal tokens={{childrenGap: 8}}>
            <Stack tokens={{childrenGap: 8}}>
                <Label>Minimum</Label>
                <Stack horizontal verticalAlign="center" tokens={{childrenGap: 8}}>
                    <Toggle checked={config.minimum != null} onChange={(e,c) => {
                        onChange?.({
                            type: CustomFieldType.FloatRange, 
                            minimum: c ? 0 : null, maximum: config.maximum,
                            step: config.step, precision: config.precision
                        })
                    }}/>
                    <SpinButton
                        disabled={config.minimum == null}
                        value={config.minimum?.toString() ?? "0"}
                        onChange={(e,v) => {
                            let float = parseFloat(v);

                            if (!isNaN(float) && (config.maximum != null ? float < config.maximum : true)) {
                                onChange?.({
                                    type: CustomFieldType.FloatRange, 
                                    minimum: float, maximum: config.maximum,
                                    step: config.step, precision: config.precision
                                });
                            }
                        }}
                    />
                </Stack>
            </Stack>
            <Stack tokens={{childrenGap: 8}}>
                <Label>Maximum</Label>
                <Stack horizontal verticalAlign="center" tokens={{childrenGap: 8}}>
                    <Toggle checked={config.maximum != null} onChange={(e,c) => {
                        onChange?.({
                            type: CustomFieldType.FloatRange, 
                            minimum: config.minimum, maximum: c ? 0 : null,
                            step: config.step, precision: config.precision
                        });
                    }}/>
                    <SpinButton
                        disabled={config.maximum == null}
                        value={config.maximum?.toString() ?? "0"}
                        onChange={(e,v) => {
                            let float = parseFloat(v);

                            if (!isNaN(float) && (config.minimum != null ? float > config.minimum : true)) {
                                onChange?.({
                                    type: CustomFieldType.FloatRange, 
                                    minimum: config.minimum, maximum: float,
                                    step: config.step, precision: config.precision
                                });
                            }
                        }}
                    />
                </Stack>
            </Stack>
        </Stack>
        <Stack horizontal tokens={{childrenGap: 8}}>
            <SpinButton
                label="Step"
                labelPosition={Position.top}
                value={config.step.toString()}
                onChange={(e,v) => {
                    let float = parseFloat(v);

                    if (!isNaN(float)) {
                        onChange?.({
                            type: CustomFieldType.FloatRange,
                            minimum: config.minimum, maximum: config.maximum,
                            step: float, precision: config.precision
                        });
                    }
                }}
            />
            <SpinButton
                label="Precision"
                labelPosition={Position.top}
                value={config.precision.toString()}
                onChange={(e,v) => {
                    let int = parseInt(v);

                    if (!isNaN(int)) {
                        onChange?.({
                            type: CustomFieldType.FloatRange,
                            minimum: config.minimum, maximum: config.maximum,
                            step: config.step, precision: int
                        });
                    }
                }}
            />
        </Stack>
    </Stack>
}