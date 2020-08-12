// Counter Logic
var screenInterval, breakInterval;
chrome.runtime.onMessage.addListener(
	function(response, sender, sendResponse) {
		if(response.running == true){
			startScreenCountDown(response);
		}else if(response.running == false){
			clearInterval(screenInterval);
			clearInterval(breakInterval);
		}
});


function startScreenCountDown(res){
	const startingMin = res.start_screen_time;
	let time = startingMin * 60; 
	screenInterval = setInterval(() => {
		
		if(time == 0){

			if(res.show_notification){
				chrome.notifications.create("Break Start Notification", {
					type: "basic",
					iconUrl: "icon_128.png",
					title: "Break Time Starts",
					"message": "Take atleast 20 seconds break and look atleast 20 feet away."
	
				});
			}
			
			if(res.play_sound){
				var audio  = new Audio('sounds/ding.mp3');
				audio.play();
			}
			
			clearInterval(screenInterval);
			chrome.runtime.sendMessage({screen_min : startingMin, screen_sec : '00'});
			startBreakCountdown(res);
		}
		
		const mintues = Math.floor(time / 60);
		let seconds = time % 60;
		seconds = seconds < 10 ? '0'+seconds : seconds;

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

			if(res.show_notification){
				chrome.notifications.create("Break End Notification", {
					type: "basic",
					iconUrl: "icon_128.png",
					title: "Screen Time Starts",
					"message": "You can use screen now."
	
				});
			}
			
			if(res.play_sound){
				var audio  = new Audio('sounds/ding.mp3');
				audio.play();
			}
			
			clearInterval(breakInterval);
			chrome.runtime.sendMessage({break_sec : startBreakTime});
			startScreenCountDown(res);
		}
		let seconds = breakTime % 60;
		seconds = seconds < 10 ? '0'+seconds : seconds;
		
		console.log("BREAK TIME : 00:"+seconds);
	
		chrome.runtime.sendMessage({break_sec : seconds.toString()});
		breakTime--;

	}, 1000);
}
