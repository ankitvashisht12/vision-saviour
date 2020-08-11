console.log("popus js ready!");
Boolean PLAY = true;
document.getElementById("reset-btn").addEventListener("click", resetTimer);
function resetTimer() {
    document.getElementById("timer-min").innerHTML = '20';
    document.getElementById("timer-sec").innerHTML = '00';
}

document.getElementById("play-pause-btn").addEventListener("click", () => {

	if(i % 2 == 0){
		i+=1;
		playtime();
	}else {
		i = 0;
		stoptime();
	}

    const countdownMin = document.getElementById("timer-min");
    const countdownSec = document.getElementById("timer-sec");

	const startingMin = document.getElementById("screen-time").value;
	let time = 1 * 60;
	console.log(time);

	while( time >= 0){
		setInterval(updateCountdown, 1000);
	}
	
	
	

    function updateCountdown() {
        const mintues = Math.floor(time / 60);
        let seconds = time % 60;
		seconds = seconds < 10 ? '0'+seconds : seconds;
        countdownMin.innerHTML = mintues;
        countdownSec.innerHTML = seconds;
        time--;
    }
});

function playtime(){

}

function stoptime(){

}