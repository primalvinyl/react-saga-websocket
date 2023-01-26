import { mockServer } from '../setupTests';
import { store } from '../store';
import * as sagas from '../store/chat/sagas';

describe('WebSocket Saga and Redux Integration', () => {
    it('connects to server', async () => {
        mockServer.send({ user: 'Server', text: 'one' });
        expect(store.getState().messages).toEqual({
            list: [ { user: 'Server', text: 'one' } ],
            status: 'connected'
        });
    })

    it('gets messages', async () => {
        mockServer.send({ user: 'Server', text: 'two' });
        expect(store.getState().messages).toEqual({
            list: [
                { user: 'Server', text: 'one' },
                { user: 'Server', text: 'two' },
            ],
            status: 'connected'
        });
    })

    it('sends messages', async () => {
        store.dispatch(sagas.sendMessage({ user: 'Client', text: 'three' }));
        await expect(mockServer).toReceiveMessage({ user: 'Client', text: 'three' });
        expect(store.getState().messages).toEqual({
            list: [
                { user: 'Server', text: 'one' },
                { user: 'Server', text: 'two' },
                { user: 'Client', text: 'three' },
            ],
            status: 'connected'
        });
    })

    it('on server error, status is disconnected', async () => {
        mockServer.error();
        await mockServer.closed;
        expect(store.getState().messages.status).toBe('disconnected');
    });

    it('on server close, status is disconnected', async () => {
        mockServer.close();
        await mockServer.closed;
        expect(store.getState().messages.status).toBe('disconnected');
    });
});
