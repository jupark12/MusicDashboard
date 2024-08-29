// Have both login and signup forms, and you can switch between them with a button
import React, { useState, useContext } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { hexToRgba } from "../../util//functions";
import { GlobalContext } from "../../util/GlobalState";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const { gradientColors1, gradientColors2 } = useContext(GlobalContext);
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const gradientColors = `${hexToRgba(gradientColors1)} 0%, ${hexToRgba(
    gradientColors2
  )} 150%`;

  return (
    <div
      className="flex justify-center items-center h-screen bg-slate-400"
      style={{ background: `linear-gradient(to bottom, ${gradientColors})` }}
    >
      <div className="flex bg-white p-8 gap-8 rounded-xl">
        <div className="w-[50%] flex flex-col border-r-2">
          <h1 className="text-4xl text-wrap">Welcome to Music Wheel</h1>
          <p className="text-wrap">Please sign in to view your music wheel</p>
        </div>
        <div className="py-8">
          {isLogin ? <Login /> : <Signup />}
          <button className="mt-8" onClick={toggleForm}>
            {isLogin
              ? "Don't have an account? Signup"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
