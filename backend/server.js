const http =  require('http');
const express = require('express');
const port  = 3000;


const server  = http.createServer((req, res) => {
    console.log('Request made')
})

server.listen(port, 'localhost', () => {
    console.log('Listening for request on port 3000');
    
})
