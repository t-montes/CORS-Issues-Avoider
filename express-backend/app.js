// @Author: Tony Santiago Montes Buitrago

// Steps to create a basic express backend API
// npm init -y
// npm i --save express
// npm i --save-dev nodemon
// // nodemon allows to run the server in watch mode; with node > 18, you can use the --watch flag instead

// Change running settings in package.json (optional)
// "scripts": {
//     "start": "nodemon app.js"
// },

// 1. Import express
const express = require('express');
const app = express();

// 2. Add middleware (support json and urlencoded bodies)
// As of Express 4.16.0, middleware is no longer bundled with Express, so must be installed separately
// npm i --save body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies (e.g. forms)

// 3. Logic to handle requests
// In a real app, this would be in a database
let messages = [
    { id: 1, message: 'Hello World!' },
];

// 4. Create routes
app.get('/', (req, res) => {
    console.log("GET /");
    res.send(messages);
});

app.post('/', (req, res) => {
    console.log('POST /');
    const { message } = req.body;
    if (!message) {
        res.status(400).send('Bad request');
        return;
    }
    const id = messages.length + 1;
    messages.push({ id, message });
    res.send('OK');
});

// Additional for example: JSONP
app.get('/jsonp', (req, res) => {
    console.log('GET /jsonp');
    const { callback } = req.query;
    if (!callback) {
        res.status(400).send('Bad request');
        return;
    }
    app.set('jsonp callback name', callback);
    res.jsonp(messages);
    //res.send(`${callback}(${JSON.stringify(messages)})`);
})

// 5. Listen to port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

// 6. Run the server
// npm start
// or (if you don't change the running settings)
// node app.js