/* Magic Mirror
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 *
 * https://github.com/hangorazvan
 * Creative Commons BY-NC-SA 4.0, Romania.
 */
Module.register("compliments_plus", {

	defaults: {
		updateInterval: 30000,
		remoteFile: null,
		fadeSpeed: 4000,
		random: true,
		mockDate: null,
		classes: "compliments_plus thin large pre-line",

		morning: 5,
		noon: 12,
		afternoon: 15,
		evening: 18,
		night: 22,
		midnight: 1,

		compliments: {
			"anytime" : [
				"<i class=\"fa fa-thumbs-up\"></i> Hello sexy thing!",
				"<i class=\"fa fa-thumbs-up\"></i> You looking great"
			],
			"morning" : [
				"<i class=\"fa fa-mug-hot\"></i> Good morning"
			],
			"noon" : [
				"<i class=\"fa fa-thumbs-up\"></i> Hava a good day"
			],
			"afternoon" : [
				"<i class=\"fa fa-thumbs-up\"></i> Good afternoon"
			],
			"evening" : [
				"<i class=\"fa fa-thumbs-up\"></i> Good evening"
			],
			"night" : [
				"<i class=\"fa fa-bed\"></i> Good night"
			],
			"midnight" : [
				"<i class=\"fa fa-bed\"></i> Why you don't sleep?"
			],
			"day_sunny" : [
				"<i class=\"wi wi-day-sunny\"></i> Sunny"
			],
			"day_cloudy" : [
				"<i class=\"wi wi-day-cloudy\"></i> Cloudy",
			],
			"cloudy" : [
				"<i class=\"wi wi-cloudy\"></i> Cloudy"
			],
			"day-cloudy_windy" : [
				"<i class=\"wi wi-day-cloudy-windy\"></i> Cloudy windy"
			],
			"day-showers" : [
				"<i class=\"wi wi-day-showers\"></i> Rain shower"
			],
			"day-rain" : [
				"<i class=\"wi wi-day-rain\"></i> Raining"
			],
			"day-thunderstorm" : [
				"<i class=\"wi wi-day-thunderstorm\"></i> Thunderstorm"
			],
			"day-snow" : [
				"<i class=\"wi wi-day-snow\"></i> Snowing"
			],
			"day-fog" : [
				"<i class=\"wi wi-day-fog\"></i> It's Fog"
			],
			"night_clear" : [
				"<i class=\"wi wi-night-clear\"></i> Clear night"
			],
			"night_cloudy" : [
				"<i class=\"wi wi-night-cloudy\"></i> Night cludy"
			],
			"night_showers" : [
				"<i class=\"wi wi-night-showers\"></i> Night showers"
			],
			"night_rain" : [
				"<i class=\"wi wi-night-rain\"></i> Raining night"
			],
			"night_thunderstorm" : [
				"<i class=\"wi wi-night-thunderstorm\"></i> Thunderstorm night"
			],
			"night_snow" : [
				"<i class=\"wi wi-night-snow\"></i> Snowing night"
			],
			"night_alt_cloudy_windy" : [
				"<i class=\"wi wi-night-cloudy-windy\"></i> Night clouds and wind"
			], 
			"25-12-...." : [
				"<i class=\"fa fa-snowman\"></i> Marry Christmas!"
			],
			"01-01-....": [
				function() {return "<i class=\"fa fa-glass-cheers\"></i> Happy New Year! " + moment().format("YYYY")}
			],
			"..-..-....": [
				function() {return moment().locale(config.language).format("dddd, D MMMM")}
				// https://forum.magicmirror.builders/topic/13332/reloading-config-defaults-or-module
			],
		}
	},

	lastIndexUsed: -1,
	// Set currentweather from module
	currentWeatherType: "currentweather",

	getScripts: function() {
		return ["moment.js", "moment-timezone.js"];
	},

	getStyles: function () {
		return ["compliments_plus.css", "font-awesome.css", "weather-icons.css"];
	},
	
	start: function () {
		Log.info("Starting module: " + this.name);

		this.lastComplimentIndex = -1;

		var self = this;
		if (this.config.remoteFile !== null) {
			this.complimentFile(function (response) {
				self.config.compliments = JSON.parse(response);
				self.updateDom();
			});
		}

		// Schedule update timer.
		setInterval(function () {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	/* randomIndex(compliments)
	 * Generate a random index for a list of compliments.
	 *
	 * argument compliments Array<String> - Array with compliments.
	 *
	 * return Number - Random index.
	 */
	randomIndex: function (compliments) {
		if (compliments.length === 1) {
			return 0;
		}

		var generate = function () {
			return Math.floor(Math.random() * compliments.length);
		};

		var complimentIndex = generate();

		while (complimentIndex === this.lastComplimentIndex) {
			complimentIndex = generate();
		}

		this.lastComplimentIndex = complimentIndex;

		return complimentIndex;
	},

	/* complimentArray()
	 * Retrieve an array of compliments for the time of the day.
	 *
	 * return compliments Array<String> - Array with compliments for the time of the day.
	 */
	complimentArray: function () {
		var hour = moment().hour();
		var date = this.config.mockDate ? this.config.mockDate : moment().format("DD-MM-YYYY");
		var compliments;

		if (hour >= this.config.morning && hour < this.config.noon && this.config.compliments.morning) {
			compliments = this.config.compliments.morning.slice(0);
		} else	if (hour >= this.config.noon && hour < this.config.afternoon && this.config.compliments.noon) {
			compliments = this.config.compliments.noon.slice(0);
		} else	if (hour >= this.config.afternoon && hour < this.config.evening && this.config.compliments.afternoon) {
			compliments = this.config.compliments.afternoon.slice(0);
		} else	if (hour >= this.config.evening && hour < this.config.night && this.config.compliments.evening) {
			compliments = this.config.compliments.evening.slice(0);
		} else	if (hour >= this.config.night && hour < this.config.midnight && this.config.compliments.night) {
			compliments = this.config.compliments.night.slice(0);
		} else if (hour >= this.config.midnight && hour < this.config.morning && this.config.compliments.midnight) {
			compliments = this.config.compliments.midnight.slice(0);
		}

		if (typeof compliments === "undefined") {
			compliments = new Array();
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

	/* complimentFile(callback)
	 * Retrieve a file from the local filesystem
	 */
	complimentFile: function (callback) {
		var xobj = new XMLHttpRequest(),
			isRemote = this.config.remoteFile.indexOf("http://") === 0 || this.config.remoteFile.indexOf("https://") === 0,
			path = isRemote ? this.config.remoteFile : this.file(this.config.remoteFile);
		xobj.overrideMimeType("application/json");
		xobj.open("GET", path, true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState === 4 && xobj.status === 200) {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	},

	/* complimentArray()
	 * Retrieve a random compliment.
	 *
	 * return compliment string - A compliment.
	 */
	randomCompliment: function () {
		// get the current time of day compliments list
		var compliments = this.complimentArray();
		// variable for index to next message to display
		var index = 0;
		// are we randomizing
		if (this.config.random) {
			// yes
			index = this.randomIndex(compliments);
		} else {
			// no, sequential
			// if doing sequential, don't fall off the end
			index = this.lastIndexUsed >= compliments.length - 1 ? 0 : ++this.lastIndexUsed;
		}

		// https://forum.magicmirror.builders/topic/13332/reloading-config-defaults-or-module
		// this function calculate a value and get the string to display
		var f = compliments[index];
		if (typeof f == "function") f = f();
		return f || "";
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";
		// get the compliment text
		var complimentText = this.randomCompliment();
		// split it into parts on newline text
		var parts = complimentText.split("\n");
		// create a span to hold it all
		var compliment = document.createElement("span");
		// process all the parts of the compliment text
		for (var i = 0; i < parts.length; i++) {
			part = parts[i];
			// create a text element for each part
			compliment.appendChild(document.createTextNode(part));
			// add a break `
			compliment.appendChild(document.createElement("BR"));
		}
		// remove the last break
		compliment.lastElementChild.remove();
		compliment.innerHTML = complimentText;
		wrapper.appendChild(compliment);

		return wrapper;
	},

	// From data currentweather set weather type
	setCurrentWeatherType: function (data) {
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

	// Override notification handler.
	notificationReceived: function (notification, payload, sender) {
		if (notification === "CURRENTWEATHER_DATA") {
			this.setCurrentWeatherType(payload.data);
		}
	}
});