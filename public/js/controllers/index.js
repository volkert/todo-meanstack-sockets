angular.module('mean.system')
    .controller('IndexController', function ($scope, Todo) {
      $scope.Todo = Todo;

      $scope.addTodo = function() {
        Todo.add($scope.todoTitle);
        $scope.todoTitle = '';
      }
    });