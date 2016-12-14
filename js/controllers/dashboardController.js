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
    });
  $scope.click = (item)=>{
  console.log(item);
  //console.log($scope.inputVal);
}
  });


/*

     $(document).ready( ()=> {
         console.log('doc ready')

         setTimeout( ()=> {

	var audio = document.getElementById("sound-rate"); 
  var rateBtn = document.getElementById("rate-btn");
  rateBtn.addEventListener("click", function() { 
      audio.play();
  });
         }, 100)

     });
     */

});