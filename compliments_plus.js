Module.register("compliments_plus", {

	defaults: {
		updateInterval: 30000,
		remoteFile: null,
		fadeSpeed: 4000,
		random: true,
		mockDate: null,
		classes: "thin large pre-line",

		sleepStartTime: 2,
		sleepEndTime: 5,
		morningStartTime: 5,
		morningEndTime: 11,
		noonStartTime: 12,
		noonEndTime: 14,
		afternoonStartTime: 15,
		afternoonEndTime: 18,
		eveningStartTime: 18,
		eveningEndTime: 23,
		nightStartTime: 23,
		nightEndTime: 2,

		compliments: {
			anytime : [
				"Hello sexy thing!",
				"You looking great"
			],
			sleep : [
				"Why you don't sleep?"
			],
			morning : [
				"Good morning"
			],
			noon : [
				"Hava a good day"
			],
			afternoon : [
				"Good afternoon"
			],
			evening : [
				"Good evening"
			],
			night : [
				"Good night"
			],
			day_sunny : [
				"Sunny"
			],
			day_cloudy : [
				"Cloudy",
			],
			cloudy : [
				"Cloudy"
			],
			cloudy_windy : [
				"Cloudy windy"
			],
			showers : [
				"Rain shower"
			],
			rain : [
				"Raining"
			],
			thunderstorm : [
				"Thunderstorm"
			],
			snow : [
				"Snowing"
			],
			fog : [
				"It's Fog"
			],
			night_clear : [
				"Clear night"
			],
			night_cloudy : [
				"Night cludy"
			],
			night_showers : [
				"Night showers"
			],
			night_rain : [
				"Raining night"
			],
			night_thunderstorm : [
				"Thunderstorm night"
			],
			night_snow : [
				"Snowing night"
			],
			night_alt_cloudy_windy : [
				"Night clouds and wind"
			], 
			"25-12-...." : [
				"Marry Christmas!"
			],
			"01-01-....": [
				function() {return "Happy New Year! " + moment().format("YYYY")}
			],
			"..-..-....": [
				function() {return moment().locale(config.language).format("dddd, D MMMM")}
				// https://forum.magicmirror.builders/topic/13332/reloading-config-defaults-or-module
			],
		}
	},

	lastIndexUsed: -1,
	currentWeatherType: "weather",
	
	getStyles: function () {
		return ["compliments_plus.css"];
	},
	
	start: function() {
		Log.info("Starting module: " + this.name);
		this.lastComplimentIndex = -1;
		var self = this;
		if (this.config.remoteFile !== null) {
			this.complimentFile(function(response) {
				self.config.compliments = JSON.parse(response);
				self.updateDom();
			});
		}
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
	},
	randomIndex: function(compliments) {
		if (compliments.length === 1) {
			return 0;
		}
		var generate = function() {
			return Math.floor(Math.random() * compliments.length);
		};
		var complimentIndex = generate();
		while (complimentIndex === this.lastComplimentIndex) {
			complimentIndex = generate();
		}
		this.lastComplimentIndex = complimentIndex;
		return complimentIndex;
	},
	complimentArray: function() {
		var compliments; var hour = moment().format("k");
		var date = this.config.mockDate ? this.config.mockDate : moment().format("DD-MM-YYYY");

		if (hour >= this.config.sleepStartTime && hour < this.config.sleepEndTime && this.config.compliments.sleep) {
			compliments = this.config.compliments.sleep.slice(0);
		} else	if (hour >= this.config.morningStartTime && hour < this.config.morningEndTime && this.config.compliments.morning) {
			compliments = this.config.compliments.morning.slice(0);
		} else	if (hour >= this.config.noonStartTime && hour < this.config.noonEndTime && this.config.compliments.noon) {
			compliments = this.config.compliments.noon.slice(0);
		} else	if (hour >= this.config.afternoonStartTime && hour < this.config.afternoonEndTime && this.config.compliments.afternoon) {
			compliments = this.config.compliments.afternoon.slice(0);
		} else	if (hour >= this.config.eveningStartTime && hour < this.config.eveningEndTime && this.config.compliments.evening) {
			compliments = this.config.compliments.evening.slice(0);
		} else	if (hour >= this.config.nightStartTime && hour < 24 && this.config.compliments.night) {
			compliments = this.config.compliments.night.slice(0);
		} else	if (hour >= 1 && hour < this.config.nightEndTime && this.config.compliments.night) {
			compliments = this.config.compliments.night.slice(0);
		}

		if (typeof compliments === "undefined") {
			compliments = [];
		}

		if (this.currentWeatherType in this.config.compliments) {
			compliments.push.apply(compliments, this.config.compliments[this.currentWeatherType]);
		}

		compliments.push.apply(compliments, this.config.compliments.anytime);

		for (var entry in this.config.compliments) {
			if (new RegExp(entry).test(date)) {
				compliments.push.apply(compliments, this.config.compliments[entry]);
			}
		}
		return compliments;
	},
	complimentFile: function(callback) {
		var xobj = new XMLHttpRequest(),
			isRemote = this.config.remoteFile.indexOf("http://") === 0 || this.config.remoteFile.indexOf("https://") === 0,
			path = isRemote ? this.config.remoteFile : this.file(this.config.remoteFile);
		xobj.overrideMimeType("application/json");
		xobj.open("GET", path, true);
		xobj.onreadystatechange = function() {
			if (xobj.readyState === 4 && xobj.status === 200) {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	},
	randomCompliment: function() {
		var compliments = this.complimentArray();
		var index = 0;
		if(this.config.random){
			index = this.randomIndex(compliments);
		}
		else{
			this.lastIndexUsed >= compliments.length - 1 ? 0 : ++this.lastIndexUsed;
		}

		// https://forum.magicmirror.builders/topic/13332/reloading-config-defaults-or-module
		// this function calculate a value and get the string to display
		var f = compliments[index];
		if (typeof f == "function") f = f().replace(/uarie|ombrie|embrie/g, ".");
		return f || "";
	},
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";
		var complimentText = this.randomCompliment();
		var parts = complimentText.split("\n");
		var compliment = document.createElement("span");

        for (var i = 0; i < parts.length; i++) {                        // keep ios9 compatibility
            part = parts[i];
            compliment.appendChild(document.createTextNode(part));
            compliment.appendChild(document.createElement("BR"));
        }
		compliment.lastElementChild.remove();
		wrapper.appendChild(compliment);
		return wrapper;
	},
	setCurrentWeatherType: function(data) {
		var weatherIconTable = {
			"01d": "day_sunny",
			"02d": "day_cloudy",
			"03d": "cloudy",
			"04d": "cloudy_windy",
			"09d": "showers",
			"10d": "rain",
			"11d": "thunderstorm",
			"13d": "snow",
			"50d": "fog",
			"01n": "night_clear",
			"02n": "night_cloudy",
			"03n": "night_cloudy",
			"04n": "night_cloudy",
			"09n": "night_showers",
			"10n": "night_rain",
			"11n": "night_thunderstorm",
			"13n": "night_snow",
			"50n": "night_alt_cloudy_windy"
		};
		this.currentWeatherType = weatherIconTable[data.weather[0].icon];
	},
	notificationReceived: function(notification, payload, sender) {
		if (notification === "Weather data") {
			this.setCurrentWeatherType(payload.data);
		}
	},
});
