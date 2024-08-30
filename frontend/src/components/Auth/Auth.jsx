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
      <div className="flex flex-col items-center bg-white p-8 gap-8 rounded-xl min-w-[300px] sm:min-w-[450px]">
        <div className="w-full text-center flex flex-col border-b-2 pb-6">
          <p className="text-2xl text-wrap">
            {isLogin ? "Welcome back" : "Create an account"}
          </p>
          <p className="text-wrap"></p>
        </div>
        <div className="h-full">
          {isLogin ? <Login /> : <Signup />}
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="mt-8 ml-1 text-blue-500 hover:underline"
            onClick={toggleForm}
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
