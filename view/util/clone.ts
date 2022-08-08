export function cloneString<S extends string>(string: S): S {
    return string.slice() as S;
}

export function cloneInteger<N extends number>(integer: N): N {
    return integer + 0 as N;
}

export function cloneFloat<N extends number>(float: N): N {
    return float + 0.0 as N;
}

export function cloneBoolean<B extends boolean>(boolean: B): B {
    return !!boolean as B;
}

export function optionalCloneString<S extends string>(string?: S): S|null {
    return string?.slice() as S ?? null;
}

export function optionalCloneInteger<N extends number>(integer?: N): N|null {
    return integer != null ? cloneInteger(integer) : null;
}

export function optionalCloneFloat<N extends number>(float?: N): N|null {
    return float != null ? cloneFloat(float) : null;
}

export function optionalCloneBoolean<B extends boolean>(boolean?: B): B|null {
    return boolean != null ? cloneBoolean(boolean) : null;
}