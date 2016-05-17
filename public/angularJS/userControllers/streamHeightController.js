sensorCloudApp.controller('streamHeightController', function($scope, $http){
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
	
});