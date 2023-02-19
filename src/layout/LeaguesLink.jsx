import React, { useState, useEffect } from "react";
import { LEAGUES_LIST } from "../utils/constants";
import "./LeaguesLink.css";
import useGame from "../context/game";
import { CopyToClipboard } from "react-copy-to-clipboard";

import shareIcon from "../assets/icons/share.png";

const LeaguesLink = () => {
  const { gameOver, mainPlayer, league } = useGame();

  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="leagues_links_list">
      {!gameOver && mainPlayer && (
        <div className="help-frnd">
          <CopyToClipboard
            text={`Hey! I'm playing GuessWhoFootball. Help me out, who do you think this is? 

${window.location.href}`}
            onCopy={() => setIsCopied(true)}
          >
            <button className="help_frnd-btn">
              <img src={shareIcon} alt="Share Icon" />
              <span> Ask a friend </span>
            </button>
          </CopyToClipboard>

          <p className={`help_frnd-isCopied ${isCopied ? "active" : ""}`}>
            Copied! Now paste in messenger / socials.
          </p>
        </div>
      )}
      <div className="container">
        {LEAGUES_LIST.map((leagueInfo) => {
          if (leagueInfo.id !== league?.id && !leagueInfo.hide) {
            return (
              <a
                key={leagueInfo.name}
                href={leagueInfo.slug}
                rel="noopener noreferrer"
              >
                <img
                  src={leagueInfo.img.default}
                  alt={leagueInfo.name}
                  style={leagueInfo.style}
                />
              </a>
            );
          }
        })}
      </div>
    </div>
  );
};

export default LeaguesLink;
