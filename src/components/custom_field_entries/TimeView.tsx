import { DatePicker, DefaultButton, Label, Stack, Text, TooltipHost } from "@fluentui/react";
import React from "react"
import { TimeValue, TimeConfig, CustomFieldType } from "../../api/types";
import { displayDate } from "../../util/time";
import TimeInput from "../TimeInput";

interface DetailsTextProps {
    value: TimeValue
    config?: TimeConfig
}

const DetailsText = ({value, config}: DetailsTextProps) => {
    let detail_text = [
        `type: ${value.type}`
    ];

    if (config != null) {
    } else {
        detail_text.push("details unknown");
    }

    return <Text variant="small">{detail_text.join(" | ")}</Text>
}

interface TimeEditViewProps {
    value: TimeValue
    config?: TimeConfig

    onChange?: (value: TimeValue) => void
}

export const TimeEditView = ({value, config = null, onChange}: TimeEditViewProps) => {
    let date = new Date(value.value);

    return <Stack tokens={{childrenGap: 2}}>
        <Stack tokens={{childrenGap: 2}}>
            <Label>Value</Label>
            <Stack horizontal tokens={{childrenGap: 8}}>
                <DatePicker
                    value={date}
                    onSelectDate={d => {
                        let copy = new Date(date.getTime());
                        copy.setFullYear(d.getFullYear());
                        copy.setMonth(d.getMonth());
                        copy.setDate(d.getDate());
                        onChange?.({type: CustomFieldType.Time, value: copy.toISOString()});
                    }}
                />
                <TimeInput value={date} onChange={d => {
                    onChange?.({type: CustomFieldType.Time, value: d.toISOString()});
                }}/>
                <TooltipHost content="sets the time to this current moment">
                    <DefaultButton text="Now" onClick={() => onChange?.({type: CustomFieldType.Time, value: (new Date()).toISOString()})}/>
                </TooltipHost>
            </Stack>
        </Stack>
        <DetailsText value={value} config={config}/>
    </Stack>
}

interface TimeReadViewProps {
    value: TimeValue
    config?: TimeConfig
}

export const TimeReadView = ({value, config}: TimeReadViewProps) => {
    return <Stack tokens={{childrenGap: 2}}>
        <Text>{`value: ${displayDate(new Date(value.value))}`}</Text>
        <DetailsText value={value} config={config}/>
    </Stack>
}