import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import {
    Button,
    TextField,
    makeStyles,
    Container,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    messageField: {
        flexGrow: '1',
    },
    outlined: {
        border: '1px solid',
        borderRadius: '4px',
        borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    chat: {
        padding: '5px',
        height: '500px',
        overflow: 'auto',
        scrollBehavior: 'smooth',
    },
    button: {
        marginTop: '16px',
        marginBottom: '8px',
    },
}));
let socket;
export const Chat = () => {
    const classes = useStyles();
    const chatBox = useRef(null);
    const [chatData, setChatData] = useState({
        message: '',
        allUsers: [],
    });
    const [allChat, setallChat] = useState({
        messages: [],
        loaded: false,
    });
    const [user, setUser] = useState({
        isConnected: false,
        nickname: '',
    });
    useEffect(() => {
        socket = io(process.env.REACT_APP_CHAT_ENDPOINT);
    }, []);
    console.log(allChat);
    const saveChat = msg => {
        fetch(process.env.REACT_APP_API_ENDPOINT + '/chat/insert', {
            method: 'POST',
            body: JSON.stringify(msg),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error, unable to insert chat');
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(err => console.error(err));
    };
    useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + '/chat', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error, unable to fetch chat');
                }
            })
            .then(response => {
                console.log(response);
                setallChat({
                    ...allChat,
                    messages: response,
                    loaded: true,
                });
                socket.on('chat message', res => {
                    saveChat({ message: res });
                });
                socket.on('all chat', res => {
                    response.unshift(res);
                    setallChat({
                        messages: response,
                    });
                });
                socket.on('get users', users => {
                    setChatData({
                        allUsers: users,
                    });
                });
                socket.on('broadcast', msg => {
                    response.unshift(msg);
                    setallChat({
                        messages: response,
                    });
                });
                socket.on('save broadcast', msg => {
                    saveChat({ message: msg });
                });
            })
            .catch(err => console.error(err));
        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const writeMessage = event => {
        setChatData({
            ...chatData,
            message: event.target.value,
        });
    };
    const nickHandleKeyDown = event => {
        if (event.key === 'Enter') {
            sendLoginChat(event);
        }
    };
    const messageHandleKeyDown = event => {
        if (event.key === 'Enter') {
            sendMessage(event);
        }
    };
    const sendMessage = event => {
        var time = new Date();
        socket.emit('chat message', {
            message: chatData.message,
            date: time.toLocaleTimeString().slice(0, -3),
        });
        chatBox.current.scrollTop = 1;
    };
    const loginChat = event => {
        setUser({
            ...user,
            nickname: event.target.value,
        });
        localStorage.setItem('chatUser', user.nickname);
    };
    const sendLoginChat = event => {
        if (user.nickname.length > 0) {
            var time = new Date();
            socket.emit('set nickname', {
                nick: user.nickname,
                date: time.toLocaleTimeString().slice(0, -3),
            });
            socket.on('set nickname', msg => {
                console.log(msg);
                setUser({
                    ...user,
                    isConnected: true,
                });
            });
        }
    };
    return (
        <Container maxWidth="sm">
            {chatData.allUsers.length > 0 && (
                <div>
                    <h2> Userlist</h2>
                    {chatData.allUsers.map(user => (
                        <li key={user}>
                            <b>{user}</b>
                        </li>
                    ))}
                </div>
            )}
            {user.isConnected ? (
                <div className={classes.flex}>
                    <TextField
                        label="Message"
                        variant="outlined"
                        onChange={writeMessage}
                        rows="10"
                        margin="normal"
                        className={classes.messageField}
                        onKeyDown={messageHandleKeyDown}
                    />
                    <Button
                        id="sendMessage"
                        color="primary"
                        variant="contained"
                        onClick={sendMessage}
                        className={classes.button}
                    >
                        Send
                    </Button>
                </div>
            ) : (
                <div className={classes.flex}>
                    <TextField
                        label="Choose nickname"
                        margin="normal"
                        variant="outlined"
                        rows="10"
                        onChange={loginChat}
                        className={classes.messageField}
                        onKeyDown={nickHandleKeyDown}
                        disabled={!allChat.loaded}
                    />
                    <Button
                        id="sendNickname"
                        color="primary"
                        variant="contained"
                        onClick={sendLoginChat}
                        className={classes.button}
                        disabled={!allChat.loaded}
                    >
                        Send
                    </Button>
                </div>
            )}
            <div
                className={`${classes.outlined} ${classes.chat}`}
                ref={chatBox}
            >
                {allChat.messages.map((msg, i) => (
                    <p key={i}>
                        <b>{msg.time}</b> <b>{msg.user}:</b>{' '}
                        {msg.message}
                    </p>
                ))}
            </div>
        </Container>
    );
};
