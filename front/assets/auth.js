// Import Firebase modules
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// ✅ Firebase configuration
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Check login status
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    console.log("Checking login status:", user);

    const isLoginPage = window.location.pathname.includes("login-signup.html");

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ If user is on login page, redirect to home
      if (isLoginPage) {
        window.location.href = "/front/index.html";
      }
    } else {
      localStorage.removeItem("user");

      // ✅ If not logged in & not on login page, redirect to login
      if (!isLoginPage) {
        window.location.href = "/front/login-signup.html";
      }
    }
  });
});

// ✅ Signup function
export async function handleSignup() {
    console.log("Signup button clicked");

    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const errorElement = document.getElementById('signupError');

    if (!email || !password) {
        errorElement.textContent = '❌ Please fill in all fields.';
        return;
    }

    try {
        console.log("Sending signup request...");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem("user", JSON.stringify(userCredential.user));
        alert("✅ Signup successful! Redirecting to home page...");
        window.location.href = "/front/index.html"; 
    } catch (error) {
        console.error("Signup Error:", error);
        errorElement.textContent = error.message;
    }
}

// ✅ Login function
export async function handleLogin() {
    console.log("Login button clicked");

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const errorElement = document.getElementById('loginError');

    if (!email || !password) {
        errorElement.textContent = '❌ Please fill in all fields.';
        return;
    }

    try {
        console.log("Sending login request...");
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("user", JSON.stringify(userCredential.user));
        alert("✅ Login successful! Redirecting to home page...");
        window.location.href = "/front/index.html"; 
    } catch (error) {
        console.error("Login Error:", error);
        errorElement.textContent = error.message;
    }
}

// ✅ Logout function
export async function handleLogout() {
    try {
        await signOut(auth);
        localStorage.removeItem("user");
        alert("✅ Logout successful!");
        window.location.href = "/front/login-signup.html"; // ✅ Redirect to login page
    } catch (error) {
        console.error("Logout Error:", error);
    }
}
