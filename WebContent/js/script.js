RateImpactorApp=angular.module('RateImpactorApp', ['ngRoute']);

RateImpactorApp.controller('GAICAppController', ['$scope',function($scope ) {

}]);

RateImpactorApp.controller('loginController',['$scope','$location',function($scope,$location){
	$scope.loginCheck=function(){
		console.log('loginCheck');
		if($scope.username == 'test' && $scope.password == 'test123')
		{
			console.log('correct credentials');
			$location.path ('/rateImpactor');
		}
	}
}]);
RateImpactorApp.controller('rateImactorController',['$scope',function($scope){
	$scope.title="logged in";
}]);

RateImpactorApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/login', {
		templateUrl: 'partials/login.html',
		controller:'loginController'
	}).
	when('/rateImpactor',{
		templateUrl:'partials/rateImpactor.html',
		controller:'rateImactorController'
	}).
	otherwise({
		redirectTo: '/login'
	});
}]);

