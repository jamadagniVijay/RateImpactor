RateImpactorApp=angular.module('RateImpactorApp', ['ngRoute','uiSlider','ui-rangeSlider','angularSpinner']);

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

RateImpactorApp.controller('rateImactorController',['$scope','$location','$http',function($scope,$location,$http){
	$scope.$parent.backGroundImage = 'rateImpactor';
	$scope.$parent.getClass = function(path) {
		if ($location.path().substr(0, path.length) == path) {
			return "activeTab"
		} else {
			return ""
		}
	}
	$scope.LCM = {
			min: 0,
			max: 190,
			maxLCM:300
	};
	$scope.CD = {
			min: 0,
			max: 139,
			maxCD:300
	};

	$http.get('js/jsonData.json').success(function(data) {
		$scope.usstates = data.usstates;
		$scope.businessunits = data.businessunits;
		$scope.rateeffdates = data.rateeffdates;
	});
	var current = [], revised = [];


	chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "Premium Change Comparison Chart",
			fontSize: 14,
			fontFamily: "Century Gothic",
			padding: 10,
		},
		animationEnabled: true, 
		animationduration: 2000,
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
		    	   dataPoints: current
		       },
		       {        
		    	   type: "line",
		    	   showInLegend: true,
		    	   legendMarkerType: "circle",
		    	   name: "Revised Book of Business",
		    	   color: "#3690C5",
		    	   lineThickness: 2,
		    	   dataPoints:revised
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

	xVal = [1,2,3,4];
	label = ['Building','Personal Property','Business Income','SBP'];
	var target = document.getElementById('chartContainer');
	var opts = {
			lines: 24 // The number of lines to draw
			, length: 28 // The length of each line
			, width: 2 // The line thickness
			, radius: 42 // The radius of the inner circle
			, scale: 1 // Scales overall size of the spinner
			, corners: 1 // Corner roundness (0..1)
			, color: '#3690C5' // #rgb or #rrggbb or array of colors
				, opacity: 0.25 // Opacity of the lines
				, rotate: 0 // The rotation offset
				, direction: 1 // 1: clockwise, -1: counterclockwise
				, speed: 1 // Rounds per second
				, trail: 60 // Afterglow percentage
				, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
				, zIndex: 2e9 // The z-index (defaults to 2000000000)
				, className: 'spinner' // The CSS class to assign to the spinner
					, top: '50%' // Top position relative to parent
						, left: '50%' // Left position relative to parent
							, shadow: true // Whether to render a shadow
							, hwaccel: true // Whether to use hardware acceleration
							, position: 'absolute' // Element positioning
	}
	var spinner = new Spinner(opts).spin(target);
	spinner.stop();

	$http.get('rateService/rateimpactor/getPremium/current').success(function (data) {
		for(var i=0; i< data.length; i++) {
			current.push({
				x:xVal[i],
				y:data[i],
				label:label[i]
			});
		}
		chart.render();
	});

	$http.get('rateService/rateimpactor/getPremium/revised').success(function (data) {
		for(var i=0; i< data.length; i++) {
			revised.push({
				x:xVal[i],
				y:data[i],
				label:label[i]
			});
		}
		chart.render();
	});



	$scope.$watch('LCM.maxLCM',function(oldValue, newValue){
		if(oldValue!=newValue)
		{
			revised = [];
			chart.render();
		}

	});
	$scope.$watch('CD.maxCD',function(){

	});
	//chart.render(); //render the chart for the first time
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


