const mongoose = require('mongoose');
mongoose.set('debug' , true);
mongoose.connect('mongodb://localhost/todoapi',{useNewUrlParser:true});

mongoose.Promise = Promise;
module.exports.Todo = require('./todo');