var mongoose = require('mongoose'),
    Todo = mongoose.model('Todo');

module.exports = {

  find: function (params, callback) {
    Todo.find().sort('-created').exec(function (err, todos) {
      callback(err, todos);
    });
  },

  create: function (data, params, callback) {
    var todo = new Todo(data);

    todo.save(function (err) {
      callback(err, todo);
    });
  },

  update: function (id, data, params, callback) {
    Todo.findById(id, function(err, todo) {
      todo.done = data.done;
      todo.save(function(err) {
        callback(err, todo);
      })
    });
  },

  remove: function (id, params, callback) {
    Todo.findById(id, function(err, todo) {
      todo.remove(function(err) {
        callback(err, todo);
      })
    });
  }
};