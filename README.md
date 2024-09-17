# Video Chat App

## Overview
This project involves a peer-to-peer video chat application using [PeerJS](https://peerjs.com/) and [Socket.io](https://socket.io/). It enables users to connect, make video calls, and interact in real-time.

## Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PeerJS](https://peerjs.com/) server running on port 3001

### Installation
1. **Clone the Repository**: `git clone [<repository-url>](https://github.com/Gderhy/Video_chat_app/) && cd Video_chat_app`
2. **Install Dependencies**: `npm install`

### Running the Application
1. **Start the PeerJS Server**: Open a terminal and run `npm run peerjs`
2. **Start the ExpressJS Server**: Open another terminal and run `npm run start`

### Running the application in the Development Server
1. **Start the Development Server**: In a separate terminal, run `npm run devStart_both` to start both the backend and frontend development servers.

Note you can also you run in dev mode by calling other scripts

### Configuration
- **PeerJS Server**: Configured to run on port 3001.
- **Socket.io**: Handles real-time messaging between clients.

### Code Structure
- **`index.html`**: Main HTML file for the application.
- **`styles.css`**: CSS file for styling the application.
- **`app.js`**: JavaScript file handling the application logic and peer connections.
- **`server.js`**: Backend server setup using Node.js and Socket.io.

### Contributing
If you'd like to contribute to this project, please fork the repository and submit a pull request. Make sure to follow the coding guidelines and include tests with your changes.

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
