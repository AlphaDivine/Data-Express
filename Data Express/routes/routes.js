var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var personSchema = mongoose.Schema({
  username: String,
  password: String,
  age: String,
  email: String,
  isAdmin: Boolean,
  answer1: String,
  answer2: String,
  answer3: String
});


var Person = mongoose.model('People_Collection', personSchema);

var Hard_Admin = new Person({
  username: 'admin',
  password: 'pass',
  age: null,
  email: null,
  isAdmin: true,
  answer1: null,
  answer2: null,
  answer3: null

});

// exports.checkIfAdmin = function(req,res){

//   return Person.find({ user_name : Hard_Admin.user_name },function(err, person) {
//      if (err) return console.error(err);
//      console.log("un"+person.user_name);
//      console.log("arg"+arguments[0]);
    
//   });
// };



exports.index = function (req, res) {
  Person.find(function (err, person) {
    if (err) return console.error(err);
    res.render('index', {
      title: 'People List',
      people: person
    });
  });
};

exports.create = function (req, res) {
  res.render('create', {
      title: 'Add Person'
  });
};

exports.createPerson = function (req, res) {
  var person = new Person({
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    answer1: req.body.answer1,
    answer2: req.body.answer2,
    answer3: req.body.answer3
  });
  person.save(function (err, person) {
    if (err) return console.error(err);
    console.log(req.body.user_name + ' added');
  });
  res.redirect('/');
};

exports.edit = function (req, res) {
  Person.findById(req.params.id, function (err, person) {
    if (err) return console.error(err);
    res.render('Admin', {
      title: 'Edit Person',
      person: person
    });
  });
};

exports.editPerson = function (req, res) {
  Person.findById(req.params.id, function (err, person) {
    if (err) return console.error(err);
    person.username = req.body.username;
    person.password = req.body.password;
    person.age = req.body.age;
    person.email  = req.body.email;
    person.isAdmin = req.body.isAdmin;
    person.answer1 = req.body.answer1;
    person.answer2 = req.body.answer2;
    person.answer3 = req.body.answer3;
    person.save(function (err, person) {
      if (err) return console.error(err);
      console.log(req.body.name + ' updated');
    });
  });
  res.redirect('/');
};

exports.delete = function (req, res) {
  Person.findByIdAndRemove(req.params.id, function (err, person) {
    if (err) return console.error(err);
    res.redirect('/');
  });
};

exports.details = function (req, res) {
  Person.findById(req.params.id, function (err, person) {
    if (err) return console.error(err);
    res.render('Admin', {
      title: person.user_name + "'s Details",
      person: person
    });
  });
};

exports.loginInfo = function (req, res) {
  Person.findOne({"username": req.body.username}, function(err, person) {
    console.log(person.password)
  });
};


exports.isAdmin = function (req, res) {
  Person.findOne({"username": req.body.username}, function(err, person) {
    res.render('Index', {
      People: person.isAdmin 
    });
    
  });
};

