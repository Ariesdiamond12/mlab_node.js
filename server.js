//1. Importing the HTTP server
const http = require('http'); 
//2. Initializing the server
const server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.end("Welcome to our home page");
    } else if(req.url === '/about'){
      res.end("Here is our short history")
    }else{
      res.end("Ohh! Page not found");
    }
  });
