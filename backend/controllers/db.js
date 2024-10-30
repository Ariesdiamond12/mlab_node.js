const {collection, addDoc, updateDoc} = require("firebase/firestore");
const {db} =  require("../config/firebase")

const  addNewUser = async (req, res) => {
    const  {name, email, phone, id, image, position} = req.body;
    try {
        const  docRef = await addDoc(collection(db, "users"), {
            name,
            email,
            phone,
            id,
            image,
            position
        });
        res.json({message: "User added successfully", docRef});
        console.log("Document written with ID:", docRef.id);   
    }catch(e){
        console.error("Error adding document: ", e);
        res.status(500).json({error:  "Error adding document"});

    }

}

const updateUser  = async (req, res) => {
    const {id} = req.params; 
    const {name, email, phone, image, position} = req.body;
    try {
        const  userRef = db.collection("users").doc(id); 
        await updateDoc(userRef, {name,  email, phone, image, position});
        res.json({message: "User updated successfully"});
    }catch (e){
        console.error("Error updating document: ", e);
        res.status(500).json({
            error: "Error updating document",
            message: "Erro  updating document"

        })
    }
}

module.export = {addNewUser,updateUser }

