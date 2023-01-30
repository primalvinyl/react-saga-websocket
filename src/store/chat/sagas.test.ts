import { mockServer } from '../../setupTests';
import { store } from '..';
import * as sagas from './sagas';

describe('WebSocket Sagas', () => {
    it('gets messages', () => {
        mockServer.send({ user: 'Server', text: 'test' });
        expect(store.getState().messages.list).toEqual([{ user: 'Server', text: 'test' }]);
    })

    it('sends messages', async () => {
        store.dispatch(sagas.sendMessage({ user: 'Client', text: 'test' }));
        await expect(mockServer).toReceiveMessage({ user: 'Client', text: 'test' });
    })
    
    it('on connection, status is connected', () => {
        expect(store.getState().messages.status).toEqual('connected');
    })

    it('on error, status is disconnected', async () => {
        mockServer.error();
        await mockServer.closed;
        expect(store.getState().messages.status).toBe('disconnected');
    });
});
