const express = require("express");
const router = require("./routes/auth");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");
const app = express();
const port = 3000;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE", 
  allowedHeaders: "Content-Type,Authorization", 
};

const serviceAccount = require("./firebase/ServiceAccount.json");
// Initialize Firebase Admin with the service account key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${serviceAccount.project_id}.appspot.com`,
});

const db = admin.firestore();

app.use(cors(corsOptions));
app.use(express.json());

const addSuperAdminRole = async (email) => {
  try {
    const user = await admin.auth().getUserByEmail(email);

    await admin.auth().setCustomUserClaims(user.uid, { role: 'superAdmin' });

    console.log(`SuperAdmin role assigned to ${email}`);
  } catch (error) {
    console.error('Error assigning SuperAdmin role:', error);
  }
};

// Call the function with the user's email
addSuperAdminRole('tumisho.marokane@icloud.com');

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email , " ", password); 

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    if (
      userRecord.customClaims &&
      userRecord.customClaims.role === "superAdmin"
    ) {
      const customToken = await admin.auth().createCustomToken(userRecord.uid);

      res.status(200).json({ token: customToken });
    } else {
      res
        .status(403)
        .json({ error: "Access denied. Admin privileges required." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/addAdmin", async (req, res) => {
  try {
    const { email } = req.body;
    await db.collection("admins").add({ email });
    res.status(201).send("Admin added successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/admin", async (req, res) => {
  try {
    const snapshot = await db.collection("admins").get();
    const employees = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/addEmployee", async (req, res) => {
  try {
    const { name, age, idNumber, role } = req.body;
    await db.collection("employees").add({ name, age, idNumber, role });
    res.status(201).send("Employee added successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get("/employees", async (req, res) => {
  try {
    const snapshot = await db.collection("employees").get();
    const employees = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use(bodyParser.json);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
