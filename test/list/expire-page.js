import assert from 'assert';
import sinon from 'sinon';

import { EXPIRED } from '../../src/constants';
import expirePage from '../../src/list/expire-page';

describe('# expirePage()', () => {

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

    it('Should expire page with values at start', () => {
        sandbox.stub(Date, 'now').returns(1000);

        const state = expirePage(fixt_state, 'all', 1);

        assert.equal(state.list.all.entries.length, 15);

        assert.deepEqual(state.list.all.entries, [
            null,
            null,
            null,
            null,
            null,
            { id: 0, expires: 999, state: EXPIRED },
            { id: 1, expires: 999, state: EXPIRED },
            { id: 2, expires: 999, state: EXPIRED },
            { id: 3, expires: 999, state: EXPIRED },
            { id: 4, expires: 999, state: EXPIRED },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 }
        ]);
    });

    it('Should expire page with values at end', () => {
        sandbox.stub(Date, 'now').returns(1000);

        const state = expirePage(fixt_state, 'all', 2);

        assert.equal(state.list.all.entries.length, 15);

        assert.deepEqual(state.list.all.entries, [
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
            { id: 5, expires: 999, state: EXPIRED },
            { id: 6, expires: 999, state: EXPIRED },
            { id: 7, expires: 999, state: EXPIRED },
            { id: 8, expires: 999, state: EXPIRED },
            { id: 9, expires: 999, state: EXPIRED }
        ]);
    });

});
