import assert from 'assert';

import get from '../../src/resource';
import add from '../../src/resource/add';

import isMissing from '../../src/status/is-missing';

describe('# is-missing', () => {

    it('Should detect missing state', () => {
        const res = get(null, 1);

        assert(isMissing(res), 'resource is missing');
    });

    it('Should detect available state', () => {
        const fixt_resource = {};
        const state = add(null, 1, fixt_resource);
        const res = get(state, 1);

        assert(!isMissing(res), 'resource is available');
    });

});
