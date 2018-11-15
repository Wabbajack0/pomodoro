let playPause = document.querySelector("#play-pause");
let stop = document.querySelector("#stop");
let timer = document.querySelector("#timer");
let upArrow = document.querySelector("#up");
let downArrow = document.querySelector("#down");
let switchButton = document.querySelector("#switch");
let topText = document.querySelector(".announcer");

let defaultMinutes = 25;
let minutes = defaultMinutes;
let seconds = 0;
let inter;
rest = false;
updateTimer();

upArrow.addEventListener("click", () => {
  defaultMinutes += 5;
  updateTimer();
});
downArrow.addEventListener("click", () => {
  if (defaultMinutes >= 5) {
    defaultMinutes -= 5;
  }
  updateTimer();
});
playPause.addEventListener("click", startCountdown);
stop.addEventListener("click", stopCountdown);
switchButton.addEventListener("click", goToBreak);
switchButton.innerHTML = "Take a break";

function startCountdown() {
  playPause.innerHTML = "<i class=\"fas fa-pause\"></i>";
  playPause.removeEventListener("click", startCountdown);
  playPause.addEventListener("click", pauseCountdown);
  countdown();
}

function pauseCountdown() {
  playPause.innerHTML = "<i class=\"fas fa-play\"></i>";
  playPause.removeEventListener("click", pauseCountdown);
  playPause.addEventListener("click", startCountdown);
  clearInterval(inter);
}

function stopCountdown() {
  playPause.innerHTML = "<i class=\"fas fa-play\"></i>";
  playPause.removeEventListener("click", pauseCountdown);
  playPause.addEventListener("click", startCountdown);
  clearInterval(inter)
  minutes = defaultMinutes;
  seconds = 0;
  updateTimer();
}

function countdown() {
  inter = setInterval(() => {
    if (minutes == 0 && seconds == 0) {
      goToBreak();
    } else {
      if (seconds != 0) {
        seconds -= 1;
      } else {
        seconds = 59;
        minutes -= 1;
      }
      if (minutes >= 10 && seconds >= 10) {
        timer.innerHTML = "" + minutes + ":" + seconds;
      } else if (minutes < 10 && seconds >= 10) {
        timer.innerHTML = "0" + minutes + ":" + seconds;
      } else if (minutes >= 10 && seconds < 10) {
        timer.innerHTML = "" + minutes + ":0" + seconds;
      } else {
        timer.innerHTML = "0" + minutes + ":0" + seconds;
      }
    }
  }, 1000);
}

function updateTimer() {
  minutes = defaultMinutes;
  seconds = 0;
  if (defaultMinutes >= 10) {
    timer.innerHTML = "" + defaultMinutes + ":00";
  } else {
    timer.innerHTML = "0" + defaultMinutes + ":00";
  }
}

function goToBreak() {
  if (rest) {
    switchButton.innerHTML = "Take a break";
    topText.innerHTML = "WORK";
    defaultMinutes = 25;
    updateTimer();
    rest = false;
  } else {
    switchButton.innerHTML = "Resume work";
    topText.innerHTML = "BREAK";
    defaultMinutes = 5;
    updateTimer();
    rest = true;
  }
}