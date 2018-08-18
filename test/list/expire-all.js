import assert from 'assert';
import sinon from 'sinon';

import { EXPIRED } from '../../src/constants';
import expireAll from '../../src/list/expire-all';
import isExpired from '../../src/status/is-expired';

describe('# expireAll()', () => {

    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should expire list', () => {
        sandbox.stub(Date, 'now').returns(1000);

        const fixt_state = {
            list: {
                all: {
                    entries: [
                        { id: 0 },
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                        { id: 4 },
                        { id: 5 },
                        { id: 6 },
                        { id: 7 },
                        { id: 8 },
                        { id: 9 },
                        { id: 10 },
                        { id: 11 },
                        { id: 12 },
                        { id: 13 },
                        { id: 14 }
                    ]
                }
            }
        };


        const state = expireAll(fixt_state, 'all');

        assert.equal(state.list.all.entries.length, 15);

        assert.deepEqual(state.list.all.entries, [
            { id: 0, expires: 999, state: EXPIRED },
            { id: 1, expires: 999, state: EXPIRED },
            { id: 2, expires: 999, state: EXPIRED },
            { id: 3, expires: 999, state: EXPIRED },
            { id: 4, expires: 999, state: EXPIRED },
            { id: 5, expires: 999, state: EXPIRED },
            { id: 6, expires: 999, state: EXPIRED },
            { id: 7, expires: 999, state: EXPIRED },
            { id: 8, expires: 999, state: EXPIRED },
            { id: 9, expires: 999, state: EXPIRED },
            { id: 10, expires: 999, state: EXPIRED },
            { id: 11, expires: 999, state: EXPIRED },
            { id: 12, expires: 999, state: EXPIRED },
            { id: 13, expires: 999, state: EXPIRED },
            { id: 14, expires: 999, state: EXPIRED }
        ]);
    });

    it('Should expire partial list', () => {
        sandbox.stub(Date, 'now').returns(1000);

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

        const state = expireAll(fixt_state, 'all');

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
            { id: 5, expires: 999, state: EXPIRED },
            { id: 6, expires: 999, state: EXPIRED },
            { id: 7, expires: 999, state: EXPIRED },
            { id: 8, expires: 999, state: EXPIRED },
            { id: 9, expires: 999, state: EXPIRED }
        ]);
    });

    it('Should set defaults on empty lists', () => {
        const state = expireAll({ list: {} }, 'all');

        assert.equal(state.list.all.entries.length, 0);
    });

    it('Should set defaults on empty state', () => {
        const state = expireAll(null, 'all');

        assert.equal(state.list.all.entries.length, 0);
    });

    it('Should set correct state on empty list', () => {
        sandbox.stub(Date, 'now').returns(1000);

        const root = {
            list: {
                all: {
                    total: 0,
                    entries: []
                }
            }
        };

        const state = expireAll(root, 'all');

        assert.equal(state.list.all.state, EXPIRED);
        assert.equal(state.list.all.expires, 999);
    });

});
