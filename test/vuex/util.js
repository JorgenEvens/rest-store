export
function makeStore(custom = {}) {
    return {
        registerModule() {},
        commit() {},
        dispatch() {},
        state: {},
        ...custom
    };
}
