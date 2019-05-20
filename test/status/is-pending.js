import assert from 'assert';

import get from '../../src/resource';
import add from '../../src/resource/add';
import loading from '../../src/resource/loading';

import isPending from '../../src/status/is-pending';

describe('# is-pending', () => {

    it('Should detect pending state', () => {
        const state = loading(null, 1);
        const res = get(state, 1);

        assert(isPending(res), 'resource is pending');
    });

    it('Should detect non-pending state', () => {
        const state = add(null, 1, {});
        const res = get(state, 1);

        assert(!isPending(res), 'resource is not pending');
    });

    it('Should detect non-pending state', () => {
        let state = null;
        state = add(state, 1, {});
        state = loading(state, 1);

        const res = get(state, 1);

        assert(!isPending(res), 'resource is not pending');
    });

});
