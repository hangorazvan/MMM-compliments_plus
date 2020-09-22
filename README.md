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
			classes: "thin large pre-line",

	//	the beginning of the period of the day

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
					"Why you don't sleep?"
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
