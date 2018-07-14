import { DEFAULT_TTL } from '../constants';
import { is } from '../utils';

export default
function _ttl(...args) {
    for (let i = 0; i < args.length; i++)
        if (is(args[i].ttl, 'number'))
            return args[i].ttl;

    return DEFAULT_TTL;
}
