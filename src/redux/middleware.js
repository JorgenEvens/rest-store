const u = require('updeep').default || require('updeep');
const _get = require('lodash/get');

const SELECTOR = Symbol('rest-store/action');
const PHASE = Symbol('rest-store/action/phase');

export const PHASE_INIT = 'rest-store/action/init';
export const PHASE_APPLY = 'rest-store/action/apply';
export const PHASE_ERROR = 'rest-store/action/error';

export function isAction(action) {
    return !!(action && action[SELECTOR]);
}

export
function restMiddleware(store) {
    const { dispatch, getState } = store;

    return (next) => async (action) => {
        if (!isAction(action))
            return next(action);

        if (action[PHASE] !== PHASE_INIT)
            return next(action);

        const { type } = action;
        const path = type.split('/');
        const actionName = path.pop();
        const state = _get(getState(), path);
        const fn = state.actions[actionName];

        next(action);

        if (typeof fn !== 'function')
            return;

        function apply(fn) {
            dispatch(buildAction(
                type,
                { apply: fn },
                { phase: PHASE_APPLY }
            ));
        }

        try {
            await fn(action, state, apply);
        } catch (err) {
            console.error(err); // eslint-disable-line
            dispatch(buildAction(type, err, { phase: PHASE_ERROR }));
        }
    };
}

export
function restReducer(state, action) {
    const store = state;

    if (!isAction(action))
        return store;

    if (action[PHASE] === PHASE_INIT)
        return store;

    const { type, payload } = action;
    const path = type.split('/');
    path.pop(); // remove action name

    const { apply } = payload;

    if (typeof apply !== 'function')
        return store;

    state = _get(state, path);
    state = apply(state, action);
    state = u.constant(state);

    return u.updateIn(path, state, store);
}

export
function buildAction(type, payload, options) {
    options = options || {
        phase: PHASE_INIT,
    };

    return {
        type,
        payload,
        [PHASE]: options.phase,
        [SELECTOR]: true,
    };
}
