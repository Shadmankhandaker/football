import React, { useState, useRef, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import useGame from "../../context/game";
import { LEAGUES, LEAGUES_LIST } from "../../utils/constants";
import { fetchPlayersByName, fetchClubsByName } from "../../utils/data.service";
import {
  MAX_GUESS_COUNT,
  MAX_CLUE_COUNT,
  MAX_CLUE_COUNT_BRA_INT,
} from "../../utils/constants";
import { CalendarRightIcon, CalendarLeftIcon } from "../../assets/Icons";
import "./Game.css";

import { getColorForLeague } from "../../utils/functions";

import hiddenEye from "../../assets/icons/hide-eye.png";
import openEye from "../../assets/icons/open-eye.png";

let tempCurrentFocus = null;

const GameMainBox = () => {
  const {
    league,
    addToGuessList,
    guessCount,
    gameOver,
    clueCount,
    giveClue,
    setShowStats,
    mainPlayer,
    mainClub,
    lastGame,
  } = useGame();

  const [style, setStyle] = useState({
    backgroundImage: `linear-gradient(
    to right,
    rgb(236, 70, 98),
    rgb(236, 70, 98),
    yellow,
    yellow,
    rgb(19, 177, 19),
    rgb(0, 153, 255),
    rgb(0, 153, 255),
    blue
  )`,
  });
  const location = useLocation();

  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isIntLeague, setIsIntLeague] = useState(false);
  const [isClueOne, setIsClueOne] = useState(false);
  const [isClueTwo, setIsClueTwo] = useState(false);
  const [isMainImageHidden, setIsMainImageHidden] = useState(true);
  const [isGuessTheClubGame, setIsGuessTheClubGame] = useState(false);

  const [currentFocus, setCurrentFocus] = useState(-1);
  const [shouldShowsurvey, setShouldShowsurvey] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    if (league) {
      let _style = getColorForLeague(league.id);
      setStyle(_style);
    } else {
      setStyle({
        backgroundImage: `linear-gradient(
        to right,
        rgb(236, 70, 98),
        rgb(236, 70, 98),
        yellow,
        yellow,
        rgb(19, 177, 19),
        rgb(0, 153, 255),
        rgb(0, 153, 255),
        blue
      )`,
      });
    }
  }, [league]);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = null;
      setFilteredPlayers([]);
    }

    if (
      league.id === LEAGUES["world-cup"] ||
      league.id === LEAGUES["all_time_legends"] ||
      league.id === LEAGUES["man-united-legends"]
    ) {
      setIsIntLeague(true);
    } else {
      setIsIntLeague(false);
    }

    if (league.id === LEAGUES["guessTheClub"]) {
      setIsGuessTheClubGame(true);
      setIsMainImageHidden(false);
    }

    if (
      league.id === LEAGUES["world-cup"] ||
      league.id === LEAGUES["brasileirão"] ||
      league.id === LEAGUES["all_time_legends"] ||
      league.id === LEAGUES["guessTheClub"]
    ) {
      setIsClueOne(true);
    } else if (league.id === LEAGUES["man-united-legends"]) {
      setIsClueTwo(true);
    } else {
      setIsClueOne(false);
    }
  }, [location, league.id]);

  useEffect(() => {
    let timeout;
    if (gameOver && !lastGame) {
      timeout = setTimeout(() => {
        setShowStats(true);
      }, 1000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [gameOver]);

  useEffect(() => {
    window.showclue = () => {
      setShouldShowsurvey(false);
      giveClue();
    };
  }, []);

  if (!isGuessTheClubGame && !mainPlayer) return;
  else if (isGuessTheClubGame && !mainClub) return;

  const handleCurrentFocus = (e) => {
    e = e || window.event;

    if (tempCurrentFocus !== null) {
      setCurrentFocus(tempCurrentFocus);
      tempCurrentFocus = null;
    }
    if (e.key === "ArrowDown" || e.code === "ArrowDown" || e.keyCode === 40) {
      e.preventDefault();
      setCurrentFocus((prev) => {
        if (prev >= -1 && prev < filteredPlayers.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    } else if (
      e.key === "ArrowUp" ||
      e.code === "ArrowUp" ||
      e.keyCode === 38
    ) {
      e.preventDefault();
      setCurrentFocus((prev) => {
        if (prev > 0 && prev <= filteredPlayers.length - 1) {
          return prev - 1;
        } else {
          return filteredPlayers.length - 1;
        }
      });
    } else if (e.key === "Enter" || e.code === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      tempCurrentFocus = null;
      setCurrentFocus(-1);
      if (currentFocus < 0) {
        return;
      }
      addToGuessList(filteredPlayers[currentFocus]);
      setFilteredPlayers([]);
      inputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    const query = e.target.value;
    if (!query) return;
    if (query.length <= 1) return setFilteredPlayers([]);
    if (isGuessTheClubGame) {
      setFilteredPlayers(fetchClubsByName(query, league.id));
    } else {
      setFilteredPlayers(fetchPlayersByName(query, league.id));
    }
  };

  const handleBlur = () => {
    setShowSuggestion(false);
    setCurrentFocus(-1);
  };
  const handleFocus = () => {
    setShowSuggestion(true);
  };
  const handlePlayerSelect = (data) => () => {
    tempCurrentFocus = null;
    setCurrentFocus(-1);
    addToGuessList(data);
    setFilteredPlayers([]);
    inputRef.current.value = "";
  };

  const handleClue = () => {
    if (shouldShowsurvey) {
      new Noty({
        type: "info",
        layout: "topCenter",
        theme: "custom",
        text: "Please support us and fill in a quick survey to get your clue",
        timeout: 3000,
        progressBar: false,
        callbacks: {
          onTemplate: function () {
            this.barDom.innerHTML =
              '<div class="survey-noty_body noty_body">' +
              this.options.text +
              "<div>";
          },
        },
      }).show();
      Pollfish.showFullSurvey();
    } else {
      giveClue();
    }
  };

  return (
    <div className="game-main_box">
      {!gameOver && (
        <div style={{ position: "relative" }}>
          {isMainImageHidden ? (
            <button
              className="game-main_player-option"
              onClick={() => setIsMainImageHidden(false)}
            >
              {" "}
              <span>Show Image</span> <img src={openEye} alt="Open eye" />{" "}
            </button>
          ) : (
            <button
              className="game-main_player-option"
              onClick={() => setIsMainImageHidden(true)}
            >
              {" "}
              <span>Hide Image</span> <img src={hiddenEye} alt="Hidden eye" />{" "}
            </button>
          )}

          {league?.id === LEAGUES["brasileirão"] ? (
            <span className="bottom_border color-brazil">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
          ) : league?.id === LEAGUES["laliga"] ? (
            <span className="bottom_border color-spain">
              <span></span>
              <span></span>
              <span></span>
            </span>
          ) : league?.id === LEAGUES["bundesliga"] ? (
            <span className="bottom_border color-germany">
              <span></span>
              <span></span>
              <span></span>
            </span>
          ) : league?.id === LEAGUES["ligue-1"] ? (
            <span className="bottom_border color-france">
              <span></span>
              <span></span>
              <span></span>
            </span>
          ) : league?.id === LEAGUES["series-a"] ? (
            <span className="bottom_border color-italy">
              <span></span>
              <span></span>
              <span></span>
            </span>
          ) : (
            <span className="bottom_border" style={style}></span>
          )}
        </div>
      )}
      {isGuessTheClubGame ? (
        <MainClub hideImage={isMainImageHidden} />
      ) : (
        <MainPlayer hideImage={isMainImageHidden} />
      )}

      {!gameOver && (
        <>
          {league?.id === LEAGUES["man-united-legends"] && clueCount <= 1 && (
            <div className={`game-clue ${guessCount <= 4 ? "d-none" : ""}`}>
              <button
                id="clueHandler"
                data-restart="false"
                onClick={handleClue}
              >
                {clueCount === 0
                  ? "Give me a clue!"
                  : clueCount === 1
                  ? league.id === LEAGUES["man-united-legends"]
                    ? "Give me another clue"
                    : "Show FUT rating"
                  : "Show player Club"}{" "}
              </button>
            </div>
          )}
          {league?.id !== LEAGUES["man-united-legends"] &&
            clueCount <=
              (!isClueOne
                ? MAX_CLUE_COUNT - 1
                : MAX_CLUE_COUNT_BRA_INT - 1) && (
              <div
                className={`game-clue ${
                  clueCount === 1 && guessCount < 4 ? "d-none" : ""
                }`}
              >
                {/* onClick={handleClue} */}
                <button
                  id="clueHandler"
                  data-restart="false"
                  onClick={handleClue}
                >
                  {clueCount === 0
                    ? "Give me a clue!"
                    : clueCount === 1
                    ? league.id === LEAGUES["man-united-legends"]
                      ? "Give me another clue"
                      : "Show FUT rating"
                    : "Show player Club"}{" "}
                </button>
              </div>
            )}
          <div className="game-guess_input_box">
            <input
              ref={inputRef}
              type="text"
              placeholder={`Guess ${Math.min(
                MAX_GUESS_COUNT,
                guessCount
              )} of ${MAX_GUESS_COUNT}`}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onKeyDown={handleCurrentFocus}
            />

            {showSuggestion && (
              <PlayersList
                players={filteredPlayers}
                handlePlayerSelect={handlePlayerSelect}
                loading={loading}
                isIntLeague={isIntLeague}
                isGuessTheClubGame={isGuessTheClubGame}
                currentFocus={currentFocus}
                setCurrentFocus={setCurrentFocus}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GameMainBox;

const PlayersList = memo(
  ({
    players,
    handlePlayerSelect,
    loading,
    isIntLeague,
    isGuessTheClubGame,
    currentFocus,
    setCurrentFocus,
  }) => {
    useEffect(() => {
      let el = document.querySelector(".game-guess_autocomplete_active");

      if (el) {
        el.parentNode.scroll({
          top: el.offsetTop,
          behavior: "smooth",
        });
      }
    }, [currentFocus]);
    return (
      <div className="game-guess_autocomplete_players_wrapper">
        {loading && (
          <div className="game-guess_loader">
            <Loader />
          </div>
        )}
        {players.map((player, idx) => (
          <button
            key={player.id}
            onMouseDown={handlePlayerSelect(player)}
            onMouseEnter={() => {
              tempCurrentFocus = idx;
              setCurrentFocus(-1);
            }}
            className={`game-guess_autocomplete_player ${
              currentFocus === idx ? "game-guess_autocomplete_active" : ""
            }`}
          >
            {!isIntLeague && !isGuessTheClubGame && (
              <img src={player.clubLogo} alt={player.club_name} />
            )}
            <span>{player.name}</span>
          </button>
        ))}
      </div>
    );
  }
);

const ClueBox = memo(
  ({ clueCount, clues, mainPlayer, mainClub, guessTheClub }) => {
    const { league } = useGame();
    if (clueCount === 1) {
      return (
        <>
          <div className="game-clue_item">
            {mainPlayer ? (
              <img src={mainPlayer.nationFlag} alt="national flag" />
            ) : (
              LEAGUES_LIST.map((el) => {
                if (el.id === +mainClub.league || el.id === mainClub.league) {
                  return (
                    <img
                      key={el.id}
                      src={
                        (el.id === LEAGUES["premier-league"] ||
                          el.id === LEAGUES["laliga"]) &&
                        guessTheClub
                          ? el.logoSecondary
                          : el.logo
                      }
                      alt={el.name}
                    />
                  );
                }
              })
            )}
          </div>
          <div></div>
        </>
      );
    } else if (clueCount === 2) {
      if (league?.id === LEAGUES["man-united-legends"]) {
        return (
          <>
            <div className="game-clue_item ">
              <p className="game-clue_item-appearance">
                {mainPlayer.first_appearance}
              </p>
            </div>
            <div className="game-clue_item">
              <img src={mainPlayer.nationFlag} alt={mainPlayer.nation_name} />
            </div>
          </>
        );
      }
      return (
        <>
          <div className="game-clue_item ">
            <p className="game-clue_item-rating">{clues.rating}</p>
          </div>
          <div className="game-clue_item">
            <img src={mainPlayer.nationFlag} alt={mainPlayer.nation_name} />
          </div>
        </>
      );
    } else if (clueCount >= 3) {
      return (
        <>
          <div
            className="game-clue_item"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <img
              src={mainPlayer.clubLogo}
              alt={mainPlayer.club_name}
              style={{ color: "#000", marginTop: "24px" }}
            />
            <p className="game-clue_item-rating">{clues.rating}</p>
          </div>
          <div className="game-clue_item">
            <img src={mainPlayer.nationFlag} alt={mainPlayer.nation_name} />
          </div>
        </>
      );
    }
    return null;
  }
);

const MainPlayer = memo(({ hideImage }) => {
  const {
    mainPlayer,
    mainClub,
    gameOver,
    gameWinLose,
    clueCount,
    gameNo,
    lastGameNo,
    clues,
  } = useGame();
  const location = useLocation();
  const [next, setNext] = useState(null);

  useEffect(() => {
    let _next = lastGameNo + 2;
    if (_next <= gameNo) {
      setNext(_next);
    } else {
      setNext(null);
    }
  }, [lastGameNo]);

  return (
    <div className="game-main_player">
      {lastGameNo && (
        <Link
          to={`?game=${gameNo && lastGameNo}`}
          className="game-time_machine yesterday-btn"
        >
          <CalendarLeftIcon />
        </Link>
      )}
      {next && (
        <Link
          to={next === gameNo ? location.pathname : `?game=${gameNo && next}`}
          className="game-time_machine today-btn"
        >
          <CalendarRightIcon />
        </Link>
      )}
      {gameWinLose.win && (
        <div className="game-main_player_alert bg-primary">Great Job!</div>
      )}
      {gameWinLose.lose && (
        <div className="game-main_player_alert bg-danger">
          The player was {mainPlayer.name}
        </div>
      )}
      {hideImage && !gameOver ? (
        <div className="game-main_player_img">
          {" "}
          <span className="game-main_player-hidden">?</span>{" "}
        </div>
      ) : (
        <div
          className={`game-main_player_img ${!gameOver ? "shilloute_img" : ""}`}
          style={{ backgroundImage: `url(${encodeURI(mainPlayer.photo)})` }}
        ></div>
      )}

      {clueCount > 0 && (
        <div className="game-clue_items">
          <ClueBox
            clueCount={clueCount}
            clues={clues}
            mainPlayer={mainPlayer}
          />
        </div>
      )}
    </div>
  );
});

const MainClub = memo(({ hideImage }) => {
  const { mainClub, gameOver, gameWinLose, clueCount, gameNo, lastGameNo } =
    useGame();
  const location = useLocation();
  const [next, setNext] = useState(null);
  const [totalBlocks, setTotalBlocks] = useState(170);

  useEffect(() => {
    let _next = lastGameNo + 2;
    if (_next <= gameNo) {
      setNext(_next);
    } else {
      setNext(null);
    }
  }, [lastGameNo]);

  return (
    <div className="game-main_club">
      {lastGameNo && (
        <Link
          to={`?game=${gameNo && lastGameNo}`}
          className="game-time_machine yesterday-btn"
        >
          <CalendarLeftIcon />
        </Link>
      )}
      {next && (
        <Link
          to={next === gameNo ? location.pathname : `?game=${gameNo && next}`}
          className="game-time_machine today-btn"
        >
          <CalendarRightIcon />
        </Link>
      )}
      {gameWinLose.win && (
        <div className="game-main_player_alert bg-primary">Great Job!</div>
      )}
      {gameWinLose.lose && (
        <div className="game-main_player_alert bg-danger">
          The Club was {mainClub.club_name}
        </div>
      )}
      {hideImage && !gameOver ? (
        <div className="game-main_club_img">
          {" "}
          <span className="game-main_player-hidden">?</span>{" "}
        </div>
      ) : (
        <div
          className={`game-main_club_img`}
          style={{ backgroundImage: `url(${mainClub.photo})` }}
        >
          {!gameOver && (
            <div className="blurBox_container">
              {" "}
              {new Array(totalBlocks).fill(0).map((dl, idx) => (
                <span key={idx} className="blurBox">
                  {" "}
                </span>
              ))}{" "}
            </div>
          )}
        </div>
      )}

      {clueCount > 0 && (
        <div className="game-clue_items">
          <ClueBox
            clueCount={clueCount}
            mainClub={mainClub}
            guessTheClub={true}
          />
        </div>
      )}
    </div>
  );
});

const Loader = () => {
  return <div className="spinner-ring"></div>;
};
