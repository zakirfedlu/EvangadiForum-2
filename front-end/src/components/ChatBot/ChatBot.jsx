import React, { useEffect, useRef, useState } from 'react'; // Importing React Hooks
import ChatForm from './ChatForm'; // Importing ChatForm component
import ChatMessage from './ChatMessage'; // Importing ChatMessage component
import './ChatBot.css'; // Importing CSS stylesheet
import { TbMessageChatbotFilled } from "react-icons/tb"; // Importing icon
import { MdKeyboardArrowDown } from "react-icons/md"; // Importing icon
import { MdModeComment } from "react-icons/md"; // Importing icon
import { IoMdClose } from "react-icons/io"; // Importing icon
import { forumData } from "./EvangadiForum"; // Importing data from EvangadiForum

const ChatBot = () => {
    const [chatHistory, setChatHistory] = useState([
        {
            hideInChat: false,
            role: 'model',
            text: forumData.introduction,
        }
    ]); // Initializing state with introduction message

    const [showChat, setShowChat] = useState(false); // Initializing state for show/hide chat
    const chatBodyRef = useRef(); // Creating a ref for chat body

    const toggleChat = () => { // Function to toggle show/hide chat
        setShowChat(prevState => !prevState);  // prevState is the current state value (true or false)
    };

    const generateBotResponse = async (history) => { // Function to generate bot response
        const updateHistory = (text) => { // Function to update chat history
            setChatHistory(prev => [
                ...prev.filter(msg => msg.text !== 'Thinking...'),
                { role: 'model', text }
            ]);
        };

        const formattedHistory = history.map(({ role, text }) => ({ // Formatting history for API request
            role: role === 'model' ? 'assistant' : 'user', // Gemini uses 'assistant' instead of 'model'
            parts: [{ text }]
        }));

        const requestOptions = { // Options for API request
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
            const response = await fetch(url, requestOptions); // Making API request

            // Check if response is ok before parsing
            if (!response.ok) {
                const errorText = await response.text(); // Get raw text for debugging
                throw new Error(`API Error: ${response.status} - ${errorText || 'Unknown error'}`);
            }

            const data = await response.json(); // Parsing response

            // Validate the response structure
            if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
                throw new Error('Invalid response format from API');
            }

            const apiResponseText = data.candidates[0].content.parts[0].text // Extracting text from response
                .replace(/\*\*(.*?)\*\*/g, '$1') // Removing markdown
                .trim(); // Trimming whitespace
            updateHistory(apiResponseText); // Updating chat history
        } catch (error) {
            console.error('Error generating response:', error); // Logging error
            updateHistory(`Sorry, I encountered an error: ${error.message}`); // Updating chat history with error message
        }
    };

    useEffect(() => { // Hook to update chat body scroll position when chat history changes

        if (chatBodyRef.current) {

            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight; // Setting scroll position to bottom
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
                        {chatHistory.map((chat, index) => ( // Mapping over chat history
                            <ChatMessage key={index} chat={chat} /> // Rendering ChatMessage component
                        ))}
                    </div>

                    <div className="chat__footer">
                        <ChatForm
                            chatHistory={chatHistory} // Passing chat history to ChatForm
                            setChatHistory={setChatHistory} // Passing setChatHistory to ChatForm
                            generateResponse={generateBotResponse} // Passing generateBotResponse to ChatForm
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;