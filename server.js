const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var session = require('express-session');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: "theansweris42", resave: false, saveUninitialized: true, cookie: {maxAge: 60000}}));
app.use(function(req, res, next) {
    res.locals.count = req.session.count;
    next();
  });
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    
    if(req.session.count){        
        req.session.count ++;        
        res.render('index', {count: req.session.count});
    }
    else {
        req.session.count = 1;        
        res.render('index', {count: req.session.count});
    }
});

app.post('/addTwo', (req, res) => {
    req.session.count ++;
    res.redirect('/');
    
});

app.post('/reset', (req, res) => {
    req.session.destroy();
    res.redirect('/');
    
});


























app.listen(1337, () => console.log('Listening on port 1337'));

