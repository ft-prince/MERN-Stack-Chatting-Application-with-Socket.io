
# MERN Stack Chatting Application with Socket.io

## Overview

This project is a real-time chatting application built using the MERN stack (MongoDB, Express.js, React, and Node.js) along with Socket.io for seamless, bidirectional communication. It provides a robust foundation for creating chat-based applications with real-time features.

## Features

- **Real-time Communication**: Utilizes Socket.io for instant messaging and updates.
- **User Authentication**: Secure user authentication using JWT (JSON Web Tokens).
- **Message History**: Persists chat history in MongoDB for a seamless experience.
- **Responsive Design**: User-friendly interface accessible on various devices.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mern-chat-app.git
   cd mern-chat-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following variables:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
   MONGO_URI=mongodb://localhost:27017/boba-chatting
   SECRET_KEY=your-secret-key
   ```

   Replace `your-secret-key` with your desired secret key.

4. Run the application:

   ```bash
   npm run dev
   ```

   This will start both the server and the React app concurrently.

5. Open your browser and navigate to `http://localhost:3000` to use the application.

## Folder Structure

- `/client`: React frontend code.
- `/server`: Node.js backend code.
- `/shared`: Shared code between frontend and backend.

## Technologies Used

- **Frontend**:
  - React
  - Socket.io-client
  - Axios

- **Backend**:
  - Node.js
  - Express.js
  - Socket.io
  - MongoDB (mongoose)

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to the [Socket.io](https://socket.io/) team for their powerful real-time library.
- Inspiration from [Example Chat App](https://github.com/socketio/socket.io/tree/main/examples/chat) by Socket.io.

## Contact

For any inquiries or issues, please contact ft.princeee@gmail.com 
