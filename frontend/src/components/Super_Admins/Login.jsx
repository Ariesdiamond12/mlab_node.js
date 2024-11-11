import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signIn = async (event) => {
    event.preventDefault();
    try {
      // await signInWithEmailAndPassword(auth, username, password);
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
      const { token } = response.data;

      // Store token in local storage or a global state manager (like Redux)
      localStorage.setItem('token', token);

      // Redirect or perform any other actions for successful login
      console.log('Login successful! Token:', token);
      setError(null);
      setTimeout(() => {
        navigate("/superadmins");
      }, 1000);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <div className="bg-[#003356] w-full h-screen">
      <div className="flex justify-center items-center h-full">
        <form
          className="max-w-[400px] w-full mx-auto bg-white p-8 rounded-lg"
          onSubmit={signIn}
        >
          <h2 className="text-3xl font-medium text-center py-8">Login</h2>
          {error && <p className="text-red-500">{error.message}</p>}
          <div className="flex flex-col py-2">
            <label>Username</label>
            <input
              className="border p-2 h-11 rounded-full bg-gray-200 outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="border p-2 h-11 rounded-full bg-gray-200 outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-3 bg-[#d90429] text-white rounded-full"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
