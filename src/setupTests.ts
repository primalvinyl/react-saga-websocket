import '@testing-library/jest-dom/extend-expect';
import WS from 'jest-websocket-mock';

// initialize mock websocket server
export const mockServer = new WS('ws://localhost:8080/chat', { jsonProtocol: true });
