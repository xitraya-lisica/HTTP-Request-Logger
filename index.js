// HTTP Request Logger

const http = require('http');
const fs = require('fs');
const path = require('path');



// Log file path
const logFile = path.join(__dirname, 'http_requests_log.txt');

// Function to log incoming requests
function logRequest(req) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${req.method} ${req.url}\n`;
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
    console.log(`Request Logged - ${req.method} ${req.url}`);
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    logRequest(req);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Request received and logged.\n');
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    fs.appendFile(logFile, '[SYSTEM] HTTP Server started.\n', (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
});

// Stop the server after 1 minute
setTimeout(() => {
    server.close(() => {
        console.log('Server stopped.');
        fs.appendFile(logFile, '[SYSTEM] HTTP Server stopped.\n', (err) => {
            if (err) console.error('Error writing to log file:', err);
        });
        process.exit(0);
    });
}, 60000);
