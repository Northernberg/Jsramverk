import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
import { Button } from '@material-ui/core';

export const Navbar = props => {
    return (
        <div>
            <ul className="navbar">
                <li>
                    <NavLink exact activeClassName="Active" to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        exact
                        activeClassName="Active"
                        to="/chat"
                    >
                        Online Chat
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="Active" to="/reports">
                        Reports
                    </NavLink>
                </li>
                <li>
                    {props.auth ? (
                        <Button onClick={props.logout}>Logout</Button>
                    ) : (
                        <NavLink activeClassName="Active" to="/login">
                            Login
                        </NavLink>
                    )}
                </li>
            </ul>
        </div>
    );
};
