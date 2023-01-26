import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { sendMessage } from '../../store/chat/sagas';
import './ChatForm.css';

function ChatForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [text, setText] = React.useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(sendMessage({ user: 'Client', text }));
        setText('');
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type message"
                    autoComplete="off"
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                />
                <input
                    type="submit"
                    value="Send"
                    disabled={!!!text}
                />
            </form>
        </section>
    );
}

export default ChatForm;
