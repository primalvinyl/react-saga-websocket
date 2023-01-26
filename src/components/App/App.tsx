import React from 'react';
import ChatForm from '../ChatForm';
import messages from '../messages';
import './App.css';

function App() {
    return (
        <div className="root">
            <header>
                <h1>Chat</h1>
            </header>
            <main>
                <ChatForm />
                <messages />
            </main>
        </div>
    );
}

export default App;
