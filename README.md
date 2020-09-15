# compliments_plus
More day and night compliments for MagicMirror 2

Do not make modification and do not replace the default, just add <i>disable: true</i> in config.js and use this one as 3rd party,

	{
		module: "compliments",
		position: "lower_third",
		disable: true
	}

For use this one add in config.js and ajust config to your needs

	{
		module: "compliments_plus",
		position: "lower_third",
		disable: false,
		config: {
			updateInterval: 30000,
			remoteFile: null,
			fadeSpeed: 4000,
			random: true,
			mockDate: null,
			classes: "thin large pre-line skyblue",

			morning: 5,
			noon: 12,
			afternoon: 15,
			evening: 18,
			night: 22,
			midnight: 1,

			compliments: {
				anytime : [
					"Hello sexy thing!",
					"You looking great"
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
				midnight : [
					"Why you don't sleep?"
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
					function() {return "Happy New Year! " + moment().format("YYYY")}
				],
				"..-..-....": [
					function() {return moment().locale("en").format("dddd, D MMMM")}
					// https://forum.magicmirror.builders/topic/13332/reloading-config-defaults-or-module
				],
			}
		},