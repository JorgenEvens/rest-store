import { isNil } from '../utils';
import _ttl from './_ttl';

export default
function _expires(...args) {
    for (let i = 0; i < args.length; i++)
        if (!isNil(args[i].expires))
            return args[i].expires;

    return Date.now() + _ttl(...args);
}
