import React, { useContext, useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { GlobalContext } from "../../util/GlobalState";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { user, ballColor, gradientColors1, gradientColors2 } =
    useContext(GlobalContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User signed up:", user);

      try {
        console.log("Creating User Settings");

        const userData = {
          ballColor: "#000000",
          backgroundColor1: "#373832",
          backgroundColor2: "#bca483",
          userId: user.uid || "",
        };

        // Post user data to your backend
        axios.post("http://localhost:8080/user/signup", userData, {
          headers: {
            "Content-Type": "application/json",
            UserID: user.uid,
          },
        });

        console.log("User settings created successfully");
      } catch (error) {
        setError(error.message);
        console.error("Error during signup:", error);
      }
    });
  };

  return (
    <form className="flex gap-4" onSubmit={handleSignup}>
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
          Sign Up
        </button>
      </div>
      {error && <p className="bg-red-500 text-white p-2 rounded-md">{error}</p>}
    </form>
  );
};

export default Signup;
