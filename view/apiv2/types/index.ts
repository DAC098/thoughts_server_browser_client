export interface Entry {
    id: number
    day: number
    owner: number
}

export interface EntryMarker {
    id: number
    title: string
    comment?: string
    entry: number
}

export enum CustomFieldType {
    Integer = "Integer",
    IntegerRange = "IntegerRange",
    Float = "Float",
    FloatRange = "FloatRange",
    Time = "Time",
    TimeRange = "TimeRange"
}

export interface IntegerConfig {
    type: CustomFieldType.Integer
    minimum?: number
    maximum?: number
}

export interface IntegerValue {
    type: CustomFieldType.Integer
    value: number
}

export interface IntegerRangeConfig {
    type: CustomFieldType.IntegerRange
    minimum?: number
    maximum?: number
}

export interface IntegerRangeValue {
    type: CustomFieldType.IntegerRange
    low: number
    high: number
}

export interface FloatConfig {
    type: CustomFieldType.Float
    minimum?: number
    maximum?: number
    step: number
    precision: number
}

export interface FloatValue {
    type: CustomFieldType.Float
    value: number
}

export interface FloatRangeConfig {
    type: CustomFieldType.FloatRange
    minimum?: number
    maximum?: number
    step: number
    precision: number
}

export interface FloatRangeValue {
    type: CustomFieldType.FloatRange
    low: number
    high: number
}

export interface TimeConfig {
    type: CustomFieldType.Time
    as_12hr: boolean
}

export interface TimeValue {
    type: CustomFieldType.Time
    value: string
}

export interface TimeRangeConfig {
    type: CustomFieldType.TimeRange
    as_12hr: boolean
    show_diff: boolean
}

export interface TimeRangeValue {
    type: CustomFieldType.TimeRange
    low: string
    high: string
}

export type CustomFieldConfig = IntegerConfig |
    IntegerRangeConfig |
    FloatConfig |
    FloatRangeConfig |
    TimeConfig |
    TimeRangeConfig;

export type CustomFieldValue = IntegerValue |
    IntegerRangeValue |
    FloatValue |
    FloatRangeValue |
    TimeValue |
    TimeRangeValue;

export interface CustomFieldEntry {
    field: number
    value: CustomFieldValue
    comment?: string
    entry: number
}

export interface TextEntry {
    id: number
    thought: string
    private: boolean
    entry: number
}

export interface AudioEntry {
    id: number
    private: boolean
    entry: number
}

export interface ComposedEntry {
    entry: Entry
    tags: number[]
    markers: EntryMarker[]
    custom_field_entries: {[key: number]: CustomFieldEntry}
    text_entries: TextEntry[]
}

export interface CustomField {
    id: number
    name: string
    config: CustomFieldConfig
    comment?: string
    owner: number
    order: number
    issued_by?: number
}

export interface Tag {
    id: number
    title: string
    owner: number
    color: string
    comment?: string
}

export enum UserLevel {
    Admin = 1,
    Manager = 10,
    User = 20
}

export interface User {
    id: number
    username: string
    level: number
    full_name?: string
    email?: string
    email_verified: boolean
}

export interface UserBare {
    id: number
    username: string
    full_name?: string
}

export interface UserAccess {
    owner: number
    ability: string
    allowed_for: number
}

export interface UserData {
    owner: number
    prefix?: string
    suffix?: string
    first_name: string
    last_name: string
    middle_name?: string
    dob: string
}

export interface ComposedUser {
    user: User
    data: UserData
}

export interface ComposedUserAccess {
    user: User
    access: UserAccess[]
}

export interface ComposedFullUser {
    user: User
    data: UserData
    access: UserAccess[]
}

export interface GlobalCustomField {
    id: number
    name: string
    comment?: string
    config: CustomFieldConfig
}