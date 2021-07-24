const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());
app.use(cookieParser());


// Set up the View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'Codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disbaled'
    },
    function(err){
        console.log(err || "Connect-mongodb setup ok");
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Use Express Router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    
    console.log(`Server is running on port : ${port}`);
});