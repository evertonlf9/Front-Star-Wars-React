const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('build'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'build/'})
);

app.listen(process.env.PORT || 8080);