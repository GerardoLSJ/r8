app.controller('rateStarsCtrl', function($scope) {

//logic
this.name = 'Pascal12';
console.log('rateStarsCtrl');
$scope.click = (item)=>{
  console.log(item);
  console.log($scope.inputVal);
}

  });