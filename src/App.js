import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { isInMobileBrowser } from "./libs/browser";

import PopUp from "./components/PopUp/PopUp";
import Navbar from "./layout/Navbar";
import Game from "./layout/Game";
import Footer from "./layout/Footer";
import LeaguesLink from "./layout/LeaguesLink";
import ScrollToTop from "./components/ScrollToTop";
import "./styles.css";
import Hero from "./components/Hero/Hero";
import Loader from "./components/Loader/Loader";
import bgImage from "./assets/field.png";
import Privacy from "./components/Privacy/Privacy";

export default function App() {
  const location = useLocation();
  const [showOpenApp, setShowOpenApp] = useState(false);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/privacy-policy") {
      document.body.style.backgroundImage = `url(${bgImage})`;
      document.body.style.setProperty("--overlay-opacity", 0); // was 0.85
    } else {
      document.body.style.backgroundImage = "";
      document.body.style.setProperty("--overlay-opacity", 0.81);
    }
  }, [location]);

  useEffect(() => {
    setShowOpenApp(isInMobileBrowser);

    let tmptLoader = document.getElementById("temp-loader");
    if (tmptLoader) {
      tmptLoader.parentNode.removeChild(tmptLoader);
    }
  }, []);

  return (
    <div id="app">
      <Navbar />
      <Loader />
      <ScrollToTop />

      <Routes>
        <Route
          path="game"
          element={
            <>
              <Game />
              <LeaguesLink />
            </>
          }
        >
          <Route
            path=":leagueName"
            element={
              <>
                <Game />
                <LeaguesLink />
              </>
            }
          />
        </Route>
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route
          path="/"
          element={
            <>
              <Game />
              <LeaguesLink />
              <Hero />
            </>
          }
        />
      </Routes>
      <Footer showOpenApp={showOpenApp.status} />
      <div className="black-glass"></div>
      <PopUp mobileDeviceInfo={showOpenApp} />
    </div>
  );
}
