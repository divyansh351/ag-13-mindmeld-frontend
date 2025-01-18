import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div>
            <List>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/profile">
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button component={Link} to="/skills">
                    <ListItemText primary="Skills" />
                </ListItem>
                <ListItem button component={Link} to="/auth">
                    <ListItemText primary="Auth" />
                </ListItem>
            </List>
        </div>
    );
};

export default Sidebar;