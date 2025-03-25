import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = express();
const port = process.env.PORT || 5001;

// ✅ Define __dirname correctly for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Define correct frontPath
const frontPath = path.join(__dirname, "../front");

// ✅ Serve static files (HTML, CSS, JS) correctly
app.use(express.static(frontPath));

app.use(express.json());
app.use(cors());

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6Gih-PxtsOiNvdB1kbaSCWMGJrIJ1nZg",
  authDomain: "faithconnect-33b67.firebaseapp.com",
  projectId: "faithconnect-33b67",
  storageBucket: "faithconnect-33b67.appspot.com",
  messagingSenderId: "719962860806",
  appId: "1:719962860806:web:958dfedf5c98a04e70c287",
  measurementId: "G-35N20FM4D1"
};

// ✅ Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// ✅ Serve `index.html` at root `/`
app.get("/", (req, res) => {
  res.sendFile(path.join(frontPath, "index.html"));
});

// ✅ Serve `login-signup.html` at `/login`
app.get("/login", (req, res) => {
  res.sendFile(path.join(frontPath, "login-signup.html"));
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
