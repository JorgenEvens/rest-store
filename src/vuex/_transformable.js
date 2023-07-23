import { is, isNil } from '../utils';
import { getEntry, setEntry } from '../utils/entry';

export default
function transformable(fn) {
    const transformations = [];

    function exec() {
        return transformations.reduce((r, f) => {
            const entry = getEntry(r);
            const result = f.call(this, r);

            if (entry && isNil(result))
                return entry.state;

            if (is(result, 'symbol'))
                return result;

            if (entry && result && getEntry(result) !== entry)
                setEntry(result, entry);

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
