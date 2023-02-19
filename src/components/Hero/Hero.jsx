import React from "react";
import PlayerImg from "../../assets/player.png";
import HeroLogo from "../../assets/icons/select_game.png";
import Livescore from "../Livescore/Livescore";
import "./Hero.css";

const Hero = () => {
  return (
    <main className="hero">
      <div className="container">
        <header>
          <div>
            <div className="hero-shiloutte">
              <div
                className="hero-shiloutte-img"
                style={{ backgroundImage: `url("${PlayerImg}"` }}
              ></div>
            </div>
            <div className="hero-logo">
              <img src={HeroLogo} alt="hero-logo" />
            </div>
          </div>
          <p>
            Click the flags to play other games including the World Cup and
            individual major football league games
          </p>
        </header>
        <Livescore />
      </div>
    </main>
  );
};

export default Hero;
