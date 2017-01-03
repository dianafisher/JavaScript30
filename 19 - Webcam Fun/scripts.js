const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// get the video
function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
    })
    .catch(err => {
        console.error('Oh NO!!', err);
    });
}

// paint video to the canvas
function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    console.log(width, height);
    canvas.width = width;
    canvas.height = height;

    // take an image from the web cam
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        // get the pixel data
        let pixels = ctx.getImageData(0, 0, width, height);
        // apply effects..
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);

        // apply a ghosting effect
        // ctx.globalAlpha = 0.1;

        // put pixels back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

// take a photo
function takePhoto() {
    // play the sound
    snap.currentTime = 0;
    snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    // console.log(data);
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    // link.textContent = 'Download Image';
    link.innerHTML = `<img src ="${data}" alt="Handsome Photo" />`;

    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i+0] = pixels.data[i+0] + 100; // red
        pixels.data[i+1] = pixels.data[i+1] - 50;// green
        pixels.data[i+2] = pixels.data[i+2] * 0.5;// blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i+0]; // red
        pixels.data[i + 500] = pixels.data[i+1];// green
        pixels.data[i - 550] = pixels.data[i+2];// blue
    }
    return pixels;
}

function greenScreen(pixels) {
    
}

getVideo();

video.addEventListener('canplay', paintToCanvas);