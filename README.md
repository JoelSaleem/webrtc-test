# webrtc-test

Web chat (minus sound for now -- wip) via browser using Peer and express with ejs.

## To start
1. open two terminal windows in the root of the project.
2. In one terminal, run `yarn dev`. This will start an express server and server the static files on localhost:3000.
3. In a second terminal run `yarn peer`. This will open the peerjs client on localhost:3001.
4. Navigate a browser to localhost:3000. You will be redirected to a unique room, localhost:3000/<room-id>
5. Navigate a second browser to localhost:3000/<room-id> -- be sure to use the same room id as in the first browser.
6. You should see your video on both screens.

### TODO:
only mute your own video, and listen to others. The problem is, when opening two local browser windows, you get sound from both windows and therefore get experience positive feedback. Solution -- probably mute all video when tab is not in focus.
