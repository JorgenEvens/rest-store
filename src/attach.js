import u from 'updeep';

export default
function attach(state) {
    return u({
        resources: {},
        list: {
            all: []
        }
    }, state);
}
