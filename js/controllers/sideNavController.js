app.controller('SideNavCtrl', function($scope, $location, $timeout,$rootScope) {

/* check login and dashborard controller, they update this variable too */
$rootScope.items = [];
/*side nav*/
$scope.state = false;
$scope.menuTitle = "menu";
$scope.settings = {
    close: true,
    closeIcon: "fa fa-times"
};



  });