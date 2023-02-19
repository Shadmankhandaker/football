import React, { useState, useEffect } from "react";
import "./PopUp.css";
import AppImage from "../../assets/player.png";
import useGame from "../../context/game";

function PopUp({ mobileDeviceInfo }) {
  const { gameOver } = useGame();

  const [show, setShow] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [showCookie, setShowCookie] = useState("valid");
  const showCookieRef = React.useRef(showCookie);
  const setShowCookieState = (data) => {
    showCookieRef.current = data;
    setShowCookie(data);
  };

  useEffect(() => {
    document.addEventListener("mouseleave", function (event) {
      if (
        (event.clientY <= 0 ||
          event.clientX <= 0 ||
          event.clientX >= window.innerWidth ||
          event.clientY >= window.innerHeight) &&
        showCookieRef.current === "valid"
      ) {
        setShow(true);
      }
    });

    window.addEventListener("click", (e) => {
      setShowMobile(false);
    });

    return () => {
      document.removeEventListener("mouseleave", function (event) {
        if (
          (event.clientY <= 0 ||
            event.clientX <= 0 ||
            event.clientX >= window.innerWidth ||
            event.clientY >= window.innerHeight) &&
          showCookieRef.current === "valid"
        ) {
          setShow(true);
        }
      });

      window.removeEventListener("click", (e) => {
        setShowMobile(false);
      });
    };
  }, []);

  useEffect(() => {
    if (show && showCookie === "valid") {
      setShowCookieState("invalid");
      setTimeout(() => {
        setShowCookieState("valid");
      }, 20000);
    }
  }, [show]);

  useEffect(() => {
    if (!showMobile) {
      setTimeout(() => {
        setShowMobile(true);
      }, 10000);
    } else if (gameOver) {
      setShowMobile(true);
    }
  }, [gameOver]);

  //

  if (mobileDeviceInfo.status) {
    return (
      <div
        className={`popup_container-mobile ${
          showMobile ? "popup_container-mobile-visible" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="popup_container-mobile-close"
          onClick={() => setShowMobile(false)}
        >
          X
        </button>
        <div className="popup_container-img">
          <img src={AppImage} alt="App Thumbnail" />
        </div>
        <div className="popup_text-wrapper">
          <p className="popup_text"> Install GuessWhoFootball </p>
          <p className="popup_text">
            {" "}
            <small> guesswhofootball.com </small>{" "}
          </p>
        </div>

        <a
          className="popup_btn-mobile"
          href={
            mobileDeviceInfo.OS.name === "Android"
              ? "https://play.google.com/store/apps/details?id=com.shadman.guesswhofootball"
              : "https://apps.apple.com/us/app/guess-who-football/id1637123709"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          Install
        </a>
      </div>
    );
  }

  return (
    <div className={`popup_container ${show ? "popup_container-visible" : ""}`}>
      <div className="popup_container-img">
        <img src={AppImage} alt="App Thumbnail" />
      </div>
      <p className="popup_text"> Download our mobile app! </p>
      <div className="popup_container-btn">
        <button
          className="popup_btn popup_btn-cancel"
          onClick={() => setShow(false)}
        >
          Close
        </button>
        <a
          className="popup_btn popup_btn-success"
          href="https://play.google.com/store/apps/details?id=com.shadman.guesswhofootball"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Download for Android
        </a>
        <a
          className="popup_btn popup_btn-success"
          href="https://apps.apple.com/us/app/guess-who-football/id1637123709"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Download for IOS
        </a>{" "}
      </div>
    </div>
  );
}

export default PopUp;
