
  app.controller('DashboardCtrl', function($scope, $http) {
    this.histories = {};
    $http.get('histories.json').success((response)=>{
        this.histories = response.histories;
        console.log(this.histories);
    })


  });