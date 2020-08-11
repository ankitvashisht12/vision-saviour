
document.getElementById("reset-btn").addEventListener("click", reset);

function reset(){
    document.getElementById("screen-timer-min").innerHTML = '20';
	document.getElementById("screen-timer-sec").innerHTML = '00';
	document.getElementById("break-timer-sec").innerHTML = '20';

	chrome.storage.sync.set({'start_screen_time' : 20, 'start_break_time': 20, 'screen_time': 20, 'screen_time_sec': 0, 'break_time': 20, 'show_notification': true, 'play_sound': true});
	
};

chrome.storage.sync.get(['screen_time', 'screen_time_sec', 'break_time', 'show_notification', 'play_sound'], function(obj){
	
	if(obj.screen_time){
		document.getElementById("screen-timer-min").innerHTML = obj.screen_time	
	}

	if(obj.screen_time_sec){
		document.getElementById("screen-timer-sec").innerHTML = obj.screen_time_sec
	}

	if(obj.break_time){
		document.getElementById("break-timer-sec").innerHTML = obj.break_time
	}

	if(obj.show_notification){
		document.getElementById("show-notification").checked = true;
	}

	if(obj.play_sound){
		document.getElementById("play-sound").checked = true;
	}

});


chrome.runtime.onMessage.addListener(
	function(obj, sender, sendResponse) {
		if(obj.screen_min){
			document.getElementById("screen-timer-min").innerHTML = obj.screen_min;
			document.getElementById("screen-timer-sec").innerHTML = obj.screen_sec;
		}else{
			document.getElementById("break-timer-sec").innerHTML = obj.break_sec;
		}
});


document.getElementById("screen-time").addEventListener("change", ()=>{
	var getScreenTime = document.getElementById("screen-time").value;
	document.getElementById("screen-timer-min").innerHTML = getScreenTime;
	chrome.storage.sync.set({'screen_time': parseInt(getScreenTime)});
	chrome.storage.sync.set({'start_screen_time': parseInt(getScreenTime)});

	
});

document.getElementById("break-time").addEventListener("change", ()=>{
	var getBreakTime = document.getElementById("break-time").value;
	document.getElementById("break-timer-sec").innerHTML = getBreakTime; 
	chrome.storage.sync.set({'break_time': parseInt(getBreakTime)});
	chrome.storage.sync.set({'start_break_time': parseInt(getBreakTime)});

});

document.getElementById("show-notification").addEventListener("change", ()=>{
	var show_notification_checkbox = document.getElementById("show-notification");
	if(show_notification_checkbox.checked){
		chrome.storage.sync.set({'show_notification':true});
	}else{
		chrome.storage.sync.set({'show_notification':false});
	}
});

document.getElementById("play-sound").addEventListener("change", ()=>{
	var play_sound_checkbox = document.getElementById("play-sound");
	if(play_sound_checkbox.checked){
		chrome.storage.sync.set({'play_sound':true});
	}else{
		chrome.storage.sync.set({'play_sound':false});
	}
});

chrome.windows.onRemoved.addListener(reset);