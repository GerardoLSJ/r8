app.controller('rateStarsCtrl', function($scope) {

//logic
this.name = 'Pascal12';
console.log('rateStarsCtrl');
$scope.click = (item,val)=>{
  console.log(item.name);
  console.log(val);
           var audio = document.getElementById("sound-rate"+val);
  audio.play()
}

  });