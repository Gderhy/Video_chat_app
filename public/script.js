const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});





const peers = {}

const myVideo = document.createElement("video");
myVideo.muted = true;

// Function to add a video stream to the HTML
function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}

async function initializePeer() {
  try{
    // Get Local video and audio stream 
    const myStream = await navigator.mediaDevices.getUserMedia({
      video:true,
      audio:true
    });

    // Show your own video
    addVideoStream(myVideo, myStream)

    // Respond to incoming calls
    myPeer.on('call', call => {
      
      call.answer(myStream) // Answer the call with your local Stream
      const remoteVideo = document.createElement('video')
      
      call.on('stream', remoteVideoStream => {
        // When receiving the remote video stream, display it
        addVideoStream(remoteVideo, remoteVideoStream)
      });
    });

    // Handle connection to new user
    socket.on('user-connected', userId => {
      console.log("user-connected: ", userId);            
      connectToNewUser(userId, myStream)
    })
    socket.on('user-disconnected', userId => {
      if (peers[userId]) peers[userId].close(); 
    })
  } catch (e) {
    console.error(e);
  }
}

// Function to call a new user
function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);  // Call the new user
  const video = document.createElement('video');
  
  call.on('stream', userVideoStream => {
    // Display the remote user's video stream
    addVideoStream(video, userVideoStream);
  });

  call.on('close', () => {
    console.log("close");
    video.remove()
  })


  peers[userId] = call
}

// Handle the peer connection open event
myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
});

// Call the async function to initialize the peer connection
initializePeer()
