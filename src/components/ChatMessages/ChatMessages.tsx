import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './messages.css';

function messages() {
    const messages = useSelector((state: RootState) => state.messages.list);

    return (
        <section>
            <ul>
                {messages.map((element, index) => (
                    <li key={index}><strong>{element.user}</strong>: {element.text}</li>
                ))}
            </ul>
        </section>
    );
}

export default messages;
