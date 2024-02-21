// SubscriptionsWatched.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

function SubscriptionsWatched({ subscriptions }) {
  return (
    <List component="nav">
      {subscriptions.map(subscription => (
        <ListItem button component={RouterLink} to={`/member/${subscription.id}`}>
          <ListItemText primary={subscription.name} secondary={subscription.year} />
        </ListItem>
      ))}
    </List>
  );
}

export default SubscriptionsWatched;