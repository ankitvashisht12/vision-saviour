

// reset logic
// document.getElementById("reset-btn").addEventListener("click", reset);

function reset(){
    document.getElementById("screen-timer-min").innerHTML = '_ _';
	document.getElementById("screen-timer-sec").innerHTML = '_ _';
	document.getElementById("break-timer-sec").innerHTML = '_ _';


	chrome.storage.sync.get(['start_screen_time', 'start_break_time','screen_time', 'screen_time_sec', 'break_time', 'show_notification', 'play_sound', 'running'], function(obj){
		if(obj.start_screen_time){
			chrome.storage.sync.set({'start_screen_time': obj.start_screen_time});
		}else{
			chrome.storage.sync.set({'start_screen_time': 20});
		}

		if(obj.start_break_time){
			chrome.storage.sync.set({'start_break_time': obj.start_break_time});
		}else{
			chrome.storage.sync.set({'start_screen_time': 20});
		}

		if(obj.screen_time){
			chrome.storage.sync.set({'screen_time': obj.screen_time});
		}else{
			chrome.storage.sync.set({'screen_time': 20});
		}

		if(obj.screen_time_sec){
			chrome.storage.sync.set({'screen_time_sec': obj.screen_time_sec});
		}else{
			chrome.storage.sync.set({'screen_time_sec': 00});
		}

		if(obj.break_time){
			chrome.storage.sync.set({'break_time': obj.break_time});
		}else{
			chrome.storage.sync.set({'break_time': 20});
		}

		if(obj.show_notification){
			chrome.storage.sync.set({'show_notification': obj.show_notification});
		}else{
			chrome.storage.sync.set({'show_notification': true});
		}

		if(obj.play_sound){
			chrome.storage.sync.set({'play_sound': obj.play_sound});
		}else{
			chrome.storage.sync.set({'play_sound': true});
		}


	});
	
	// chrome.storage.sync.set({'start_screen_time' : 20, 'start_break_time': 20, 'screen_time': 20, 'screen_time_sec': 0, 'break_time': 20, 'show_notification': true, 'play_sound': true});
};


// show data persistently when user open popup
chrome.storage.sync.get(['start_break_time', 'start_screen_time','show_notification', 'play_sound', 'running'], function(obj){
	console.log(obj);
	if(obj.start_screen_time){
		document.getElementById("screen-time").value = (obj.start_screen_time).toString();
	}

	if(obj.start_break_time){
		document.getElementById("break-time").value = (obj.start_break_time).toString();
	}

	if(obj.show_notification){
		document.getElementById("show-notification").checked = true;
	}

	if(obj.play_sound){
		document.getElementById("play-sound").checked = true;
	}

	if(obj.running){
		document.getElementById('play-btn').style.display = 'none';
		document.getElementById('stop-btn').style.display = 'inline';
	}

});


// runtime onMessage event listener -- timer update
chrome.runtime.onMessage.addListener(
	function(obj, sender, sendResponse) {
		if(obj.screen_min){
			document.getElementById("screen-timer-min").innerHTML = obj.screen_min;
			document.getElementById("screen-timer-sec").innerHTML = obj.screen_sec;
		}else{
			document.getElementById("break-timer-sec").innerHTML = obj.break_sec;
		}
});


// event listener on screen-time input
document.getElementById("screen-time").addEventListener("change", ()=>{
	chrome.storage.sync.get(['running'], function(obj){
		if(obj.running == false){
			
			var getScreenTime = document.getElementById("screen-time").value;
			document.getElementById("screen-timer-min").innerHTML = getScreenTime;
			chrome.storage.sync.set({'screen_time': parseInt(getScreenTime)});
			chrome.storage.sync.set({'start_screen_time': parseInt(getScreenTime)});
		}
	});
	
});


// event listener on break time 
document.getElementById("break-time").addEventListener("change", ()=>{
	chrome.storage.sync.get(['running'], function(obj){
		if(obj.running == false){
			
			var getBreakTime = document.getElementById("break-time").value;
			document.getElementById("break-timer-sec").innerHTML = getBreakTime; 
			chrome.storage.sync.set({'break_time': parseInt(getBreakTime)});
			chrome.storage.sync.set({'start_break_time': parseInt(getBreakTime)});
		}
	});
});


// event listener on show notification input
document.getElementById("show-notification").addEventListener("change", ()=>{
	var show_notification_checkbox = document.getElementById("show-notification");
	if(show_notification_checkbox.checked){
		chrome.storage.sync.set({'show_notification':true});
	}else{
		chrome.storage.sync.set({'show_notification':false});
	}
});

// event listener on play sound input
document.getElementById("play-sound").addEventListener("change", ()=>{
	var play_sound_checkbox = document.getElementById("play-sound");
	if(play_sound_checkbox.checked){
		chrome.storage.sync.set({'play_sound':true});
	}else{
		chrome.storage.sync.set({'play_sound':false});
	}
});



document.getElementById("play-btn").addEventListener('click', ()=>{
	document.getElementById('play-btn').style.display = 'none';
	document.getElementById('stop-btn').style.display = 'inline';
	chrome.storage.sync.set({'running':true});

	chrome.storage.sync.get(['start_screen_time', 'start_break_time','screen_time', 'screen_time_sec', 'break_time', 'show_notification', 'play_sound', 'running'], function(obj){
		chrome.runtime.sendMessage({
			start_screen_time: obj.start_screen_time,
			start_break_time: obj.start_break_time,
			screen_time : obj.screen_time,
			break_time : obj.break_time,
			show_notification: obj.show_notification,
			play_sound : obj.play_sound,
			running : obj.running
		});
	});
	
});

document.getElementById("stop-btn").addEventListener('click', ()=>{
	document.getElementById('play-btn').style.display = 'inline';
	document.getElementById('stop-btn').style.display = 'none';
	chrome.storage.sync.set({'running':false});

	chrome.runtime.sendMessage({running : false});
	reset();
});

// chrome.windows.onRemoved.addListener(reset);