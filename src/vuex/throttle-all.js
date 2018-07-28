import _mapValues from 'lodash/mapValues';
import _debounce from 'lodash/debounce';

function __debounce(func, timeout, opts) {
    const cache = {};

    return function(...args) {
        const key = opts.id(...args);

        if (!cache[key])
            cache[key] = _debounce(func, timeout, opts);

        return cache[key](...args);
    };
}

export default
function throttleAll(methods) {
    return _mapValues(methods, method => {
        return __debounce(method, 500, {
            leading: true,
            id: (ctx, ...args) => JSON.stringify(...args)
        });
    });
}
