var express = require('express'),
    expressSession = require('express-session'),
    pug = require('pug'),
    path = require('path'),
    bcrypt = require('bcrypt-nodejs'),
    hash,
    valid,
    route = require('./routes/routes.js'),
    bodyParser = require('body-parser');
    
var app = express();

var checkAuth = function (req, res, next) {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};
function toHash(my_str){
    bcrypt.hash(my_str, null, null, function(err, hash) {
     pw=hash//store hash to db
    });
}
function compareHash(my_str){
    bcrypt.compare(my_str, pw, function(err, res) {
        valid=res  // res === true
        if(typeof(valid) === "boolean"){
        console.log('is a bool');// variable is a boolean
        console.log(valid);
        }
    });

}
function outputHash(my_str){
    console.log(my_str);
}

app.set('view engine', 'pug');
app.set('views',__dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));
app.use(expressSession({secret: '5ecretP455c0de', saveUninitialized: true, resave: true}));


var urlencodedParser = bodyParser.urlencoded({
  extended: true
})

app.post('/', urlencodedParser, function (req, res) {
    console.log(req.body.username);
    console.log(req.body.password);

    // toHash(req.body.password);
    // setTimeout(function(){
    // console.log("waiting");
    //  console.log("pw is "+pw);
    //  compareHash(req.body.password);
    // }, 2000);
    if(req.body.username == 'admin' && req.body.password == 'pass'){
        req.session.user = { isAuthenticated: true, username: req.body.username};
        res.redirect('/Admin');
    }else{
        if (req.body.username == 'user' && req.body.password == 'pass') {
            req.session.user = { isAuthenticated: true, username: req.body.username};
            res.redirect('/User');
        } else {
            // logout here so if the user was logged in before, it will log them out if user/pass wrong
            res.redirect('/logout');
        }
    }
});

// var checkAuth = function (req, res, next) {
//     if (req.session.user && req.session.user.isAuthenticated) {
//         next();
//     } else {
//         res.redirect('/');
//     }
// };

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
app.get('/User',checkAuth,function(req,res){
    res.render('User');
});
app.get('/Admin',checkAuth,function(req,res){
    res.render('Admin');
});
// app.get('/Admin',function(req,res){

//     res.render('Welcome ' + req.body.user_name + "!")

//    res.render('Welcome ' + req.session.user.username + "!")

// });

// logs out the user by destroying the session
app.get('/logout', function (req, res) {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect('/');
        }
    });

});
    app.listen(3000)

