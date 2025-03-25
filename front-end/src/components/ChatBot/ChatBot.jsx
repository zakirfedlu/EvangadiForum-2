import React, { useEffect, useRef, useState } from 'react';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import './ChatBot.css';
import { TbMessageChatbotFilled } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdModeComment } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { forumData } from "./EvangadiForum";

const ChatBot = () => {
    const [chatHistory, setChatHistory] = useState([
        {
            hideInChat: false,
            role: 'model',
            text: forumData.introduction,
        }
    ]);
    const [showChat, setShowChat] = useState(false);
    const chatBodyRef = useRef();
    const toggleChat = () => {
        setShowChat(prevState => !prevState);  // prevState is the current state value (true or false)
    };

    const generateBotResponse = async (history) => {
        const updateHistory = (text) => {
            setChatHistory(prev => [
                ...prev.filter(msg => msg.text !== 'Thinking...'),
                { role: 'model', text }
            ]);
        };

        const formattedHistory = history.map(({ role, text }) => ({
            role: role === 'model' ? 'assistant' : 'user', // Gemini uses 'assistant' instead of 'model'
            parts: [{ text }]
        }));

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: formattedHistory,
            }),
        };

        try {
            // Ensure this is set
            const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAtEOwKJNG57jUYoc6dn1E6u95XVhVdpg4';
            const response = await fetch(url, requestOptions);

            // Check if response is ok before parsing
            if (!response.ok) {
                const errorText = await response.text(); // Get raw text for debugging
                throw new Error(`API Error: ${response.status} - ${errorText || 'Unknown error'}`);
            }

            const data = await response.json();

            // Validate the response structure
            if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
                throw new Error('Invalid response format from API');
            }

            const apiResponseText = data.candidates[0].content.parts[0].text
                .replace(/\*\*(.*?)\*\*/g, '$1')
                .trim();
            updateHistory(apiResponseText);
        } catch (error) {
            console.error('Error generating response:', error);
            updateHistory(`Sorry, I encountered an error: ${error.message}`);
        }
    };

    useEffect(() => {

        if (chatBodyRef.current) {


            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatHistory]);
    return (
        <div className="container">
            <button onClick={toggleChat} id="chatbot__toggle">
                <span>
                    {showChat ? <IoMdClose className='icon' /> : <MdModeComment className='icon' />}
                </span>
            </button>
            {showChat && (
                <div className="chatbot__popup">
                    <div className="chatbot__header">
                        <div className="header__info">
                            <TbMessageChatbotFilled />
                            <h2 className="logo__text">Chatbot</h2>
                        </div>
                        <button className="material-symbols-rounded">
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    <div ref={chatBodyRef} className="chat__body">
                        {chatHistory.map((chat, index) => (
                            <ChatMessage key={index} chat={chat} />
                        ))}
                    </div>

                    <div className="chat__footer">
                        <ChatForm
                            chatHistory={chatHistory}
                            setChatHistory={setChatHistory}
                            generateResponse={generateBotResponse}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;