import hash from 'hash-it';

const throttled = new Map();
const run = (func, args) => (0, func)(...args);

/**
 * Debounce implementation that will group all calls made in
 * the first 10ms into a single function call on the leading edge.
 *
 * Any calls past the initial 10ms will be debounced until `timeout`
 * has expired, just like a normal debounce.
 *
 * After the trailing edge invocation the debounce method is reset
 * and the flow resets to invoking the leading edge.
 */
function _debounce(func, timeout) {
    let first = 0;
    let result = null;
    let timer = null;

    return function(...args) {
        const diff = Date.now() - first;

        // Leading edge
        if (!first || diff >= timeout) {
            result = run(func, args);
            first = Date.now();
            return result;
        }

        // Do nothing if within 10ms from leading edge
        if (diff < 10)
            return result;

        // New invocation, cancel previous invocation
        if (timer)
            clearTimeout(timer);

        // Schedule new invocation
        timer = setTimeout(() => {
            result = run(func, args);
            first = 0;
            timer = null;
        }, timeout);

        // Return the result of the last invocation
        return result;
    };
}

function __debounce(func, timeout, opts) {
    const cache = {};

    return function(...args) {
        const key = opts.id(...args);

        if (!cache[key])
            cache[key] = _debounce(func, timeout);

        return (0, cache[key])(...args);
    };
}

export
function wrapDispatch(dispatch) {
    if (throttled.has(dispatch))
        return throttled.get(dispatch);

    const wrapper = __debounce(dispatch, 1000, {
        id: (...args) => hash(args)
    });

    throttled.set(dispatch, wrapper);

    return wrapper;
}
