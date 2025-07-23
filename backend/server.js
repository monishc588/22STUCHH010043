const express = require('express');
const bodyParser = require('body-parser');
const { nanoid } = require('nanoid');
const logger = require('./logger');

const app = express();
app.use(bodyParser.json());
app.use(logger);

const PORT = 3000;
const urls = {};
const stats = {};

app.post('/shorturls', (req, res) => {
    const { url, validity = 30, shortcode } = req.body;
    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    let code = shortcode || nanoid(6);
    if (urls[code]) {
        return res.status(409).json({ error: 'Shortcode already exists' });
    }
    const expiry = new Date(Date.now() + validity * 60000).toISOString();
    urls[code] = { url, expiry, created: new Date().toISOString() };
    stats[code] = { clicks: 0, details: [] };
    res.status(201).json({
        shortLink: `http://localhost:${PORT}/${code}`,
        expiry
    });
});

app.get('/:shortcode', (req, res) => {
    const { shortcode } = req.params;
    const entry = urls[shortcode];
    if (!entry) {
        return res.status(404).json({ error: 'Shortcode not found' });
    }
    if (new Date() > new Date(entry.expiry)) {
        return res.status(410).json({ error: 'Short link expired' });
    }
    stats[shortcode].clicks += 1;
    stats[shortcode].details.push({
        timestamp: new Date().toISOString(),
        referrer: req.get('Referer') || '',
        ip: req.ip
    });
    res.redirect(entry.url);
});

app.get('/shorturls/:shortcode', (req, res) => {
    const { shortcode } = req.params;
    const entry = urls[shortcode];
    if (!entry) {
        return res.status(404).json({ error: 'Shortcode not found' });
    }
    res.json({
        url: entry.url,
        created: entry.created,
        expiry: entry.expiry,
        clicks: stats[shortcode].clicks,
        details: stats[shortcode].details
    });
});

app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
});