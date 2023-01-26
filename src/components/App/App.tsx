import React from 'react';
import ChatForm from '../ChatForm';
import ChatMessages from '../ChatMessages';
import './App.css';

function App() {
    return (
        <div className="root">
            <header>
                <h1>Chat</h1>
            </header>
            <main>
                <ChatForm />
                <ChatMessages />
            </main>
        </div>
    );
}

export default App;
