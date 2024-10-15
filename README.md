# Basic Server

- In this repository I've created a basic server using Node.js. The server listens on port 3000
- It has a simple API endpoint to return a JSON response with a message.
- The server is ready to respond to incoming requests
- The server is also able to handle multiple requests concurrently using the built-in `http.createServer()`
- The server handle different HTTP methods (GET, POST, PUT, DELETE) and returns a 404 error for any other
- The server also handle errors and returns a 500 error for any internal server error.

# Installation Instructions

1. Clone the repository using `git clone https://github.com/Ariesdiamond12/mlab_node.js/tree/task-1
2. Navigate to the project directory using `cd basic-server
3. Install the required dependencies using `npm install
4. Start the server using `node server.js
5. Open a web browser and navigate to `http://localhost:3000/api/message` to
   see the JSON response.
