angular.module('mean.system')

    .service('Todo', function ($rootScope) {
      var socket = io.connect(),
          that = this;

      this.all = [];

      var getTodos = function() {
        console.log('getting todos');
        socket.emit('todos::find', {}, function (error, todos) {
          that.all = todos;
          $rootScope.$apply();
        });
      };
      getTodos();

      var eventHandler = function() {
        getTodos();
      };

      socket.on('todos created', eventHandler);
      socket.on('todos updated', eventHandler);
      socket.on('todos removed', eventHandler);

      this.add = function(title) {
        socket.emit('todos::create', {
          title: title,
          done: false
        }, {}, function(error, data) {
          that.all.push(data);
          $rootScope.$apply();
        });
      };

      this.markAsDone = function(todo) {
        var toggleValue = !todo.done;
        socket.emit('todos::update', todo._id, {
          done: toggleValue
        }, {}, function(error, data) {
          todo.done = toggleValue;
          $rootScope.$apply();
        });
      };

      this.remove = function(todo) {
        socket.emit('todos::remove', todo._id, {}, function(error, data) {
          $rootScope.$apply();
        });
      };
    });