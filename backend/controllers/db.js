const {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} = require("firebase/firestore");

const { db } = require("../config/firebase");

const addNewUser = async (req, res) => {
  const { name, email, phone, userId, image, position } = req.body;
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name,
      email,
      phone,
      userId,
      image,
      position,
    });
    res.status(201).json({ message: "User added successfully", docRef });
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    res.status(500).json({ error: "Error adding document" });
  }
};

const getUser = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(users)
    res.status(200).json({
      message: "Users retrieved successfully",
      users: users,
    });
  } catch (e) {
    console.error("Error fetching users: ", e);
    res.status(500).json({
      message: "Error  fetching users",
      error: e.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, image, userId, position } = req.body;
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, { name, email, phone, image, userId, position });
    res.json({ message: "User updated successfully" });
  } catch (e) {
    console.error("Error updating document: ", e);
    res.status(500).json({
      error: "Error updating document",
      message: "Error  updating document",
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  
  try {
    const userRef = doc(db, "users", id);
    console.log(userRef);
    
    await deleteDoc(userRef);
    res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    console, error("Error deleting user document:", error);
    res.status(500).json({
      message: "Error deleting user document",
      error: error.message,
    });
  }
};

module.exports = { addNewUser, getUser, updateUser, deleteUser };
