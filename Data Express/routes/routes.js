var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var personSchema = mongoose.Schema({
  user_name: String,
  password: String,
  age: String,
  email: String,
  user_level: Boolean,
  answer1: String,
  answer2: String,
  answer3: String
});


var Person = mongoose.model('People_Collection', personSchema);



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
    user_name: req.body.user_name,
    password: req.body.password,
    age: req.body.age,
    email: req.body.email,
    user_level: req.body.user_level,
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
    res.render('edit', {
      title: 'Edit Person',
      person: person
    });
  });
};

exports.editPerson = function (req, res) {
  Person.findById(req.params.id, function (err, person) {
    if (err) return console.error(err);
    person.user_name = req.body.user_name;
    person.password = req.body.password;
    person.age = req.body.age;
    person.email  = req.body.email;
    person.user_level = req.body.user_level;
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
    res.render('details', {
      title: person.user_name + "'s Details",
      person: person
    });
  });
};
