import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './ChatMessages.css';

function ChatMessages() {
    const chatMessages = useSelector((state: RootState) => state.messages.list);

    return (
        <section>
            <ul>
                {chatMessages.map((element, index) => (
                    <li key={index}><strong>{element.user}</strong>: {element.text}</li>
                ))}
            </ul>
        </section>
    );
}

export default ChatMessages;
