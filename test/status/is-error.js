import assert from 'assert';

import get from '../../src/resource';
import add from '../../src/resource/add';
import error from '../../src/resource/error';

import getPage from '../../src/list/page';
import errorRange from '../../src/list/error-range';
import errorPage from '../../src/list/error-page';

import isError from '../../src/status/is-error';

describe('# is-error', () => {

    it('Should detect error state', () => {
        const err = new Error('dummy');
        const state = error(null, 1, err);
        const res = get(state, 1);

        assert(isError(res), 'resource is error');
        assert.equal(res, err);
    });

    it('Should detect non-error state', () => {
        const state = add(null, 1, {});
        const res = get(state, 1);

        assert(!isError(res), 'resource is not error');
    });

    it('Should detect list error state', () => {
        const err = new Error('dummy');
        const state = errorRange(null, 'all', 0, 1, err);
        const res = getPage(state, 'all', 1);

        assert(isError(res), 'list is error');
        assert.equal(res[0], err);
        assert.equal(res[1], err);
    });

    it('Should detect page error state', () => {
        const err = new Error('dummy');
        const state = errorPage(null, 'all', 1, err);
        const res = getPage(state, 'all', 1);

        assert(isError(res), 'list is error');
        assert.equal(res[0], err);
        assert.equal(res[1], err);
    });

});
