import Wheel from "./components/Wheel/Wheel";
import Summary from "./components/Summary/Summary";
import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "./util/GlobalState";
import { hexToRgba } from "./util/functions";

function Main() {
  console.log("Main.js");
  const { user, loading, gradientColors1, gradientColors2 } =
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
      {user ? (
        <div className="flex">
          <Header />
          <Wheel />
          <Summary />
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default Main;
