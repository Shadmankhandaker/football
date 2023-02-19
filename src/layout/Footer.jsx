import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TikTokIcon, TwitterIcon } from "../assets/Icons";
import "./Footer.css";
import useGame from "../context/game";
import { isInBrowser } from "../libs/browser";

const Footer = ({ showOpenApp }) => {
  const { setShowContactForm } = useGame();
  const [showAppIcon, setShowAppIcon] = useState(true);

  useEffect(() => {
    setShowAppIcon(isInBrowser());
  });

  const openContactForm = (e) => {
    e.preventDefault();
    setShowContactForm(true);
  };

  return (
    <footer>
      <div
        className="container"
        style={showOpenApp ? { paddingBottom: "2rem" } : {}}
      >
        <div className="footer-social_links">
          <a
            href="https://www.tiktok.com/@guesswhofootball.com"
            target="_blank"
            rel="noopener"
            aria-label="Twitter"
          >
            <TikTokIcon />
          </a>
          <a
            href="https://twitter.com/GuessWhoFootbal"
            target="_blank"
            rel="noopener"
            aria-label="Tiktok"
          >
            <TwitterIcon />
          </a>
        </div>
        <div className="footer-content">
          <p>&copy; Copyright GuessWho? Football</p>
          <p>
            All brands and logos used are for illustrative purposes only to
            enable players to use these free games
          </p>
          <p>
            <Link to="/privacy-policy" aria-label="privacy policy">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link
              to="#contact"
              aria-label="contact us"
              onClick={openContactForm}
            >
              Contact Us
            </Link>
          </p>
        </div>
        {showAppIcon && (
          <div className="footer-app_icons">
            <a href="https://play.google.com/store/apps/details?id=com.shadman.guesswhofootball">
              {" "}
              <img
                src="/images/Google Play.c29c90d4.png"
                alt="google play store"
              />{" "}
            </a>
            <a href="https://apps.apple.com/us/app/guess-who-football/id1637123709">
              {" "}
              <img
                src="/images/App Store.580023ab.png"
                alt="google play store"
              />{" "}
            </a>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
