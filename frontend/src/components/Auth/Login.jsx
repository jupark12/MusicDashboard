import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(email, password);
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
      <div className="flex flex-col gap-4">
        <input
          className="Button-auth pl-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="Button-auth pl-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" className="Button-cta">
          Login
        </button>
      </div>
      {error && <p className="bg-red-500 text-white p-2 rounded-md">{error}</p>}
    </form>
  );
};

export default Login;
