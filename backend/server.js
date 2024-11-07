const express = require("express");
const router = require("./routes/auth");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Update with your frontend's URL if different
  methods: "GET,POST,PUT,DELETE", // Allowed methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
app.use(bodyParser.json);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
