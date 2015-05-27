RateImpactorApp=angular.module('RateImpactorApp', ['ngRoute','uiSlider','ui-rangeSlider']);

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
	$scope.current = {
			min: 0,
			max: 80,
			maxCurrent:100
	};
	$scope.revised = {
			min: 0,
			max: 80,
			maxRevised:150
	};
	$scope.percent = {
			min: 0,
			max: 80,
			maxPercent:100
	};

	$scope.chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "Premium Change Comparison Chart",
			fontSize: 14,
			fontFamily: "Century Gothic",
			padding: 10,
		},
		animationEnabled: true, 
		animationDuration: 1000,
		exportFileName: "Changed Rate Chart",
		exportEnabled: true,
		axisX:{

			gridColor: "Silver",
			tickColor: "silver"

		}, 
		axisY: {
			gridColor: "Silver",
			tickColor: "silver",
			title: "Prermium Change In Million",
			labelFontFamily: "Century Gothic",
			titleFontSize: 12,
			labelWrap: true 
		},
		toolTip:{
			shared:true
		},
		theme: "theme2",
		data: [
		       {        
		    	   type: "line",
		    	   showInLegend: true,
		    	   legendMarkerType: "circle",
		    	   lineThickness: 2,
		    	   name: "Current Book of Business",
		    	   color: "#CC0035",
		    	   dataPoints: [
		    	                { x: 1, y: 650 ,label: "Building"},
		    	                { x: 2, y: 700 ,label: "Personal Property" },
		    	                { x: 3, y: 710 ,label: "Business Income"},
		    	                { x: 4, y: 658 ,label: "SBP" }
		    	                ]
		       },
		       {        
		    	   type: "line",
		    	   showInLegend: true,
		    	   legendMarkerType: "circle",
		    	   name: "Revised Book of Business",
		    	   color: "#3690C5",
		    	   lineThickness: 2,

		    	   dataPoints: [
		    	                { x: 1, y: 755, label: "Building" },
		    	                { x: 2, y: 610, label: "Personal Property" },
		    	                { x: 3, y: 950, label: "Business Income" },
		    	                { x: 4, y: 760, label: "SBP" }
		    	                ]
		       }


		       ],
		       legend:{
		    	   cursor:"pointer",
		    	   verticalAlign: "top",
		    	   horizontalAlign: "right",
		    	   itemclick:function(e){
		    		   if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		    			   e.dataSeries.visible = false;
		    		   }
		    		   else{
		    			   e.dataSeries.visible = true;
		    		   }
		    		   e.chart.render();
		    	   }
		       }
	});

	$scope.chart.render(); //render the chart for the first time
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
});


