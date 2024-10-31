const express = require("express");
const { addNewUser, getUser, updateUser } = require("../controllers/db");
const router = express.Router();

router.post("/addUser", addNewUser);
router.get("/getUser", getUser);
router.put("/updateUser/:id", updateUser)


module.exports = router;
