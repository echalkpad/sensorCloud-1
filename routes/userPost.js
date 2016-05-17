var mongo = require("../routes/mongo");
//var mongoURL = "mongodb://project:project@ds023052.mlab.com:23052/sensorcloud";
var mongoURL = "mongodb://localhost:27017/sensorCloud";

exports.subscribeToSensors=function(req,res){
	if(req.session.email){
		var sensorHubName = req.param("sensorHubName");
		mongo.connect(function(err,db){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = db.collection('userSubscriptions');
			var insert_subscription_query={'email':req.session.email,'sensorHubName':sensorHubName};
			coll.insert(insert_subscription_query,function(err,result){
				
				if(err){
					res.send({"status":"fail" , 'msg': 'Error in Subscribing'});
				}
				else{
					res.send({"status":"success" , 'msg': 'Subscribed successfully'});
				}
			});
		});
	}
};

exports.unSubscribeToSensorHub=function(req,res){
	if(req.session.email){
		mongo.connect(function(err,db){
			var coll=db.collection("userSubscriptions");
			coll.remove({'email':req.session.email,'sensorHubName':req.param("sensorHubName")}, function(err, result) {
				
				if(err){
					res.send({"status":"fail","msg":"Error Deleting"});
				}
				else{
					res.send({"status":"success","msg":"Deleted Successfully"});
				}
			})
		});
	}
};

exports.getWaterLevelData=function(req,res){
	if(req.session.email){
		mongo.connect(function(err,db){
			var coll=db.collection("sensorInformation");
			coll.findOne({'sensorHub':req.param("sensorHub"),'sensorType':req.param("sensorType")}, function(err, result) {
				if(err){
					res.send({"status":"fail","msg":"Error Deleting"});
				}
				else{
					var sensorID=result.sensorID;
					var date = new Date();
					var myDate = date.toString();
					var finalDate = (date.getMonth()+1)+"-"+myDate.substr(8,2)+"-"+date.getFullYear();
					var coll=db.collection("waterLevelDataCollection");
					console.log("sensorID"+sensorID+"finalDate:"+finalDate);
					coll.findOne({'sensorID':sensorID,'date':finalDate}, function(err, results) {
						if(err){
							res.send({"status":"fail","msg":"Error Deleting"});
						}
						else{
							console.log(results.dateAvg);
							res.send({"status":"success","msg":results.dateAvg,"finalDate":finalDate});
							
						}
					})
				}
			})
		});
	}
}

exports.getWaveHeightData=function(req,res){
	if(req.session.email){
		mongo.connect(function(err,db){
			var coll=db.collection("sensorInformation");
			coll.findOne({'sensorHub':req.param("sensorHub"),'sensorType':req.param("sensorType")}, function(err, result) {
				if(err){
					res.send({"status":"fail","msg":"Error Deleting"});
				}
				else{
					var sensorID=result.sensorID;
					var date = new Date();
					var myDate = date.toString();
					var finalDate = (date.getMonth()+1)+"-"+myDate.substr(8,2)+"-"+date.getFullYear();
					var coll=db.collection("waveHeightDataCollection");
					console.log("sensorID"+sensorID+"finalDate:"+finalDate);
					coll.findOne({'sensorID':sensorID,'date':finalDate}, function(err, results) {
						if(err){
							res.send({"status":"fail","msg":"Error Deleting"});
						}
						else{
							console.log(results.dateAvg);
							res.send({"status":"success","msg":results.dateAvg,"finalDate":finalDate});
							
						}
					})
				}
			})
		});
	}
}

exports.getWindSpeedData=function(req,res){
	if(req.session.email){
		mongo.connect(function(err,db){
			var coll=db.collection("sensorInformation");
			coll.findOne({'sensorHub':req.param("sensorHub"),'sensorType':req.param("sensorType")}, function(err, result) {
				if(err){
					res.send({"status":"fail","msg":"Error Deleting"});
				}
				else{
					var sensorID=result.sensorID;
					var date = new Date();
					var myDate = date.toString();
					var finalDate = (date.getMonth()+1)+"-"+myDate.substr(8,2)+"-"+date.getFullYear();
					var coll=db.collection("windSpeedDataCollection");
					console.log("sensorID"+sensorID+"finalDate:"+finalDate);
					coll.findOne({'sensorID':sensorID,'date':finalDate}, function(err, results) {
						if(err){
							res.send({"status":"fail","msg":"Error Deleting"});
						}
						else{
							console.log(results.dateAvg);
							res.send({"status":"success","msg":results.dateAvg,"finalDate":finalDate});
							
						}
					})
				}
			})
		});
	}
}

exports.getWaterTemperatureData=function(req,res){
	if(req.session.email){
		mongo.connect(function(err,db){
			var coll=db.collection("sensorInformation");
			coll.findOne({'sensorHub':req.param("sensorHub"),'sensorType':req.param("sensorType")}, function(err, result) {
				if(err){
					res.send({"status":"fail","msg":"Error Deleting"});
				}
				else{
					var sensorID=result.sensorID;
					var date = new Date();
					var myDate = date.toString();
					var finalDate = (date.getMonth()+1)+"-"+myDate.substr(8,2)+"-"+date.getFullYear();
					var coll=db.collection("waterTemperatureDataCollection");
					console.log("sensorID"+sensorID+"finalDate:"+finalDate);
					coll.findOne({'sensorID':sensorID,'date':finalDate}, function(err, results) {
						if(err){
							res.send({"status":"fail","msg":"Error Deleting"});
						}
						else{
							console.log(results.dateAvg);
							res.send({"status":"success","msg":results.dateAvg,"finalDate":finalDate});
							
						}
					})
				}
			})
		});
	}
}

exports.getStreamHeightData=function(req,res){
	if(req.session.email){
		mongo.connect(function(err,db){
			var coll=db.collection("sensorInformation");
			coll.findOne({'sensorHub':req.param("sensorHub"),'sensorType':req.param("sensorType")}, function(err, result) {
				if(err){
					res.send({"status":"fail","msg":"Error Deleting"});
				}
				else{
					var sensorID=result.sensorID;
					var date = new Date();
					var myDate = date.toString();
					var finalDate = (date.getMonth()+1)+"-"+myDate.substr(8,2)+"-"+date.getFullYear();
					var coll=db.collection("streamHeightDataCollection");
					console.log("sensorID"+sensorID+"finalDate:"+finalDate);
					coll.findOne({'sensorID':sensorID,'date':finalDate}, function(err, results) {
						if(err){
							res.send({"status":"fail","msg":"Error Deleting"});
						}
						else{
							console.log(results.dateAvg);
							res.send({"status":"success","msg":results.dateAvg,"finalDate":finalDate});
							
						}
					})
				}
			})
		});
	}
}

exports.getStreamFlowData=function(req,res){
	if(req.session.email){
		mongo.connect(function(err,db){
			var coll=db.collection("sensorInformation");
			coll.findOne({'sensorHub':req.param("sensorHub"),'sensorType':req.param("sensorType")}, function(err, result) {
				if(err){
					res.send({"status":"fail","msg":"Error Deleting"});
				}
				else{
					var sensorID=result.sensorID;
					var date = new Date();
					var myDate = date.toString();
					var finalDate = (date.getMonth()+1)+"-"+myDate.substr(8,2)+"-"+date.getFullYear();
					var coll=db.collection("streamFlowDataCollection");
					console.log("sensorID"+sensorID+"finalDate:"+finalDate);
					coll.findOne({'sensorID':sensorID,'date':finalDate}, function(err, results) {
						if(err){
							res.send({"status":"fail","msg":"Error Deleting"});
						}
						else{
							console.log(results.dateAvg);
							res.send({"status":"success","msg":results.dateAvg,"finalDate":finalDate});
							
						}
					})
				}
			})
		});
	}
}