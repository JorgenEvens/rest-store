import { is, isNil } from '../utils';
import { ENTRY } from '../constants';

function getEntry(v) {
    return v && (is(v, 'symbol') ? v : v[ENTRY]);
}

export default
function transformable(fn) {
    const transformations = [];

    function exec() {
        return transformations.reduce((r, f) => {
            const entry = getEntry(r);
            const result = f.call(this, r);

            if (entry && isNil(result))
                return ENTRY;

            if (is(result, 'symbol'))
                return result;

            if (entry && result && result[ENTRY] !== entry)
                result[ENTRY] = entry;

            return result;
        }, fn.call(this));
    }

    function transform(t) {
        transformations.push(t);
        return exec;
    }

    fn.transform = transform;
    exec.transform = transform;

    return fn;
}
