import React, { useState, useEffect } from 'react';
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
    },
    button: {
        marginTop: '16px',
        marginBottom: '8px',
    },
}));

const socket = io(process.env.REACT_APP_CHAT_ENDPOINT);
export const Chat = () => {
    const classes = useStyles();
    const [chatData, setChatData] = useState({
        message: '',
        allUsers: [],
    });
    const [allChat, setallChat] = useState({
        messages: [],
        broadcast: '',
    });
    const [user, setUser] = useState({
        isConnected: false,
        nickname: '',
    });

    useEffect(() => {
        socket.on('chat message', res => {
            let list = allChat.messages;
            list.push(res);
            setallChat({
                messages: list,
            });
        });
        socket.on('get users', users => {
            setChatData({
                allUsers: users,
            });
        });
        socket.on('broadcast', msg => {
            let list = allChat.messages;
            list.push(msg);
            setallChat({
                messages: list,
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const writeMessage = event => {
        setChatData({
            ...chatData,
            message: event.target.value,
        });
    };
    const sendMessage = event => {
        socket.emit('chat message', chatData.message);
    };
    const loginChat = event => {
        setUser({
            ...user,
            nickname: event.target.value,
        });
    };
    const sendLoginChat = event => {
        socket.emit('set nickname', user.nickname);
        socket.on('set nickname', msg => {
            console.log(msg);
            setUser({
                ...user,
                isConnected: true,
            });
        });
    };
    console.log(chatData);
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
                    />
                    <Button
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
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={sendLoginChat}
                        className={classes.button}
                    >
                        Send
                    </Button>
                </div>
            )}
            <div className={`${classes.outlined} ${classes.chat}`}>
                {allChat.messages.map(msg => (
                    <p key={msg.id}>
                        <b>{msg.time}</b> <b>{msg.user}:</b>{' '}
                        {msg.message}
                    </p>
                ))}
            </div>
        </Container>
    );
};
