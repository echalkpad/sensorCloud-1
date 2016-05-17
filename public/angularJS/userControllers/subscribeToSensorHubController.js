sensorCloudApp.controller('subscribeToSensorHubController',function($scope,$http){
	$scope.successfullAddition = true;
	$scope.subscribe=function(sensorHubName){
		$http({
			method:"POST",
			url:"/subscribeToSensors",
			data:{
				"sensorHubName":sensorHubName
			}
		}).success(function(results){
			if(results.status=="success"){
				swal({title: "Successfully Subscribed!",  imageUrl: "images/thumbs-up.jpg"});
				setTimeout(function(){
					window.location.reload();
				}, 3000);
			}
		}).error(function(error){
			swal({title: "Error!",  type: 'error'});
		});
	}
	
	$http({
		method:"GET",
		url:"/getSensorHubSubscriptions"
	}).then(function myFunction(response) {
    	$scope.sensorHubs = response.data.msg;
    }, function myError(response) {
        
    });
});