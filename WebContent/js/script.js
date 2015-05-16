RateImpactorApp=angular.module('RateImpactorApp', ['ngRoute']);

RateImpactorApp.controller('GAICAppController', ['$scope',function($scope ) {

}]);

RateImpactorApp.controller('loginController',['$scope','$location',function($scope,$location){
	$scope.$parent.backGroundImage = "login";
	
	$scope.loginCheck=function(){
		if($scope.username == 'test' && $scope.password == 'test123')
		{
			$location.path ('/rateImpactor');
		}
	}
}]);

RateImpactorApp.controller('rateImactorController',['$scope','$location',function($scope,$location){
	$scope.$parent.backGroundImage = 'rateImpactor';
	$scope.$parent.getClass = function(path) {
	    if ($location.path().substr(0, path.length) == path) {
	    	console.log($location.path().substr(0, path.length)+" "+path);
	      return "activeTab"
	    } else {
	      return ""
	    }
	}
}]);

RateImpactorApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/login', {
		templateUrl: 'partials/login.html',
		controller:'loginController'
	}).
	when('/home',{
		templateUrl:'partials/rateImpactor.html',
		controller:'rateImactorController'
	}).
	when('/dashBoard',{
		templateUrl:'partials/rateImpactor.html',
		controller:'rateImactorController'
	}).
	when('/corCalci',{
		templateUrl:'partials/rateImpactor.html',
		controller:'rateImactorController'
	}).
	when('/rateImpactor',{
		templateUrl:'partials/rateImpactor.html',
		controller:'rateImactorController'
	}).
	when('/busiCrossSell',{
		templateUrl:'partials/rateImpactor.html',
		controller:'rateImactorController'
	}).
	otherwise({
		redirectTo: '/login'
	});
}]);


RateImpactorApp.directive("apptabs",function(){
	return {
		restrict: "EAC",
		transclude : true,
		templateUrl: 'partials/tabs.html'
		
	};
<<<<<<< HEAD
});

RateImpactorApp.directive('ngEnterKey', function() {
	console.log('enter key');
	return function(scope, element, attrs) {

		element.bind("keydown keypress", function(event) {
			var keyCode = event.which || event.keyCode;

			// If enter key is pressed
			if (keyCode === 13) {
				scope.$apply(function() {
					// Evaluate the expression
					scope.$eval(attrs.ngEnterKey);
				});

				event.preventDefault();
			}
		});
	};
=======
>>>>>>> branch 'master' of https://github.com/jamadagniVijay/RateImpactor.git
});
