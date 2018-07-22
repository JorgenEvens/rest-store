import assert from 'assert';

import get from '../../src/resource';
import add from '../../src/resource/add';
import loading from '../../src/resource/loading';

import getPage from '../../src/list/page';
import addPage from '../../src/list/add-page';
import loadingRange from '../../src/list/loading-range';

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

    it('Should read status when entry is missing', () => {
        const state = loading(null, 2);
        const res = get(state, 2);

        assert(!isOk(res), 'resource is not OK');
    });

    it('Should read OK state from loading entry array', () => {
        let state = null;
        state = addPage(state, 'all', 1, [ 1, 2 ]);
        state = loadingRange(state, 'all', 0, 0);

        const res = getPage(state, 'all', 1);

        assert(isOk(res), 'list is OK');
    });

    it('Should read not-OK state from loading entry array', () => {
        let state = null;
        state = addPage(state, 'all', 1, [ null, 2 ]);
        state = loadingRange(state, 'all', 0, 0);

        const res = getPage(state, 'all', 1);

        assert(!isOk(res), 'list is not OK');
    });

});
