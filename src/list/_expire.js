import { EXPIRED } from '../constants';

export default
function _expire(entry, expires) {
    return entry && {
        ...entry,
        state: EXPIRED,
        expires
    };
}
