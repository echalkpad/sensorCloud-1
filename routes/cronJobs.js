var waterLevelSensor = require('../routes/waterLevelSensor');
var streamFlowSensor = require('../routes/streamFlowSensor');
var streamHeightSensor = require('../routes/streamHeightSensor');
var waterTemperatureSensor = require('../routes/waterTemperatureSensor');
var waveHeightSensor = require('../routes/waveHeightSensor');
var windSpeedAndDirection = require('../routes/windSpeedAndDirection');



exports.first_job = {

    after: {                // Configuring this job to run after this period.
        seconds: 0,
        minutes: 5,
        hours: 0,
        days: 0
    },
    job: function () {
        console.log("first_job");
        waterLevelSensor.mine();
        
    },
    spawn: true
}

exports.second_job = {

	    after: {                // Configuring this job to run after this period.
	        seconds: 0,
	        minutes: 6,
	        hours: 0,
	        days: 0
	    },
	    job: function () {
	        console.log("second_job");
	        streamHeightSensor.mine();
	    },
	    spawn: true
	}

exports.third_job = {

	    after: {                // Configuring this job to run after this period.
	        seconds: 0,
	        minutes: 7,
	        hours: 0,
	        days: 0
	    },
	    job: function () {
	        console.log("third_job");
	        streamFlowSensor.mine();
	    },
	    spawn: true
	}

exports.fourth_job = {

	    after: {                // Configuring this job to run after this period.
	        seconds: 0,
	        minutes: 8,
	        hours: 0,
	        days: 0
	    },
	    job: function () {
	        console.log("fourth_job");
	        waterTemperatureSensor.mine();
	    },
	    spawn: true
	}

exports.fifth_job = {

	    after: {                // Configuring this job to run after this period.
	        seconds: 0,
	        minutes: 9,
	        hours: 0,
	        days: 0
	    },
	    job: function () {
	        console.log("fifth_job");
	        waveHeightSensor.mine();
	    },
	    spawn: true
	}

exports.sixth_job = {

	    after: {                // Configuring this job to run after this period.
	        seconds: 0,
	        minutes: 10,
	        hours: 0,
	        days: 0
	    },
	    job: function () {
	        console.log("sixth_job");
	        windSpeedAndDirection.mine();
	    },
	    spawn: true
	}