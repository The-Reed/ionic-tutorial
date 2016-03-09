
angular.module('starter.services', ['ngResource'])

.factory('Session', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
}).factory('socket', function (socketFactory,$rootScope) {
  var socket = io.connect('http://ComputerDonationsAceepted.azurewebsites.net');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});