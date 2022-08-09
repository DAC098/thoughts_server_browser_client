import { AudioEntry, ComposedEntry, ComposedFullUser, ComposedUser, ComposedUserAccess, CustomField, CustomFieldConfig, CustomFieldEntry, CustomFieldType, CustomFieldValue, Entry, EntryMarker, GlobalCustomField, Tag, TextEntry, User, UserAccess, UserBare, UserData, UserLevel } from ".";
import { cloneBoolean, cloneFloat, cloneInteger, cloneString, optionalCloneInteger, optionalCloneString } from "../../util/clone";

export function createEntry(): Entry {
    return {
        id: 0,
        day: 0,
        owner: 0
    }
}

export function cloneEntry(entry: Entry): Entry {
    return {
        id: cloneInteger(entry.id),
        day: cloneInteger(entry.day),
        owner: cloneInteger(entry.owner)
    }
}

export function createEntryMarker(): EntryMarker {
    return {
        id: 0,
        title: "",
        comment: null,
        entry: 0
    }
}

export function cloneEntryMarker(value: EntryMarker): EntryMarker {
    return {
        id: cloneInteger(value.id),
        title: cloneString(value.title),
        comment: optionalCloneString(value.comment),
        entry: cloneInteger(value.entry)
    }
}

export function createCustomFieldEntry(type: CustomFieldType): CustomFieldEntry {
    return {
        field: 0,
        value: createCustomFieldValue(type),
        comment: null,
        entry: 0
    }
}

export function cloneCustomFieldEntry(value: CustomFieldEntry): CustomFieldEntry {
    return {
        field: cloneInteger(value.field),
        value: cloneCustomFieldValue(value.value),
        comment: null,
        entry: cloneInteger(value.entry)
    }
}

export function createTextEntry(): TextEntry {
    return {
        id: 0,
        thought: "",
        private: false,
        entry: 0
    }
}

export function cloneTextEntry(value: TextEntry): TextEntry {
    return {
        id: cloneInteger(value.id),
        thought: cloneString(value.thought),
        private: cloneBoolean(value.private),
        entry: cloneInteger(value.entry)
    }
}

export function createAudioEntry(): AudioEntry {
    return {
        id: 0,
        private: false,
        entry: 0
    }
}

export function cloneAudioEntry(value: AudioEntry): AudioEntry {
    return {
        id: cloneInteger(value.id),
        private: cloneBoolean(value.private),
        entry: cloneInteger(value.entry)
    }
}

export function createTag(): Tag {
    return {
        id: 0,
        title: "",
        owner: 0,
        color: "",
        comment: null
    }
}

export function cloneTag(value: Tag): Tag {
    return {
        id: cloneInteger(value.id),
        title: cloneString(value.title),
        owner: cloneInteger(value.owner),
        color: cloneString(value.color),
        comment: optionalCloneString(value.comment)
    }
}

export function createComposedEntry(): ComposedEntry {
    return {
        entry: createEntry(),
        tags: [],
        markers: [],
        custom_field_entries: [],
        text_entries: []
    }
}

export function cloneComposedEntry(value: ComposedEntry): ComposedEntry {
    let rtn = {
        entry: cloneEntry(value.entry),
        tags: [],
        markers: [],
        custom_field_entries: {},
        text_entries: []
    };

    for (let tag of value.tags) {
        rtn.tags.push(cloneInteger(tag));
    }

    for (let marker of value.markers) {
        rtn.markers.push(cloneEntryMarker(marker));
    }

    for (let field_id in value.custom_field_entries) {
        rtn.custom_field_entries[field_id] = cloneCustomFieldEntry(
            value.custom_field_entries[field_id]
        );
    }

    for (let text of value.text_entries) {
        rtn.text_entries.push(cloneTextEntry(text));
    }

    return rtn;
}

export function createCustomField(type: CustomFieldType): CustomField {
    return {
        id: 0,
        name: "",
        config: createCustomFieldConfig(type),
        comment: null,
        owner: 0,
        order: 0,
        issued_by: null
    }
}

export function cloneCustomField(field: CustomField): CustomField {
    return {
        id: cloneInteger(field.id),
        name: cloneString(field.name),
        config: cloneCustomFieldConfig(field.config),
        comment: optionalCloneString(field.comment),
        owner: cloneInteger(field.owner),
        order: cloneInteger(field.order),
        issued_by: optionalCloneInteger(field.issued_by)
    }
}

export function cloneCustomFieldValue(value: CustomFieldValue): CustomFieldValue {
    switch (value.type) {
        case CustomFieldType.Integer: {
            return {
                type: CustomFieldType.Integer,
                value: cloneInteger(value.value)
            };
        }
        case CustomFieldType.IntegerRange: {
            return {
                type: CustomFieldType.IntegerRange,
                low: cloneInteger(value.low),
                high: cloneInteger(value.high)
            };
        }
        case CustomFieldType.Float: {
            return {
                type: CustomFieldType.Float,
                value: cloneFloat(value.value)
            };
        }
        case CustomFieldType.FloatRange: {
            return {
                type: CustomFieldType.FloatRange,
                low: cloneFloat(value.low),
                high: cloneFloat(value.high)
            };
        }
        case CustomFieldType.Time: {
            return {
                type: CustomFieldType.Time,
                value: cloneString(value.value)
            };
        }
        case CustomFieldType.TimeRange: {
            return {
                type: CustomFieldType.TimeRange,
                low: cloneString(value.low),
                high: cloneString(value.high)
            }
        }
    }
}

export function createCustomFieldValue(type: CustomFieldType): CustomFieldValue {
    switch (type) {
        case CustomFieldType.Integer: {
            return {
                type: CustomFieldType.Integer,
                value: 0
            };
        }
        case CustomFieldType.IntegerRange: {
            return {
                type: CustomFieldType.IntegerRange,
                low: 0,
                high: 0
            };
        }
        case CustomFieldType.Float: {
            return {
                type: CustomFieldType.Float,
                value: 0.0
            };
        }
        case CustomFieldType.FloatRange: {
            return {
                type: CustomFieldType.FloatRange,
                low: 0.0,
                high: 0.0
            };
        }
        case CustomFieldType.Time: {
            return {
                type: CustomFieldType.Time,
                value: (new Date()).toISOString()
            };
        }
        case CustomFieldType.TimeRange: {
            return {
                type: CustomFieldType.TimeRange,
                low: (new Date()).toISOString(),
                high: (new Date()).toISOString()
            }
        }
    }
}

export function cloneCustomFieldConfig(config: CustomFieldConfig): CustomFieldConfig {
    switch (config.type) {
        case CustomFieldType.Integer:
        case CustomFieldType.IntegerRange: {
            return {
                type: cloneString(config.type),
                minimum: optionalCloneInteger(config.minimum),
                maximum: optionalCloneInteger(config.maximum)
            };
        }
        case CustomFieldType.Float:
        case CustomFieldType.FloatRange: {
            return {
                type: cloneString(config.type),
                minimum: optionalCloneInteger(config.minimum),
                maximum: optionalCloneInteger(config.maximum),
                step: cloneFloat(config.step),
                precision: cloneInteger(config.precision)
            };
        }
        case CustomFieldType.Time: {
            return {
                type: CustomFieldType.Time,
                as_12hr: cloneBoolean(config.as_12hr)
            }
        }
        case CustomFieldType.TimeRange: {
            return {
                type: CustomFieldType.TimeRange,
                as_12hr: cloneBoolean(config.as_12hr),
                show_diff: cloneBoolean(config.show_diff)
            }
        }
    }
}

export function createCustomFieldConfig(type: CustomFieldType): CustomFieldConfig {
    switch (type) {
        case CustomFieldType.Integer:
        case CustomFieldType.IntegerRange: {
            return {
                type,
                minimum: 0,
                maximum: 0
            };
        }
        case CustomFieldType.Float:
        case CustomFieldType.FloatRange: {
            return {
                type,
                minimum: 0,
                maximum: 0,
                step: 0.01,
                precision: 2
            }
        }
        case CustomFieldType.Time: {
            return {
                type,
                as_12hr: false
            }
        }
        case CustomFieldType.TimeRange: {
            return {
                type,
                as_12hr: false,
                show_diff: false
            }
        }
    }
}

export function createUser(): User {
    return {
        id: 0,
        username: "",
        level: UserLevel.User,
        full_name: null,
        email: null,
        email_verified: false
    }
}

export function cloneUser(value: User): User {
    return {
        id: cloneInteger(value.id),
        username: cloneString(value.username),
        level: cloneInteger(value.level),
        full_name: optionalCloneString(value.full_name),
        email: optionalCloneString(value.email),
        email_verified: cloneBoolean(value.email_verified)
    }
}

export function createUserBare(): UserBare {
    return {
        id: 0,
        username: "",
        full_name: null
    }
}

export function cloneUserBare(value: UserBare): UserBare {
    return {
        id: cloneInteger(value.id),
        username: cloneString(value.username),
        full_name: optionalCloneString(value.full_name)
    }
}

export function getUserBareFromUser(value: User): UserBare {
    return {
        id: cloneInteger(value.id),
        username: cloneString(value.username),
        full_name: optionalCloneString(value.full_name)
    }
}

export function createUserAccess(): UserAccess {
    return {
        owner: 0,
        ability: "",
        allowed_for: 0
    }
}

export function cloneUserAccess(value: UserAccess): UserAccess {
    return {
        owner: cloneInteger(value.owner),
        ability: cloneString(value.ability),
        allowed_for: cloneInteger(value.allowed_for)
    }
}

export function createUserData(): UserData {
    return {
        owner: 0,
        prefix: null,
        suffix: null,
        first_name: "",
        last_name: "",
        middle_name: null,
        dob: ""
    }
}

export function cloneUserData(value: UserData): UserData {
    return {
        owner: cloneInteger(value.owner),
        prefix: optionalCloneString(value.prefix),
        suffix: optionalCloneString(value.suffix),
        first_name: cloneString(value.first_name),
        last_name: cloneString(value.last_name),
        middle_name: optionalCloneString(value.middle_name),
        dob: cloneString(value.dob)
    }
}

export function createComposedUser(): ComposedUser {
    return {
        user: createUser(),
        data: createUserData()
    }
}

export function cloneComposedUser(value: ComposedUser): ComposedUser {
    return {
        user: cloneUser(value.user),
        data: cloneUserData(value.data)
    }
}

export function createComposedUserAccess(): ComposedUserAccess {
    return {
        user: createUser(),
        access: []
    }
}

export function cloneComposedUserAccess(value: ComposedUserAccess): ComposedUserAccess {
    let rtn = {
        user: cloneUser(value.user),
        access: []
    };

    for (let access of value.access) {
        rtn.access.push(cloneUserAccess(access));
    }

    return rtn;
}

export function createComposedFullUser(): ComposedFullUser {
    return {
        user: createUser(),
        data: createUserData(),
        access: []
    }
}

export function cloneComposedFullUser(value: ComposedFullUser): ComposedFullUser {
    let rtn = {
        user: cloneUser(value.user),
        data: cloneUserData(value.data),
        access: []
    };

    for (let access of value.access) {
        rtn.access.push(cloneUserAccess(access));
    }

    return rtn;
}

export function createGlobalCustomField(type: CustomFieldType): GlobalCustomField {
    return {
        id: 0,
        name: "",
        comment: null,
        config: createCustomFieldConfig(type)
    }
}

export function cloneGlobalCustomField(value: GlobalCustomField): GlobalCustomField {
    return {
        id: cloneInteger(value.id),
        name: cloneString(value.name),
        comment: optionalCloneString(value.comment),
        config: cloneCustomFieldConfig(value.config)
    }
}