app.directive("rateStars", ()=> {
    return {
        controller: 'rateStarsCtrl',
       controllerAs: 'ctrl',
         templateUrl: '../../views/stars.html'
    };
});
