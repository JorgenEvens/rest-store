import assert from 'assert';

import pageCount from '../../src/list/page-count';

describe('# pageCount(root, list, opts)', () => {

    const fixt_state = {
        list: {
            all: {
                pageSize: 10,
                entries: [
                    { id: '1' },
                    { id: '2' },
                    { id: '3' },
                    { id: '4' },
                    { id: '5' },
                    { id: '6' },
                    { id: '7' },
                    { id: '8' },
                    { id: '9' },
                    { id: '10' },
                    { id: '11' },
                    { id: '12' },
                    { id: '13' }
                ]
            },
            total: {
                pageSize: 10,
                total: 200,
                entries: []
            }
        }
    };

    it('Should return correct number of pages', () => {
        const result = pageCount(fixt_state, 'all');

        assert.strictEqual(result, 2);
    });

    it('Should return correct number of pages with options', () => {
        const result = pageCount(fixt_state, 'all', { pageSize: 5 });

        assert.strictEqual(result, 3);
    });

    it('Should return correct number of pages with empty list', () => {
        const result = pageCount(fixt_state, 'total');

        assert.strictEqual(result, 20);
    });

    it('Should return 0 for missing list', () => {
        const result = pageCount(fixt_state, 'does-not-exist');

        assert.strictEqual(result, 0);
    });
});
