angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,socket) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };


}).controller('SessionsCtrl', function($scope,socket) {
	var vm = this;
	$scope.txt = {};
	$scope.add_session = function () {
		var session_title = $scope.txt.session_title;
		socket.emit('addSessions', { title:session_title});
	}
	socket.emit('getSessions', { get:"true"});
	socket.on('sessions', function (data) {
		var sessions = data.session;
		//console.log(data);
		setTimeout(function () {
			$scope.$apply(function () {
				$scope.sessions = sessions
			});
		},500);
	});
}).controller('SessionCtrl', function($scope, $stateParams,socket) {
	var data = {sessionId: $stateParams.sessionId};
    $scope.session = socket.emit('session', data);
	socket.on('session_passed', function (data) {
		$scope.session = data.session;
	});
}); 

