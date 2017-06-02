var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    route = require('./routes/routes.js');
    
var app = express();

app.set('view engine', 'pug');
app.set('views',__dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', route.index);
app.get('/create', route.create);
app.get('/edit/:id', route.edit);
app.get('/details/:id', route.details);
app.post('/create', urlencodedParser, route.createPerson);
app.post('/edit/:id', urlencodedParser, route.editPerson);
app.get('/delete/:id', route.delete);

app.get('/',function(req, res){
    res.render("Index");
});

    app.listen(3000)