sensorCloudApp.controller("adminDashboardController",function($rootScope,$scope,$state,$http){
	$http({
		method:"GET",
		url:"/getCustomerSubscriptionCount"
	}).then(function myFunction(response){
		var ctx = document.getElementById("barChart");
		var axis=[];
		var data=[];
		for(var i=0;i<response.data.msg.length;i++){
			axis.push(response.data.msg[i]._id);
			data.push(response.data.msg[i].count);
		}
		var myChart = new Chart(ctx, {
		    type: 'bar',
		    options:{
		    	scaleBeginAtZero : true,
		    	scaleStartValue : 0 
		    },
		    data: {
		        labels : axis,
			    datasets: [
			    {
			    	label:" Number of Users",
			        fillColor : "#810541",
			        backgroundColor: "#810541",
					strokeColor : "#ACC26D",
					pointColor : "#fff",
					pointStrokeColor : "#9DB86D",
					data : data
			    }
			    ]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});
	},function myError(response){
		
	});
});