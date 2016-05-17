sensorCloudApp.controller('waterTemperatureController', function($scope, $http){
	$http({
		method:"GET",
		url:"/registeredSensorsHubs"
	}).then(function myFunction(response){
		$scope.sensorHubs = response.data.msg;
	},function myError(response){
		
	});
	
	$scope.getWaterLevelData=function(sensorHub,sensorType){
		$http({
			method:"POST",
			url:"/getWaterTemperatureData",
			data:{
				"sensorHub":sensorHub,
				"sensorType":sensorType
			}
		}).success(function(response){
			if(response.status=="success"){
				var ctx = document.getElementById("barChart");
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
				    type: 'bar',
				    data: {
				        labels : axis,
					    datasets: [
					    {
					    	label:" Water Temperature(in Fahreinheit)",
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
});