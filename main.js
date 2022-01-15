// use getUserMedia to put the camera stream into the video element

const video = document.querySelector('video');
const snap = document.querySelector('.snap');
const startCamera = document.querySelector('.start-camera');
const canvas = document.querySelector('.canvas');
const photo = document.querySelector('.photo');
const save = document.querySelector('.save');
const gallery = document.querySelector('.gallery');
const deck = document.querySelector('.deck');

let isCameraOn = false;
let currentImageDataUrl;
startCamera.addEventListener('click', async function() {
    if(!isCameraOn){
        try{
            let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            video.srcObject = stream;
            isCameraOn = true;
        }
        catch (e) {
            console.log('e',e);
        }
    }
    else{
        const tracks = video.srcObject.getTracks();
        tracks[0].stop();
        isCameraOn = false;
    }
    startCamera.innerHTML = isCameraOn ? 'Turn Off Camera' : 'Start Camera';
    isCameraOn ? snap.removeAttribute('disabled') :
        snap.setAttribute('disabled','true');

});

snap.addEventListener('click', function() {
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        currentImageDataUrl = canvas.toDataURL('image/jpeg');

        // data url of the image
        console.log(currentImageDataUrl);
});

save.addEventListener('click', function() {
    console.log('here', video, video.srcObject,currentImageDataUrl);
    if(video.srcObject){
        const newPhoto = document.createElement('img');
        newPhoto.src = currentImageDataUrl;
        gallery.appendChild(newPhoto);
    }

});



