import assert from 'assert';

import get from '../../src/resource';
import add from '../../src/resource/add';

import isOk from '../../src/status/is-ok';

describe('# is-ok', () => {

    it('Should detect correct state', () => {
        const fixt_resource = {};
        const state = add(null, 1, fixt_resource);
        const res = get(state, 1);

        assert(isOk(res), 'resource is OK');
    });

    it('Should have OK state when expired', () => {
        const fixt_resource = {};
        const state = add(null, 1, fixt_resource, { ttl: -1 });
        const res = get(state, 1);

        assert(isOk(res), 'resource is OK');
    });

});
