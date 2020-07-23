# compliments_plus
More day and night compliments for MagicMirror 2

Make some modification on default module or use this one as 3rd party, but do not replace the default, just add <i>disable: true</i> in config.js

First add in config.js or in compliments.js on defaults{}:

		midnightStartTime: 24, // do not change
		midnightEndTime: 0, // do not change

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

then on <i>complimentsArray function</i>

		var compliments; 
		var hour = moment().format("k");
		var date = this.config.mockDate ? this.config.mockDate : moment().format('DD-MM-YYYY');

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

and add your own compliments

For use this one add in config.js and ajust config to your needs

		{
			module: "compliments_plus",
			disabled: false,
			config: {
				updateInterval: 30000,
				remoteFile: null,
				fadeSpeed: 4000,
				random: true,
				mockDate: null,
				classes: "thin large pre-line skyblue",
				midnightStartTime: 24, // do not change
				midnightEndTime: 0, // do not change

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
						"You looking great",
						function(){return moment().locale("en").format("dddd, D MMMM")}
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
						"Cloudy"
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
						"Rain"
					],
					thunderstorm : [
						"Thunderstorm"
					],
					snow : [
						"Snow"
					],
					fog : [
						"Fog"
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
						"Marry Christmas"
					],
					"01-01-...." : [
						"Happy New year! + moment().format("YYYY")"
					],
				}
			}
		},
