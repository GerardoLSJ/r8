app.controller('SideNavCtrl', function($scope, $location) {

/*side nav*/
$scope.state = false;
$scope.menuTitle = "menu";
$scope.settings = {
    close: true,
    closeIcon: "fa fa-times"
};
$scope.items = [
    {
        name: "first item",
        link: "//google.com",
        icon: "fa fa-google",
        target: "_blank"
    },
    {
        name: "logout",
        link: "#/",
        icon: "",
        target: ""
    }
];
  });