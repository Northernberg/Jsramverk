import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.emit('set nickname', localStorage);
export const Chat = () => {
    const [chatData, setChatData] = useState({
        message: '',
        allMessages: [],
    });
    const [user, setUser] = useState({
        isConnected: false,
    });
    const writeMessage = event => {
        setChatData({
            ...chatData,
            message: event.target.value,
        });
    };
    const sendMessage = event => {
        socket.on('chat message', message => {
            setChatData({
                ...chatData,
                allMessages: chatData.allMessages.concat(message),
            });
        });
        socket.emit('chat message', chatData.message);
    };
    const loginChat = event => {};
    const sendLoginChat = event => {};
    console.log(chatData);
    return (
        <div>
            <label>Message</label>
            {user.isConnected ? (
                <div>
                    <input
                        type="text"
                        id="message"
                        onChange={writeMessage}
                    />
                    <button onClick={sendMessage}></button>
                    {chatData.allMessages.map(msg => (
                        <p key={msg}> {msg} </p>
                    ))}
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        id="nickname"
                        onChange={loginChat}
                    />
                    <button onClick={sendLoginChat}></button>
                </div>
            )}
        </div>
    );
};
