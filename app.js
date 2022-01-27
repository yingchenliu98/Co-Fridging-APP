require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const history = require('connect-history-api-fallback');

const isProduction = process.env.NODE_ENV === 'production';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users-with-middleware');
const itemsRouter = require('./routes/items-with-middleware');
const fridgesRouter = require('./routes/fridges-with-middleware');

const app = express();
app.use(history());

// Set up user session
app.use(session({
    secret: 'fritter',
    resave: true,
    saveUninitialized: true

    
}));


app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, isProduction ?'dist': 'public')));

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/item', itemsRouter);
app.use('/api/fridges', fridgesRouter);

// Catch all other routes into a meaningful error message
app.all('*', (req, res) => {
    const errorMessage = `
        Cannot find the resource <b>${req.url}</b>
        <br>
        Please use only supported routes below
        <br><br>

        <b>Home Page and Fritter</b>
        <br>
        GET / -- Go to home page

        <br><br>

        <b>Freets</b>
        <br>
        GET /api/freets/all -- Display all freets stored on the server
        <br>
        GET /api/freets/:author -- Display freets created by the author name :author stored on the server
        <br>
        POST /api/freets -- Create and store a new freet on the server
        <br>
        PUT /api/freets/:id -- Update the freet on the server with freet id :id
        <br>
        DELETE /api/shorts/:id -- Delete the freet on the server with freet id :id

        <br><br>

        <b>Authentication</b>
        <br>
        POST /api/session -- Create a new account with username and password
        <br>
        POST /api/session/live -- Sign in with username and password
        <br>
        DELETE /api/session/live -- Sign out the current account
        <br>
        PUT /api/session/username -- Update the username of the current account
        <br>
        PUT /api/session/password -- Update the password of the current account
        <br>
        DELETE /api/session -- Delete the current account
    `;

    res.status(404).send(errorMessage);
});

module.exports = app;