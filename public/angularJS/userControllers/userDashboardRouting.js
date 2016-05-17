var sensorCloudApp = angular.module('sensorCloud', ['ui.router','ngMap']);
sensorCloudApp.controller("customerCtrl",function($rootScope,$scope,$state){
	$state.go("userDashboard");
});
sensorCloudApp.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider, $stateProvider){
	$stateProvider.state('userDashboard',{
		templateUrl:'/userDashboardConsole',
		controller:function($scope,$state,$rootScope, NgMap){
			$scope.view = function(request){
				if(request=="manageRegisteredSensorHubs")
					$state.go("viewRegisteredSensorsHubs");
				else if(request=="subscribeToSensorHubs")
					$state.go("subscribeToSensorHubs");
				else if(request=="viewSensors")
					$state.go("viewSensors");
			}

			$scope.vm = {};

			NgMap.getMap().then(function(map) {
				console.log('map', map);
				$scope.vm.map = map;
			});

			$scope.vm.jsonData = commonSensors;

			$scope.vm.clicked = function() {
				alert('Clicked a link inside infoWindow');
			};

			$scope.vm.shops = [  ];
			$scope.vm.shop = $scope.vm.shops[0];

			for(var i = 0 ; i < $scope.vm.jsonData.length ; i++){
				 var temp = {};
				 temp.id = $scope.vm.jsonData[i].sensor;
				 temp.name = $scope.vm.jsonData[i].name;
				 temp.source = $scope.vm.jsonData[i].source;
				 temp.position = [];
				 temp.position.push($scope.vm.jsonData[i]["latitude (degree)"]);
				 temp.position.push($scope.vm.jsonData[i]["longitude (degree)"]);

				 $scope.vm.shops.push(temp);
				 console.log(temp.position[0] + " , " + temp.position[1]);
					var latLng = new google.maps.LatLng(temp.position[0], temp.position[1]);
					console.log(latLng);

			}

			$scope.vm.showDetail = function(e, shop) {
				$scope.vm.shop = shop;
				$scope.vm.map.showInfoWindow('foo-iw', shop.id);
			};

			$scope.vm.hideDetail = function() {
				$scope.vm.map.hideInfoWindow('foo-iw');
			};



		}
	}).state('viewRegisteredSensorsHubs',{
		url:'viewRegisteredSensorsHubs',
		templateUrl:'/viewRegisteredSensorsHubs'
	}).state('subscribeToSensorHubs',{
		url:'subscribeToSensorHub',
		templateUrl:'/subscribeToSensorHub',
	}).state('viewSensors',{
		url:'viewSensors',
		templateUrl:'/viewSensors',
	}).state('streamFlow',{
		url:'streamFlow',
		templateUrl:'/streamFlow',
	}).state('streamHeight',{
		url:'streamHeight',
		templateUrl:'/streamHeight',
	}).state('waterLevel',{
		url:'waterLevel',
		templateUrl:'/waterLevel',
	}).state('waterTemperature',{
		url:'waterTemperature',
		templateUrl:'/waterTemperature',
	}).state('waveHeight',{
		url:'waveHeight',
		templateUrl:'/waveHeight',
	}).state('windSpeed',{
		url:'windSpeed',
		templateUrl:'/windSpeed',
	}).state('sensorStats',{
		url:'sensorStats',
		templateUrl:'/sensorStats',
	}).state('sensorProvider',{
		url:'sensorProvider',
		templateUrl:'/sensorProvider',
	}).state('profile',{
		url:'profile',
		templateUrl:'/profile',
	}).state('/manageRegisteredSensors',{
		url:'manageRegisteredSensors',
		templateUrl:'/manageRegisteredSensors',
	});
}]);
