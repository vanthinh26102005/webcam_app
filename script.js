 /**
    Input:
        - The user accesses the web page and requests access to their webcam.
        - The user interacts with the toggle button to turn the camera on or off.
        
    Process:
        - The program requests access to the user's camera using `getUserMedia()`.
         - The webcam stream is displayed in the video element.
          - The button's click event toggles the webcam on/off.
         
    Output:
          - The webcam stream is displayed to the user.
          - The button label changes dynamically to "Turn On Camera" or "Turn Off Camera".
    */

// Getting references to DOM elements (video and button)
const videoElement = document.getElementById('webcam');// Input: Video element to display webcam feed
const toggleBtn = document.getElementById('toggle-btn');// Input: Button to toggle the camera

let stream; // variable to hold the webcam stream - global to manage start/stop;

// Function to start the webcam
async function startWebcam() {
    try {
        // request webcam video stream by using the browser API (getUserMedia)
        stream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Process: assign the video stream to the video element
        // output: webcam display
        videoElement.srcObject = stream; // assign the webcam stream to the <video> element, allowing the webcam feed to be displayed on the webpage.

        console.log("webcam started succesfully!");
    }
    catch (error) {
        //handle error (ex: if user denies webcam access)
        console.error('error accessing webcam', error);
    }
}

//Functio to stop the webcam
function stopWebcam() {
    if(stream) {
        // get all tracks from the stream usually only video
        const tracks =stream.getTracks();

        // stop each track ( for turn off the camera)
        tracks.forEach(track => track.stop());//This stops the webcam feed and releases the camera

        //clear the video element's source to stop showing the webcam feed
        videoElement.srcObject = null;

        console.log('webcam stopped');

    }
}

// toggle btn for btn on/off camera
let isCameraOn = true; // default is on when load page
toggleBtn.addEventListener('click', () => {
    // Confirmation message before performing action
    const userConfirmed = confirm(isCameraOn ? "Are you sure you want to turn off the webcam?" : "Are you sure you want to turn on the webcam?");
    if(userConfirmed) {

    if(isCameraOn) {
        // if it's already ON, then turn it off
        stopWebcam(); //process: stop the cam, 
        toggleBtn.textContent = 'Turn on Camera'; // update toggletbn label
    }
    else {
        //if it off, so turn it on
        startWebcam(); //process : start the cam
        toggleBtn.textContent = 'Turn off Camera';// update toggletbn label
    }
    // toggle the state between on and off
    isCameraOn =!isCameraOn; // because when we click if off the state will be into ON and opposite;
    // Alert message after performing the action
    alert(isCameraOn ? 'Webcam is now turned on.' : 'Webcam is now turned off.');
    }
});

startWebcam(); //default;