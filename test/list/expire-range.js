import assert from 'assert';
import sinon from 'sinon';

import expireRange from '../../src/list/expire-range';

describe('# expireRange()', () => {

    let sandbox;

    const fixt_state = {
        list: {
            all: {
                entries: [
                    null,
                    null,
                    null,
                    null,
                    null,
                    { id: 0 },
                    { id: 1 },
                    { id: 2 },
                    { id: 3 },
                    { id: 4 },
                    { id: 5 },
                    { id: 6 },
                    { id: 7 },
                    { id: 8 },
                    { id: 9 }
                ]
            }
        }
    };

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should expire range with values at start', () => {
        sandbox.stub(Date, 'now').returns(1000);

        const state = expireRange(fixt_state, 'all', 0, 9);

        assert.equal(state.list.all.entries.length, 15);

        assert.deepEqual(state.list.all.entries, [
            null,
            null,
            null,
            null,
            null,
            { id: 0, expires: 999 },
            { id: 1, expires: 999 },
            { id: 2, expires: 999 },
            { id: 3, expires: 999 },
            { id: 4, expires: 999 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 }
        ]);
    });

    it('Should expire range with values at end', () => {
        sandbox.stub(Date, 'now').returns(1000);

        const state = expireRange(fixt_state, 'all', 5, 14);

        assert.equal(state.list.all.entries.length, 15);

        assert.deepEqual(state.list.all.entries, [
            null,
            null,
            null,
            null,
            null,
            { id: 0, expires: 999 },
            { id: 1, expires: 999 },
            { id: 2, expires: 999 },
            { id: 3, expires: 999 },
            { id: 4, expires: 999 },
            { id: 5, expires: 999 },
            { id: 6, expires: 999 },
            { id: 7, expires: 999 },
            { id: 8, expires: 999 },
            { id: 9, expires: 999 }
        ]);
    });

    it('Should set defaults on empty lists', () => {
        const state = expireRange({ list: {} }, 'all', 5, 14);

        assert.equal(state.list.all.entries.length, 0);
    });

    it('Should set defaults on empty state', () => {
        const state = expireRange(null, 'all', 5, 14);

        assert.equal(state.list.all.entries.length, 0);
    });

    it('Should remove total if set', () => {
        const root = {
            list: {
                all: {
                    entries: [],
                    total: 0
                }
            }
        };
        const state = expireRange(root, 'all', 0, 5);

        assert.equal(state.list.all.entries.length, 0);
        assert.equal(typeof state.list.all.total, 'undefined');
    });

});
