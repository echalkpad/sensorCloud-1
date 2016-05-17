var mongo = require("../routes/mongo");
exports.addSensorHub=function(req,res){
	res.render('admin/partials/addSensorHub');
};

exports.addSensor=function(req,res){
	res.render('admin/partials/addSensor');
};

exports.manageSensorsHub=function(req,res){
	res.render('admin/partials/manageSensorsHub');
};

exports.manageSensors=function(req,res){
	res.render('admin/partials/manageSensors');
};

exports.sensorAdminDashboardConsole=function(req,res){
	res.render('admin/partials/sensorAdminDashboardConsole');
}

exports.redirectToAdminHome=function(req,res){
	if(req.session.email){
		res.render('admin/sensorAdminHome');
	}
	else{
		res.redirect('/');
	}
}

exports.getCustomerSubscriptionCount=function(req,res){
	mongo.connect(function(err,db){
		var coll = db.collection('userSubscriptions');
		coll.aggregate(([{ $group: { _id:"$sensorHubName",count:{$sum:1}}}]),function(err,results){
			if(err){
				res.send({"status":"fail" , 'msg': 'Error in Subscribing'});
			}
			else{
				res.send({"status":"success" , 'msg': results});
			}
		});
	});
};