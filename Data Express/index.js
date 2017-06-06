var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    route = require('./routes/routes.js');
    bodyParser = require('body-parser');
    
var app = express();

app.set('view engine', 'pug');
app.set('views',__dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
  extended: true
})

var checkAuth = function (req, res, next) {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

// app.post('/', urlencodedParser, function (req, res) {
//     console.log(req.body.username);
//     if (req.body.username == 'user' && req.body.password == 'pass') {
//         req.session.user = { isAuthenticated: true, username: req.body.username};
//         res.redirect('/Admin');
//     } else {
//         // logout here so if the user was logged in before, it will log them out if user/pass wrong
//         res.redirect('/logout');

//     }
// });

app.get('/', route.index);
app.get('/create', route.create);
app.get('/edit/:id', route.edit);
app.get('/details/:id', route.details);
app.post('/create', urlencodedParser, route.createPerson);
app.post('/edit/:id', urlencodedParser, route.editPerson);
app.get('/delete/:id', route.delete);

app.get('/',function(req, res){
    res.render('Index');
});

app.get('/createUser',function(req, res){
    res.render('createUser');
});
app.get('/User',function(req,res){
    res.render('User');
});
// app.get('/Admin',function(req,res){
//     res.render('Welcome ' + req.session.user.username + "!")
// });
    app.listen(3000)

