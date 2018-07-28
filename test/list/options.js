import assert from 'assert';

import options from '../../src/list/options';

describe('# options(root, listName, opts)', () => {

    it('Should set list options', () => {
        const next = options({}, 'all', {
            total: 22,
            test: true
        });

        assert.equal(next.list.all.total, 22);
        assert.equal(next.list.all.test, true);
    });

    it('Should set list options on missing list', () => {
        const next = options(null, 'all', {
            total: 22,
            test: true
        });

        assert.equal(next.list.all.total, 22);
        assert.equal(next.list.all.test, true);
    });

});
