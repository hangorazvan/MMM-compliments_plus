Module.register("compliments", {

	defaults: {},

	lastIndexUsed: -1,
	currentWeatherType: "weather",

	getScripts: function() {
	    return [];
	},
	
	getStyles: function() {
	    return [];
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
		var hour = moment().hour();
		var date = this.config.mockDate ? this.config.mockDate : moment().format("DD-MM-YYYY");
		var compliments;

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
		} else	if (hour >= this.config.nightStartTime && hour < this.config.nightEndTime && this.config.compliments.night) {
			compliments = this.config.compliments.night.slice(0);
		} else	if (hour >= this.config.night2StartTime && hour < this.config.night2EndTime && this.config.compliments.night) {
			compliments = this.config.compliments.night.slice(0);
		}

		if (typeof compliments === "undefined") {
			compliments = new Array();
		}

		if (this.currentWeatherType in this.config.compliments) {
			compliments.push.apply(compliments, this.config.compliments[this.currentWeatherType]);
		}

		compliments.push.apply(compliments, this.config.compliments.anytime);

		for (entry in this.config.compliments) {
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
			index = (this.lastIndexUsed >= (compliments.length-1)) ? 0: ++this.lastIndexUsed;
		}
		return compliments[index] || "";
	},
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes;
		var complimentText = this.randomCompliment();
		var parts = complimentText.split("\n");
		var compliment = document.createElement("span");
//		for (part of parts){
//			compliment.appendChild(document.createTextNode(part));
//			compliment.appendChild(document.createElement("BR"));
//		}
        for (var _i = 0; _i < parts.length; _i++) {
            part = parts[_i];
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