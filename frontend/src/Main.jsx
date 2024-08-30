import Wheel from "./components/Wheel/Wheel";
import Summary from "./components/Summary/Summary";
import Header from "./components/Header/Header";
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalContext } from "./util/GlobalState";
import { hexToRgba } from "./util/functions";

function Main() {
  console.log("Main.js");
  const { user, userSettings, loading, gradientColors1, gradientColors2 } =
    useContext(GlobalContext);
  const gradientColors = `${hexToRgba(gradientColors1)} 0%, ${hexToRgba(
    gradientColors2
  )} 150%`;

  if (loading) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ background: `linear-gradient(to bottom, ${gradientColors})` }}
      >
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="Main">
      <Header />
      <div className="flex">
        <Wheel />
        <Summary />
      </div>
    </div>
  );
}

export default Main;
