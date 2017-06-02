var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var personSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  age: String,
  victims: String,
  species: String
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
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
    victims: req.body.victims,
    species: req.body.species
  });
  person.save(function (err, person) {
    if (err) return console.error(err);
    console.log(req.body.name + ' added');
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
    person.first_name = req.body.first_name;
    person.last_name = req.body.last_name;
    person.age = req.body.age;
    person.victims  = req.body.victims;
    person.species = req.body.species;
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
      title: person.name + "'s Details",
      person: person
    });
  });
};
