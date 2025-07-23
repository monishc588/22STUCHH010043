const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, 'access.log');

function logger(req, res, next) {
    const start = Date.now();
    res.on('finish', () => {
        const logEntry = `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms\n`;
        fs.appendFile(logFile, logEntry, () => {});
    });
    next();
}

logger.info = function(message) {
    const logEntry = `${new Date().toISOString()} INFO: ${message}\n`;
    fs.appendFile(logFile, logEntry, () => {});
};

module.exports = logger;