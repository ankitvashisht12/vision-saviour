// Counter Logic

chrome.runtime.onMessage.addListener(
	function(response, sender, sendResponse) {
		if(response.running == true){
			
		}else if(response.running == false){

		}
});


var screenInterval, breakInterval;
chrome.storage.sync.get(['start_screen_time', 'start_break_time', 'screen_time', 'break_time', 'show_notification', 'play_sound'], function(res){
	startScreenCountDown(res);
});

function startScreenCountDown(res){

	const startingMin = res.start_screen_time;
	let time = 1 * 60; // change time here;

	screenInterval = setInterval(() => {
		
		if(time == 0){
			chrome.notifications.create("Break Start Notification", {
				type: "basic",
				iconUrl: "icon_128.png",
				title: "Break Time Starts",
				"message": "Take atleast 20 seconds break. See 20 feet distant."

			});
			clearInterval(screenInterval);
			chrome.runtime.sendMessage({screen_min : startingMin, screen_sec : '00'});
			startBreakCountdown(res);
		}
		
		const mintues = Math.floor(time / 60);
		let seconds = time % 60;
		seconds = seconds < 10 ? '0'+seconds : seconds;

		chrome.storage.sync.set({'screen_time': parseInt(mintues), 'screen_time_sec': parseInt(seconds)});
		console.log("MINUTE "+mintues+" SECONDS "+seconds);

		chrome.runtime.sendMessage({screen_min : mintues.toString(), screen_sec : seconds.toString()});
		time--;
	}, 1000);
}


function startBreakCountdown(res){
	
	let breakTime = res.start_break_time;
	const startBreakTime = res.start_break_time;
	
	breakInterval = setInterval( ()=>{
		if(breakTime == 0){
			chrome.notifications.create("Break End Notification", {
				type: "basic",
				iconUrl: "icon_128.png",
				title: "Screen Time Starts",
				"message": "You can resume your work now."

			});
			clearInterval(breakInterval);
			chrome.runtime.sendMessage({break_sec : startBreakTime});
			startScreenCountDown(res);
		}
		let seconds = breakTime % 60;
		seconds = seconds < 10 ? '0'+seconds : seconds;
		chrome.storage.sync.set({'break_time': parseInt(seconds)});
		console.log("BREAK TIME : 00:"+seconds);
	
		chrome.runtime.sendMessage({break_sec : seconds.toString()});
		breakTime--;

	}, 1000);
}
