const socket = io("/");
const videoGrid = document.getElementById("video-grid");

const peers = {};

// Connect with other clients in room
const myPeer = new Peer(undefined, {
  host: "/",
  port: 3001,
});
myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

const myVideo = document.createElement("video");
myVideo.muted = true;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    myPeer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      video.muted = true;
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

socket.on("user-disconnected", (userId) => {
  if (userId in peers) {
    peers[userId].close();
    delete peers[userId];
  }
});

const connectToNewUser = (userId, stream) => {
  const call = myPeer.call(userId, stream);
  const video = document.createElement("video");
  video.muted = true;

  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });

  call.on("close", () => {
    video.remove();
  });

  peers[userId] = call;
};

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};
