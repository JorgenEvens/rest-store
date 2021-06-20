import assert from 'assert';

import get from '../../src/resource';
import add from '../../src/resource/add';

import getRange from '../../src/list/range';
import addRange from '../../src/list/add-range';

import { ENTRY } from '../../src/constants';

import isExpired from '../../src/status/is-expired';

describe('# is-expired', () => {

    it('Should detect expired state', () => {
        const fixt_resource = {};
        const state = add(null, 1, fixt_resource, { ttl: -1 });
        const res = get(state, 1);

        assert(isExpired(res), 'resource is expired');
    });

    it('Should detect non-expired state', () => {
        const fixt_resource = {};
        const state = add(null, 1, fixt_resource, { ttl: 200 });
        const res = get(state, 1);

        assert(!isExpired(res), 'resource has not expired');
    });

    it('Should never expire empty values', () => {
        const fixt_resource = {
            [ENTRY]: null
        };

        assert(!isExpired(null), 'resource has not expired');
        assert(!isExpired(fixt_resource), 'resource has not expired');
    });

    it('Should only expire if expires is number', () => {
        const fixt_resource = {
            [ENTRY]: {
                expires: 'hello world'
            }
        };

        assert(!isExpired(fixt_resource), 'resource has not expired');
    });

    it('Should detect expired state in lists', () => {
        const fixt_ids = [1,2,3,4,5];
        let state = {};
        state = addRange({}, 'test', 0, 4, fixt_ids, { ttl: -1 });
        fixt_ids.forEach(id => {
            state = add(state, id, { id });
        });

        const res = getRange(state, 'test', 0, 4);

        assert(isExpired(res), 'list is expired');
    });

});
