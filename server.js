const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// Our API
const api = require('./server/routes/api');

// Parsers to handle data from incoming requests
app.use(bodyParser.json());

// This tells the parser to not accept nested objects
app.use(bodyParser.urlencoded({ extended: false }))

//This tells Express to serve files from the dist folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

// All non-API requests go to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

// Set port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Awesome server running on localhost:${port}`));