import assert from 'assert';

import get from '../../src/resource';
import add from '../../src/resource/add';
import loading from '../../src/resource/loading';

import isOk from '../../src/status/is-ok';
import isLoading from '../../src/status/is-loading';

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

    it('Should have OK state when loading', () => {
        const fixt_resource = {};

        let state = add(null, 1, fixt_resource);
        state = loading(state, 1);

        const res = get(state, 1);

        assert(isOk(res), 'resource is OK');
        assert(isLoading(res), 'resource is loading');
    });

    it('Should not have OK state when missing', () => {
        const fixt_resource = {};

        let state = add(null, 1, fixt_resource);

        const res = get(state, 2);

        assert(!isOk(res), 'resource is not OK');
    });

});
