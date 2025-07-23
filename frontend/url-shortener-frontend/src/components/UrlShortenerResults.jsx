// components/UrlShortenerResults.jsx
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const UrlShortenerResults = ({ results }) => (
  <List>
    {results.map((result, idx) => (
      <ListItem key={idx}>
        <ListItemText
          primary={`Shortened: ${result.shortUrl}`}
          secondary={`Original: ${result.originalUrl} | Expires: ${result.expiryDate}`}
        />
      </ListItem>
    ))}
  </List>
);

export default UrlShortenerResults;