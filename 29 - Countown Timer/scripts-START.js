let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]'); // select all with a 'data-time' attribute

function timer(seconds){
    // on iOS, when you scroll all of your setInterval() functions will pause
    // setInterval(function() {
    //     seconds--;
    // }, 1000);

    // clear any existing timers
    clearInterval(countdown);

    // get the current timestamp in milliseconds
    const now = Date.now();
    const then = now + seconds * 1000;    
    console.log({now, then});

    displayTimeLeft(seconds);
    displayEndTime(then);

    // Display the amount of time left every second.
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        
        // check if we need to stop..
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        // display it
        displayTimeLeft(secondsLeft);

    }, 1000);
}

function displayTimeLeft(seconds) {
    // convert seconds to minutes and seconds
    const minutes = Math.floor(seconds / 60);    
    const remainingSeconds = seconds % 60;

    console.log({minutes, remainingSeconds});

    const display = `${minutes}:${remainingSeconds < 10 ? '0': ''}${remainingSeconds}`;
    timerDisplay.textContent = display;

    document.title = display;
}

function displayEndTime(timestamp) {
    // convert timestamp to a Date
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    // endTime.textContent = `Be Back At ${hour}:${minutes}`;
    endTime.textContent = `Be Back At ${hour > 12 ? hour-12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    console.log(this.dataset.time);
    const seconds = parseInt(this.dataset.time);
    console.log(seconds);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // get the value entered
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    // clear the value out of the form.
    this.reset();
});