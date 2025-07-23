import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useLogger } from './LoggingProvider';

const initialInputs = Array(5).fill({ url: '', validity: '', shortcode: '' });

const UrlShortenerForm = ({ onSubmit }) => {
  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState({});
  const { log } = useLogger();

  const handleChange = (idx, field, value) => {
    const newInputs = [...inputs];
    newInputs[idx][field] = value;
    setInputs(newInputs);
  };

  const validate = () => {
    const newErrors = {};
    inputs.forEach((input, idx) => {
      if (input.url && !/^https?:\/\/.+\..+/.test(input.url)) {
        newErrors[idx] = 'Invalid URL';
      }
      if (input.validity && isNaN(Number(input.validity))) {
        newErrors[idx] = 'Validity must be a number';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      log('Submitting URLs', inputs);
      onSubmit(inputs.filter(i => i.url));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Shorten up to 5 URLs</Typography>
      <Grid container spacing={2}>
        {inputs.map((input, idx) => (
          <Grid item xs={12} key={idx}>
            <TextField
              label={`URL #${idx + 1}`}
              value={input.url}
              onChange={e => handleChange(idx, 'url', e.target.value)}
              error={!!errors[idx]}
              helperText={errors[idx]}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Validity (minutes, optional)"
              value={input.validity}
              onChange={e => handleChange(idx, 'validity', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Preferred Shortcode (optional)"
              value={input.shortcode}
              onChange={e => handleChange(idx, 'shortcode', e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
        ))}
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Shorten URLs
      </Button>
    </form>
  );
};

export default UrlShortenerForm;