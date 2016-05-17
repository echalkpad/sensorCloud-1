sensorCloudApp.controller('addSensorHubController',function($scope,$http){
	$scope.storedStatus=true;
	$scope.sensorHubStatus=true;
	$scope.submit=function(){
		$http({
			method: "POST",
			url : '/storeSensorHubData',
			data:{
				"sensorHubName":$scope.sensorHubName,
				"sensorHubDescription":$scope.description,
				"sensorHubStatus":$scope.sensorHubStatus,
				"sensorHubAddress":$scope.sensorHubDeploymentAddress,
				"sensorHubCity":$scope.sensorHubDeploymentCity,
				"sensorHubState":$scope.sensorHubDeploymentState,
				"sensorHubCountry":$scope.sensorHubDeploymentCountry
					
			}
		}).success(function(result) {
			if(result.status == "success"){
				$scope.storedStatus=false;
				swal({title: "Successfully Stored!",  imageUrl: "images/thumbs-up.jpg"});
				setTimeout(function(){
					window.location.reload();
				}, 3000);
			}
			else if(result.status=="fail")
			{
				swal({title: result.msg,  type:"error"});
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
		});
	};
});