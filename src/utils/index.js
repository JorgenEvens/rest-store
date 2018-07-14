export function is(value, type) {
    return typeof value === type;
}

export function isUndefined(value) {
    return is(value, 'undefined');
}

export function isNil(value) {
    return value === null || isUndefined(value);
}
