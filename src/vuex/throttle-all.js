import _mapValues from 'lodash/mapValues';
import _debounce from 'lodash/debounce';

import hash from 'hash-it';

function __debounce(func, timeout, opts) {
    const cache = {};

    return function(...args) {
        const key = opts.id(...args);

        if (!cache[key])
            cache[key] = _debounce(func, timeout, opts);

        return cache[key](...args);
    };
}

function wrapMethod(method) {
    return __debounce(method, 500, {
        leading: true,
        id: (ctx, ...args) => hash(args)
    });
}

export default
function throttleAll(methods) {
    return _mapValues(methods, method => {
        if (typeof method === 'function')
            return wrapMethod(method);

        if (typeof method !== 'object' || typeof method.handler !== 'function')
            return method;

        return {
            ...method,
            handler: wrapMethod(method.handler)
        };
    });
}
