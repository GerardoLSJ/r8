app.controller('LoginCtrl', function($scope, $location,$rootScope) {

$rootScope.items = [
    {
        name: "first item",
        link: "#/",
        icon: "fa fa-circle",
        target: ""
    }];

    $scope.submit = function() {
      $location.path('/dashboard');
      return false;
    }

  });