sensorCloudApp.controller('streamHeightController', function($scope, $http , NgMap){
	$http({
		method:"GET",
		url:"/registeredSensorsHubs"
	}).then(function myFunction(response){
		$scope.sensorHubs = response.data.msg;
	},function myError(response){

	});

	$scope.getStreamHeightData=function(sensorHub,sensorType){
		$http({
			method:"POST",
			url:"/getStreamHeightData",
			data:{
				"sensorHub":sensorHub,
				"sensorType":sensorType
			}
		}).success(function(response){
			if(response.status=="success"){
				var ctx = document.getElementById("lineChart");
				var axis=[];
				var data=[];
				$scope.date=response.finalDate;
				$scope.minimum=response.msg[0].avg,$scope.maximum=0;
				for(var i=0;i<response.msg.length;i++){
					axis.push(response.msg[i].time);
					data.push(response.msg[i].avg);
					var value=response.msg[i].avg;
					if(value>$scope.maximum){
						$scope.maximum=value;
					}
					if(value<$scope.minimum){
						$scope.minimum=value;
					}
				}
				var myChart = new Chart(ctx, {
				    type: 'line',
				    data: {
				        labels : axis,
					    datasets: [
					    {
					    	label:" Stream Height(in fts)",
					        fillColor : "#810541",
					        backgroundColor: "#810541",
							strokeColor : "#ACC26D",
							pointColor : "#fff",
							pointStrokeColor : "#9DB86D",
							data : data
					    }
					    ]
				    }
				});
			}
		}).error(function(response){

		});
	}
	$scope.vm = {};

	NgMap.getMap().then(function(map) {
		console.log('map', map);
		$scope.vm.map = map;
	});


	$scope.vm.jsonData = streamHeight;

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
});
