import React, { useEffect, useState } from "react";
import footballImg from "../../assets/icons/football.png"
import "./Livescore.css";

const Livescore = () => {
  const [today_date, setToday_Date] = useState()
  const date = new Date();

  useEffect(() => {
    let dateIso = date.toISOString()
    let preferedDate = dateIso.split("T")[0]
    setToday_Date(preferedDate)
  }, [date])

  return (
    <div className="livescore_widget_wrapper">
      <h3>
          <img src={footballImg} alt="live-football" />
          <span className="live-title">Live</span> Football
      </h3>
      <div className="livescore_box">
      <iframe src="https://www.scorebat.com/embed/livescore/" frameBorder="0" width="600" height="760" allowFullScreen allow='autoplay; fullscreen' style={{width:"600px",height:"760px",overflow:"hidden",display:"block"}} className="_scorebatEmbeddedPlayer_"></iframe>
          {/* <div
            id="wg-api-football-games"
            data-host="v3.football.api-sports.io"
            data-key="e9cb39d8c2d10da0b70008f673f74518"
            data-date=""
            data-league=""
            data-season=""
            data-theme="dark"
            data-refresh="15"
            data-show-toolbar="true"
            data-show-errors="false"
            data-show-logos="false"
            data-modal-game="true"
            data-modal-standings="true"
            data-modal-show-logos="true"
          ></div> */}
          {/* <div
            id="wg-api-football-fixtures"
            data-host="api-football-v1.p.rapidapi.com"
            data-refresh="60"
            data-date={today_date}
            data-key="87e5c89f83msh6fefb1743dad078p186c0ejsnd32c39fb6b7c"
            data-theme="false"
            data-show-errors="true"
            className="api_football_loader"
          ></div> */}
        </div>
    </div>
  );
};

export default Livescore;