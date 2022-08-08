import React, { ReactNode } from "react";
import { CustomFieldValue, CustomFieldConfig, FloatConfig, FloatRangeConfig, TimeConfig, TimeRangeConfig } from "../apiv2/types";
import { displayDate, diffDates, sameDate, get12hrStr, get24hrStr } from "../util/time";

interface CustomFieldEntryCellProps {
    value: CustomFieldValue
    config: CustomFieldConfig
}

export function CustomFieldEntryCell({value, config}: CustomFieldEntryCellProps): JSX.Element {
    switch (value.type) {
        case "Integer":
            return <>{`${value.value}`}</>;
        case "IntegerRange":
            return <>{`${value.low} - ${value.high}`}</>;
        case "Float": {
            let conf = config as FloatConfig;
            return <>{`${value.value.toFixed(conf.precision)}`}</>;
        }
        case "FloatRange": {
            let conf = config as FloatRangeConfig;
            return <>{`${value.low.toFixed(conf.precision)} - ${value.high.toFixed(conf.precision)}`}</>;
        }
        case "Time": {
            return <>{`${displayDate(new Date(value.value), !(config as TimeConfig).as_12hr)}`}</>;
        }
        case "TimeRange": {
            let conf = config as TimeRangeConfig;
            let low = new Date(value.low);
            let high = new Date(value.high);

            if (conf.show_diff) {
                return <>{diffDates(high, low, false, true)}</>;
            } else {
                return sameDate(low, high) ? 
                       <>{`${displayDate(low, !conf.as_12hr)} - ${conf.as_12hr ? get12hrStr(high) : get24hrStr(high)}`}</> :
                       <>{`${displayDate(low, !conf.as_12hr)} - ${displayDate(high, !conf.as_12hr)}`}</>;
            }
        }
        default:
            return <>unknown</>;
    }
}