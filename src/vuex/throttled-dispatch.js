import _debounce from 'lodash/debounce';
import hash from 'hash-it';

const throttled = new Map();

function __debounce(func, timeout, opts) {
    const cache = {};

    return function(...args) {
        const key = opts.id(...args);

        if (!cache[key])
            cache[key] = _debounce(func, timeout, opts);

        return (0, cache[key])(...args);
    };
}

export
function wrapDispatch(dispatch) {
    if (throttled.has(dispatch))
        return throttled.get(dispatch);

    const wrapper = __debounce(dispatch, 1000, {
        leading: true,
        id: (...args) => hash(args)
    });

    throttled.set(dispatch, wrapper);

    return wrapper;
}
