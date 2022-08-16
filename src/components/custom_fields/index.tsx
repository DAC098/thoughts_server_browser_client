import React from "react"
import { CustomFieldConfig, CustomFieldType } from "../../api/types"
import { FloatRangeEditView } from "./FloatRangeView"
import { FloatEditView } from "./FloatView"
import { IntegerRangeEditView } from "./IntegerRangeView"
import { IntegerEditView } from "./IntegerView"
import { TimeRangeEditView } from "./TimeRangeView"
import { TimeEditView } from "./TimeView"

interface CustomFieldTypeEditViewProps {
    config: CustomFieldConfig

    onChange?: (config: CustomFieldConfig) => void
}

export const CustomFieldTypeEditView = ({config, onChange}: CustomFieldTypeEditViewProps) => {
    switch (config.type) {
        case CustomFieldType.Integer:
            return <IntegerEditView config={config} onChange={onChange}/>
        case CustomFieldType.IntegerRange:
            return <IntegerRangeEditView config={config} onChange={onChange}/>
        case CustomFieldType.Float:
            return <FloatEditView config={config} onChange={onChange}/>
        case CustomFieldType.FloatRange:
            return <FloatRangeEditView config={config} onChange={onChange}/>
        case CustomFieldType.Time:
            return <TimeEditView config={config} onChange={onChange}/>
        case CustomFieldType.TimeRange:
            return <TimeRangeEditView config={config} onChange={onChange}/>
    }

    return null;
}