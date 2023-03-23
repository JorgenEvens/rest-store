import { is } from './index';

export const store = new WeakMap();

export function getEntry(v) {
    if (v && is(v, 'symbol'))
        return v;

    return store.get(v);
}

export function setEntry(v, entry) {
    store.set(v, entry);
}
