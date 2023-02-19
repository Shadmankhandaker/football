import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import GameGuessPlayers from "../components/Game/GameGuessPlayer";
import GameMainBox from "../components/Game/GameMainBox";
import useGame from "../context/game";
import { LEAGUES } from "../utils/constants";
import "./Game.css";

const Game = () => {
  const { league, newGameState, setShowHelpbox, oldGameState, gameOver } =
    useGame();
  const params = useParams();
  const location = useLocation();

  const [inHomePageGame, setIsHomePageGame] = useState(true);

  useEffect(() => {
    if (!params.leagueName && location.pathname !== "/") return;
    const _gameNo = new URLSearchParams(location?.search).get("game");
    if (_gameNo && !isNaN(_gameNo) && _gameNo > 0) {
      if (location.pathname === "/") {
        setIsHomePageGame(true);
        oldGameState(LEAGUES["super-league"], _gameNo);
        return;
      }
      setIsHomePageGame(false);
      oldGameState(LEAGUES[params.leagueName], _gameNo);
    } else {
      if (location.pathname === "/") {
        setIsHomePageGame(true);
        newGameState(LEAGUES["super-league"]);
        return;
      }
      setIsHomePageGame(false);
      newGameState(LEAGUES[params.leagueName]);
    }
  }, [params, location]);

  useEffect(() => {
    if (league) {
      let _noHelp = localStorage.getItem(`${league.id}-help`);
      if (!_noHelp) {
        localStorage.setItem(`${league.id}-help`, true);
        setShowHelpbox(true);
      }
    }
  }, [league]);

  if (!league) {
    return <div></div>;
  }

  return (
    <main className="game_section">
      <div className="container">
        <GameMainBox />
        <GameGuessPlayers inHomePageGame={inHomePageGame} />
      </div>
    </main>
  );
};

export default Game;
