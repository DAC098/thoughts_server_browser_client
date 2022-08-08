import React from "react"
import { CustomField, ComposedEntry, CustomFieldType } from "../../apiv2/types"
import FloatGraph from "./Float"
import FloatRangeGraph from "./FloatRange"
import IntegerGraph from "./Integer"
import IntegerRangeGraph from "./IntegerRange"
import TimeGraph from "./Time"
import TimeRangeGraph from "./TimeRange"

interface CustomFieldGraphProps {
    field: CustomField

    entries: ComposedEntry[]

    width: number
    height: number
}

export function CustomFieldGraph({
    field,
    entries,
    width, height
}: CustomFieldGraphProps) {
    switch (field.config.type) {
        case CustomFieldType.Integer:
            return <IntegerGraph width={width} height={height} field={field} entries={entries}/>
        case CustomFieldType.IntegerRange:
            return <IntegerRangeGraph width={width} height={height} field={field} entries={entries}/>
        case CustomFieldType.Float:
            return <FloatGraph width={width} height={height} field={field} entries={entries}/>
        case CustomFieldType.FloatRange:
            return <FloatRangeGraph width={width} height={height} field={field} entries={entries}/>
        case CustomFieldType.Time:
            return <TimeGraph width={width} height={height} field={field} entries={entries}/>
        case CustomFieldType.TimeRange:
            return <TimeRangeGraph width={width} height={height} field={field} entries={entries}/>
    }
}