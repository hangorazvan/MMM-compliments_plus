# compliments_plus
More day periods options for MagicMirror 2 compliments module

first add in config:

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
		nightEndTime: 24,
		night2StartTime: 0,
		night2EndTime: 2,

then on complimentsArray function

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
