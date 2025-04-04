import React, { useRef } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import './ChatBot.css';

const ChatForm = ({ chatHistory, setChatHistory, generateResponse }) => {
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;

        inputRef.current.value = '';
        setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);

        // Add "Thinking..." message immediately
        setChatHistory(prev => [...prev, { role: 'model', text: 'Thinking...' }]);

        // Call the API with the updated history
        generateResponse([...chatHistory, {
            role: 'user', text:
                `Using the detailed provided above, please address this query:
             ${userMessage}`
        }]);
    };

    return (
        <form action="#" className="chat__form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="message..."
                required
                ref={inputRef}
                className="message__input"
            />
            <button type="submit" className="material-symbols-rounded">
                <IoIosArrowUp className="icon" />
            </button>
        </form>
    );
};

export default ChatForm;