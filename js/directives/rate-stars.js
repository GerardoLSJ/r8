app.directive("rateStars", ()=> {
    
    return {
        scope: {
            item: "=",
        },
        controller: 'rateStarsCtrl',
      // controllerAs: 'ctrl',
         templateUrl: '../../views/stars.html'
    };
});
