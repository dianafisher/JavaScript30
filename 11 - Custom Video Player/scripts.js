/* 1.  Get our elements */

const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]'); // attribute selector.
const ranges = document.querySelectorAll('.player__slider');
const fullscreen = document.querySelector('.fullscreen');

/* 2.  Build our functions. */

function togglePlay() {

    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }

    // Same thing, but different syntax..
    const method = video.paused ? 'play' : 'pause';
    video[method]();

    
}

function updateButton() {
    // 'this' is bound to the video itself.
    console.log(this);
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log(icon);
    console.log('update the button');
}

function skip() {    
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {    
    console.log(this.value);
    console.log(this.name);

    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;  //offsetWidth will give us the entire width of the bar.
    video.currentTime = scrubTime;
    console.log(e);
}

function handleFullscreen(e) {
    console.log(e);
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
        

}

/* 3.  Hook up event listeners */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;

progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', scrub);

// progress.addEventListener('mousemove', () => {
//     if(mousedown) {
//         scrub();
//     }
// });

progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', handleFullscreen);

