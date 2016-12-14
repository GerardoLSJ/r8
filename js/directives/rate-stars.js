/*angular
    .module('app')
    .directive('test', test);

function test() {
    return {
        restrict: 'E',
        template: '<button ng-click="click">{{text}}</button>',
        controller: testCtrl,
        controllerAs: 'vm'
    }
}
*/
app.directive("rateStars", ()=> {
    return {
        //controller: rateStarsCtrl,
        //controllerAs: 'vm',
        //template : "<h1>Made by a directive!</h1>",
        templateUrl: '../../views/stars.html'
        
    };
});

