app.controller('DashboardCtrl', function ($scope, $http, $rootScope) {
  this.histories = {};
  $http.get('histories.json').success(response => {
    this.histories = response.histories;
    console.log(this.histories);
    $rootScope.items.push({
      name: "logout",
      link: "#/",
      icon: "fa fa-sign-out",
      target: ""
    })
  });


});