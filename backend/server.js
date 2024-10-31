const express = require('express');
const router = require('./routes/auth');
const bodyParser = require('body-parser')
const app = express();
const port  = 3000;

app.use (express.json());
app.use(router);
app.use(bodyParser.json)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
