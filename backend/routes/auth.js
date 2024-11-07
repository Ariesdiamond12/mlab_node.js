const express = require("express");
const cors = require("cors");
const app = express();


const {
  addNewUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/db");
const router = express.Router();

const corsOptions = {
  origin: "http://localhost:5173", // Update with your frontend's URL if different
  methods: "GET,POST,PUT,DELETE", // Allowed methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

app.use(cors(corsOptions));

router.post("/addUser", addNewUser);
router.get("/getUser", getUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
