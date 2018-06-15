import u from 'updeep';

module.exports = function(state) {
    return u({
        resources: {},
        list: {
            all: []
        }
    }, state);
};
