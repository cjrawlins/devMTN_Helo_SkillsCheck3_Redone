// Dependencies
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const ctrl = require('./controllers/authController');
const postCtrl = require('./controllers/postController');

// Create instance app from express
const app = express();

// Get Database connection info from .env
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;


// Top-Level-Middleware to parse JSON
app.use(express.json());

app.use(session( {
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48 },
    secret: SESSION_SECRET
} ) )

// Invoke massive database connector
massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
    }).then(dbInstance => {
        app.set('db', dbInstance);
        console.log('Connected to Database')
    })
    .catch( error => console.log(error));

// Endpoints //
    // Auth //
    app.post('/api/auth/register', ctrl.register);
    app.post('/api/auth/login', ctrl.login);
    app.delete('/api/auth/logout', ctrl.logout);
    app.get('/api/auth/getuser', ctrl.getUser);

    // Posts //
    app.get('/api/posts', postCtrl.getAllPosts);
    app.get('/api/post/:id', postCtrl.getPost);
    app.post('/api/post', postCtrl.createPost);
    app.put('/api/post/:id', postCtrl.editPost);
    app.delete('/api/post/:id', postCtrl.deletePost);
    app.get('/api/search:?', postCtrl.searchPostTitle);

//Set up server to listen on port and log
app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`);
    });