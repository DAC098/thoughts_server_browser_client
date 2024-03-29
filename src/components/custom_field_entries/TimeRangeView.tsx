import { DatePicker, DefaultButton, Label, Stack, Text, TooltipHost } from "@fluentui/react";
import React from "react"
import { TimeRangeValue, TimeRangeConfig, CustomFieldType } from "../../api/types";
import { displayDate } from "../../util/time";
import TimeInput from "../TimeInput";

interface DetailsTextProps {
    value: TimeRangeValue
    config?: TimeRangeConfig
}

const DetailsText = ({value, config}: DetailsTextProps) => {
    let detail_text = [
        `type: ${value.type}`
    ];

    if (config != null) {

    } else {
        detail_text.push("details unknown");
    }

    return <Text variant="small">{detail_text.join(' | ')}</Text>
}

interface TimeRangeEditViewProps {
    value: TimeRangeValue
    config?: TimeRangeConfig

    onChange?: (value: TimeRangeValue) => void
}

export const TimeRangeEditView = ({value, config = null, onChange}: TimeRangeEditViewProps) => {
    let start_date = new Date(value.low);
    let finish_date = new Date(value.high);
    
    return <Stack tokens={{childrenGap: 2}}>
        <Stack horizontal wrap tokens={{childrenGap: 8}}>
            <Stack tokens={{childrenGap: 2}}>
                <Label>Start</Label>
                <Stack horizontal tokens={{childrenGap: 8}}>
                    <DatePicker
                        value={start_date}
                        onSelectDate={d => {
                            let copy = new Date(start_date.getTime());
                            copy.setFullYear(d.getFullYear());
                            copy.setMonth(d.getMonth());
                            copy.setDate(d.getDate());
                            onChange?.({type: CustomFieldType.TimeRange, low: copy.toISOString(), high: finish_date.toISOString()})
                        }}
                    />
                    <TimeInput value={start_date} onChange={d => {
                        onChange?.({type: CustomFieldType.TimeRange, low: d.toISOString(), high: finish_date.toISOString()});
                    }}/>
                    <TooltipHost content="sets the time to this current moment">
                        <DefaultButton text="Now" onClick={() => onChange?.({type: CustomFieldType.TimeRange, low: (new Date()).toISOString(), high: finish_date.toISOString()})}/>
                    </TooltipHost>
                </Stack>
            </Stack>
            <Stack tokens={{childrenGap: 2}}>
                <Label>Finish</Label>
                <Stack horizontal tokens={{childrenGap: 8}}>
                    <DatePicker
                        value={finish_date}
                        onSelectDate={d => {
                            let copy = new Date(finish_date.getTime());
                            copy.setFullYear(d.getFullYear());
                            copy.setMonth(d.getMonth());
                            copy.setDate(d.getDate());
                            onChange?.({type: CustomFieldType.TimeRange, low: start_date.toISOString(), high: copy.toISOString()})
                        }}
                    />
                    <TimeInput value={finish_date} onChange={d => {
                        onChange?.({type: CustomFieldType.TimeRange, low: start_date.toISOString(), high: d.toISOString()});
                    }}/>
                    <TooltipHost content="sets the time to this current moment">
                        <DefaultButton text="Now" onClick={() => onChange?.({type: CustomFieldType.TimeRange, low: start_date.toISOString(), high: (new Date()).toISOString()})}/>
                    </TooltipHost>
                </Stack>
            </Stack>
        </Stack>
        <DetailsText value={value} config={config}/>
    </Stack>
}

interface TimeRangeReadViewProps {
    value: TimeRangeValue
    config?: TimeRangeConfig
}

export const TimeRangeReadView = ({value, config}: TimeRangeReadViewProps) => {
    return <Stack tokens={{childrenGap: 2}}>
        <Stack tokens={{childrenGap: 8}}>
            <Text>{`start: ${displayDate(new Date(value.low))}`}</Text>
            <Text>{`finish: ${displayDate(new Date(value.high))}`}</Text>
        </Stack>
        <DetailsText value={value} config={config}/>
    </Stack>
}