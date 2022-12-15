import {
    CustomFieldValue,
    CustomFieldType,
    IntegerConfig,
    IntegerRangeConfig,
    FloatConfig,
    FloatRangeConfig,
    TimeConfig,
    TimeRangeConfig,
    CustomFieldConfig
} from "../../api/types"
import { FloatRangeEditView, FloatRangeReadView } from "./FloatRangeView"
import { FloatEditView, FloatReadView } from "./FloatView"
import { IntegerRangeEditView, IntegerRangeReadView } from "./IntegerRangeView"
import { IntegerEditView, IntegerReadView } from "./IntegerView"
import { TimeRangeEditView, TimeRangeReadView } from "./TimeRangeView"
import { TimeEditView, TimeReadView } from "./TimeView"

interface CustomFieldEntryTypeEditViewProps {
    value: CustomFieldValue
    config?: CustomFieldConfig

    onChange?: (value: CustomFieldValue) => void
}

export const CustomFieldEntryTypeEditView = ({value, config, onChange}: CustomFieldEntryTypeEditViewProps) => {
    switch (value.type) {
        case CustomFieldType.Integer:
            return <IntegerEditView 
                value={value} 
                config={(config as IntegerConfig)}
                onChange={onChange}
            />
        case CustomFieldType.IntegerRange:
            return <IntegerRangeEditView
                value={value}
                config={(config as IntegerRangeConfig)}
                onChange={onChange}
            />
        case CustomFieldType.Float:
            return <FloatEditView
                value={value}
                config={(config as FloatConfig)}
                onChange={onChange}
            />
        case CustomFieldType.FloatRange:
            return <FloatRangeEditView
                value={value}
                config={(config as FloatRangeConfig)}
                onChange={onChange}
            />
        case CustomFieldType.Time:
            return <TimeEditView
                value={value}
                config={(config as TimeConfig)}
                onChange={onChange}
            />
        case CustomFieldType.TimeRange:
            return <TimeRangeEditView
                value={value}
                config={(config as TimeRangeConfig)}
                onChange={onChange}
            />
    }
}

interface CustomFieldEntryTypeReadViewProps {
    value: CustomFieldValue
    config?: CustomFieldConfig
}

export const CustomFieldEntryTypeReadView = ({value, config}: CustomFieldEntryTypeReadViewProps) => {
    switch (value.type) {
        case CustomFieldType.Integer:
            return <IntegerReadView
                value={value} 
                config={((config as unknown) as IntegerConfig)}
            />
        case CustomFieldType.IntegerRange:
            return <IntegerRangeReadView
                value={value}
                config={((config as unknown) as IntegerRangeConfig)}
            />
        case CustomFieldType.Float:
            return <FloatReadView
                value={value}
                config={((config as unknown) as FloatConfig)}
            />
        case CustomFieldType.FloatRange:
            return <FloatRangeReadView
                value={value}
                config={((config as unknown) as FloatRangeConfig)}
            />
        case CustomFieldType.Time:
            return <TimeReadView
                value={value}
                config={((config as unknown) as TimeConfig)}
            />
        case CustomFieldType.TimeRange:
            return <TimeRangeReadView
                value={value}
                config={((config as unknown) as TimeRangeConfig)}
            />
    }
}