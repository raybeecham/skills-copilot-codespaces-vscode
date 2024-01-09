// Create web server
// 1. Load modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
// 2. Create object
const app = express();
// 3. Set up middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// 4. Set up routes
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'comments.html'));
});
app.get('/comments', function (req, res) {
    fs.readFile('comments.json', function (err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});
app.post('/comments', function (req, res) {
    fs.readFile('comments.json', function (err, data) {
        // Parse JSON
        var json = JSON.parse(data);
        // Add new comment
        json.push(req.body);
        // Write JSON back
        fs.writeFile('comments.json', JSON.stringify(json));
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(json));
    });
});
// 5. Start server
app.listen(3000, function () {
    console.log('Server started on port 3000');
});
