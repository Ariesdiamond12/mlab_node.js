const express = require("express");
const { addNewUser, getUser, updateUser, deleteUser } = require("../controllers/db");
const router = express.Router();

router.post("/addUser", addNewUser);
router.get("/getUser", getUser);
router.put("/updateUser/:id", updateUser)
router.delete("/deleteUser/:id", deleteUser)


module.exports = router;
