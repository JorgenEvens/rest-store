import assert from 'assert';

import _list from '../../src/list/_list';

describe('# _list(root, listName)', () => {

    it('Entries should always be created', () => {
        const root = {
            list: {
                test: {
                    hash: 123456
                }
            }
        };

        const list = _list(root, 'test');

        assert.equal(list.hash, 123456);
        assert(Array.isArray(list.entries));
    });

});
