import {
  useState,
  useContext,
  createContext,
  useCallback,
  useMemo,
} from "react";
import { addDays, differenceInDays } from "date-fns";
import {
  fetchLeague,
  fetchClubById,
  fetchPlayerById,
} from "../utils/data.service";
import {
  MAX_GUESS_COUNT,
  MAX_CLUE_COUNT,
  MAX_CLUE_COUNT_BRA_INT,
  LEAGUES,
} from "../utils/constants";
import PlayerData from "../utils/players";
import { hasDateChanged, padZeros } from "../utils/functions";

// legends - json
import legends from "../assets/data/legends/legends.json";
import manUnitedLegends from "../assets/data/legends/man-united.json";

import GuessTheClub from "../assets/data/guessTheClub.json";

const GameContext = createContext();

const guessTheClubGame = LEAGUES["guessTheClub"];
const allLegendsGameData = [legends, manUnitedLegends];

export const GameProvider = ({ children }) => {
  const [gameNo, setGameNo] = useState(null);
  const [lastGameNo, setLastGameNo] = useState(null);
  const [mainPlayer, setMainPlayer] = useState(null);
  const [mainClub, setMainClub] = useState(null);
  const [league, setLeague] = useState(null);
  const [guessList, setGuessList] = useState([]);
  const [guessDistribution, setGuessDistribution] = useState([]);
  const [winDistribution, setWinDistribution] = useState([]);
  const [guessCount, setGuessCount] = useState(1);
  const [clueCount, setClueCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWinLose, setGameWinLose] = useState({ win: false, lose: false });
  const [showStats, setShowStats] = useState(false);
  const [userStatsObj, setUserStatsObj] = useState(null);
  const [gameEnded, setGameEnded] = useState(null);
  const [showHelpbox, setShowHelpbox] = useState(false);
  const [lastGame, setLastGame] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const [clues, setClues] = useState({});

  const newGameState = useCallback(async (league_id) => {
    setLoading(true);
    setClueCount(0);
    setGameNo(null);
    setLastGameNo(null);
    setGameOver(false);
    if (!league_id) {
      setLeague(null);
      setGuessList([]);
      setGameOver(false);
      return;
    }
    setLastGame(false);
    const leagueData = await fetchLeague(league_id);
    setLeague(leagueData);

    showStatsVal(league_id);

    const _date = new Date();
    const _todayDate = `${_date.getFullYear()}/${padZeros(
      _date.getMonth() + 1,
      2
    )}/${padZeros(_date.getDate(), 2)}`;

    const _gameDetails = PlayerData[`league-${league_id}`]["gameSolutions"];
    let todayPlayerId;
    let todayClubId;

    // check if legends game
    const legendsGameData = allLegendsGameData.find(
      (dt) => dt.id === league_id
    );

    if (guessTheClubGame === league_id) {
      let solutionClubGame = calcSolutionGuessTheClub();
      todayClubId = solutionClubGame.solution;
      setGameNo(solutionClubGame.gameNo);
      setLastGameNo(solutionClubGame.gameNo - 1);
    } else if (legendsGameData) {
      let soluionLegendsGame = calcSolutionLegends(
        legendsGameData.players,
        legendsGameData.gameStartDate
      );
      todayPlayerId = soluionLegendsGame.solution;
      setGameNo(soluionLegendsGame.gameNo);
      setLastGameNo(soluionLegendsGame.gameNo - 1);
    } else {
      todayPlayerId = _gameDetails[_todayDate]["playerId"];
      setClues({
        rating: _gameDetails[_todayDate]["clueRating"],
      });
      setGameNo(_gameDetails[_todayDate]["gameNo"]);
      setLastGameNo(_gameDetails[_todayDate]["gameNo"] - 1);
    }

    const userGameState = localStorage.getItem(`gameState-${league_id}`);

    let userState;
    if (userGameState) userState = JSON.parse(userGameState);
    if (userGameState && userState) {
      // if user have already played the game
      const {
        gameFinished,
        solution,
        userGuesses,
        userClueCount,
        gameOver,
        gameWin,
        gameLose,
        timerStart,
      } = userState;

      const dateChangedSeconds = hasDateChanged(gameFinished, new Date());
      const dateChangedTimer = hasDateChanged(timerStart, new Date());

      if (
        (!gameFinished && dateChangedTimer) ||
        (gameFinished && dateChangedSeconds)
      ) {
        // after timer reset
        setGuessList([]);
        setGameOver(false);
        setWinDistribution([]);

        let _userState;

        if (guessTheClubGame === league_id) {
          const mainClub = await changeMainClub(todayClubId, league_id);
          _userState = {
            solution: mainClub.id,
            gameOver: false,
            gameWin: false,
            gameLose: false,
            userGuesses: [],
            userClueCount: 0,
            gameFinished: null,
            timerStart: new Date(),
          };
        } else {
          const mainPlayer = await changeMainPlayer(todayPlayerId, league_id);
          _userState = {
            solution: mainPlayer.id,
            gameOver: false,
            gameWin: false,
            gameLose: false,
            userGuesses: [],
            userClueCount: 0,
            gameFinished: null,
            timerStart: new Date(),
          };
        }

        const userGameStats = localStorage.getItem(`gameStats-${league_id}`);
        if (userGameStats) {
          let _userStats = {
            ...JSON.parse(userGameStats),
            winDistribution: [],
          };
          localStorage.setItem(
            `gameStats-${league_id}`,
            JSON.stringify(_userStats)
          );
        }

        localStorage.setItem(
          `gameState-${league_id}`,
          JSON.stringify(_userState)
        );
        setLoading(false);
      } else {
        // if no timer reset
        let _guess_list = [];
        let _guessCount = 1;
        let _winDistribution = [];
        const initialGuessList = async (
          id,
          mainPlayer,
          mainClub,
          idx,
          length,
          league
        ) => {
          if (guessTheClubGame === league_id) {
            const club = await fetchClubById(id, league);
            let guessCheck;
            if (
              club.id === mainClub.id ||
              club.club_name === mainClub.club_name
            ) {
              guessCheck = {
                nation: true,
                club: true,
                foot: true,
                position: true,
                age: {
                  greater: false,
                  equal: true,
                },
                shirt_no: {
                  greater: false,
                  equal: true,
                },
                rating: {
                  greater: false,
                  equal: true,
                },
                league: true,
                first_appearance: {
                  greater: false,
                  equal: true,
                },
              };
            } else {
              guessCheck = {
                nation: true,
                club: false,
                foot: true,
                position: true,
                age: {
                  greater: false,
                  equal: true,
                },
                shirt_no: {
                  greater: false,
                  equal: true,
                },
                rating: {
                  greater: false,
                  equal: true,
                },
                first_appearance: {
                  greater: false,
                  equal: true,
                },
                league: club.league === mainClub.league,
              };
            }

            _guess_list[idx] = {
              guess: { ...club },
              guessCount: _guessCount,
              guessCheck,
            };
            _guessCount++;

            _winDistribution.push(0);
          } else {
            const player = await fetchPlayerById(id, league, false);
            let guessCheck;
            if (
              player.id === mainPlayer.id ||
              player.name === mainPlayer.name
            ) {
              guessCheck = {
                nation: true,
                club: true,
                foot: true,
                position: true,
                age: {
                  greater: false,
                  equal: true,
                },
                shirt_no: {
                  greater: false,
                  equal: true,
                },
                rating: {
                  greater: false,
                  equal: true,
                },
                first_appearance: {
                  greater: false,
                  equal: true,
                },
                league: true,
                group: true,
              };
            } else {
              guessCheck = {
                nation: player.nation_name === mainPlayer.nation_name,
                club: player.club === mainPlayer.club,
                foot: player.foot === mainPlayer.foot,
                position: player.position === mainPlayer.position,
                age: {
                  greater: player.age > mainPlayer.age,
                  equal: player.age === mainPlayer.age,
                },
                shirt_no: {
                  greater: player.shirt_no > mainPlayer.shirt_no,
                  equal: player.shirt_no === mainPlayer.shirt_no,
                },
                rating: {
                  greater: player.rating > mainPlayer.rating,
                  equal: player.rating === mainPlayer.rating,
                },
                first_appearance: {
                  greater:
                    +player.first_appearance > +mainPlayer.first_appearance,
                  equal:
                    +player.first_appearance === +mainPlayer.first_appearance,
                },
                league:
                  +player.league === +mainPlayer.league ||
                  player.league === mainPlayer.league,
                group: player.group === mainPlayer.group,
              };
            }

            _guess_list[idx] = {
              guess: { ...player },
              guessCount: _guessCount,
              guessCheck,
            };
            _guessCount++;

            _winDistribution.push(0);
          }

          if (idx === length - 1) {
            setGuessList(_guess_list);
            setGuessCount(_guessCount);
            const userGameStats = localStorage.getItem(
              `gameStats-${league_id}`
            );
            if (userGameStats) {
              const _userStats = JSON.parse(userGameStats);
              setWinDistribution(_userStats.winDistribution);
              setUserStatsObj(_userStats);
            } else {
              setWinDistribution(_winDistribution);

              setUserStatsObj(null);
            }
          }
        };

        if (guessTheClubGame === league_id) {
          fetchClubById(todayClubId, league_id).then((club) => {
            setMainClub(club);
            setClueCount(userClueCount);
            if (userGuesses.length > 0) {
              userGuesses.forEach(async (guess, idx, arr) => {
                await initialGuessList(
                  guess.id,
                  "_",
                  club,
                  idx,
                  arr.length,
                  league_id
                );
              });
            } else {
              setGuessList(_guess_list);
              setGuessCount(_guessCount);
            }
            setGameOver(gameOver);
            setGameWinLose({ win: gameWin, lose: gameLose });
            setGuessDistribution(userGuesses);
            setGameEnded(gameFinished);
            setLoading(false);
          });
        } else {
          fetchPlayerById(todayPlayerId, league_id).then((player) => {
            setMainPlayer(player);
            setClueCount(userClueCount);
            if (userGuesses.length > 0) {
              userGuesses.forEach(async (guess, idx, arr) => {
                await initialGuessList(
                  guess.id,
                  player,
                  "_",
                  idx,
                  arr.length,
                  league_id
                );
              });
            } else {
              setGuessList(_guess_list);
              setGuessCount(_guessCount);
            }
            setGameOver(gameOver);
            setGameWinLose({ win: gameWin, lose: gameLose });
            setGuessDistribution(userGuesses);
            setGameEnded(gameFinished);
            setLoading(false);
          });
        }
      }
    } else {
      // if user playing game for first time
      setGuessList([]);
      setGameOver(false);
      setGuessDistribution([]);
      setWinDistribution([]);
      setGuessCount(1);
      setClueCount(0);
      setGameWinLose({ win: false, lose: false });
      setUserStatsObj(null);
      setGameEnded(null);

      if (guessTheClubGame === league_id) {
        const mainClub = await changeMainClub(todayClubId, league_id);
        let _gameState = {
          solution: mainClub.id,
          userGuesses: [],
          userClueCount: 0,
          gameOver: false,
          gameWin: false,
          gameLose: false,
          gameFinished: null,
          timerStart: new Date(),
        };
        localStorage.setItem(
          `gameState-${league_id}`,
          JSON.stringify(_gameState)
        );

        setLoading(false);
      } else {
        const mainPlayer = await changeMainPlayer(todayPlayerId, league_id);

        let _gameState = {
          solution: mainPlayer.id,
          userGuesses: [],
          userClueCount: 0,
          gameOver: false,
          gameWin: false,
          gameLose: false,
          gameFinished: null,
          timerStart: new Date(),
        };
        localStorage.setItem(
          `gameState-${league_id}`,
          JSON.stringify(_gameState)
        );

        setLoading(false);
      }
    }
  });

  const oldGameState = useCallback(async (league_id, game_no) => {
    setLoading(true);
    setGameOver(false);
    if (!league_id) {
      setLeague(null);
      setGuessList([]);
      setGameOver(false);
      return;
    }

    showStatsVal(league_id);

    const _date = new Date();
    const _todayDate = `${_date.getFullYear()}/${padZeros(
      _date.getMonth() + 1,
      2
    )}/${padZeros(_date.getDate(), 2)}`;

    const _gameDetails = PlayerData[`league-${league_id}`]["gameSolutions"];
    const todayDetail = _gameDetails[_todayDate];
    let _lastDate;

    // check if legends game
    const legendsGameData = allLegendsGameData.find(
      (dt) => dt.id === league_id
    );

    for (const key in _gameDetails) {
      if (_gameDetails[key].gameNo == game_no) {
        _lastDate = key;
        break;
      }
    }
    if (_lastDate || guessTheClubGame === league_id || legendsGameData) {
      setLastGame(true);
      setClueCount(0);
      setLastGameNo(game_no - 1);
      const leagueData = await fetchLeague(league_id);
      setLeague(leagueData);

      setGuessList([]);
      setGameOver(false);
      setGuessDistribution([]);
      setWinDistribution([]);
      setGuessCount(1);

      setGameWinLose({ win: false, lose: false });
      setUserStatsObj(null);
      setGameEnded(null);

      if (guessTheClubGame === league_id) {
        let solutionClub = calcSolutionGuessTheClub(game_no);
        setGameNo(solutionClub.latestGameNo);
        const lastClubId = solutionClub.solution;
        await changeMainClub(lastClubId, league_id);
      } else if (legendsGameData) {
        let soluionLegendsGame = calcSolutionLegends(
          legendsGameData.players,
          legendsGameData.gameStartDate,
          game_no
        );
        setGameNo(soluionLegendsGame.latestGameNo);
        const lastPlayerId = soluionLegendsGame.solution;
        await changeMainPlayer(lastPlayerId, league_id);
      } else {
        setGameNo(todayDetail.gameNo);
        const lastPlayerId = _gameDetails[_lastDate]["playerId"];
        await changeMainPlayer(lastPlayerId, league_id);
        setClues({
          rating: _gameDetails[_lastDate]["clueRating"],
        });
      }

      setLoading(false);
    } else {
      newGameState(league_id);
    }
  });

  // changing the main player (player user has to guess) according to league
  const changeMainPlayer = useCallback(async (id, league) => {
    const player = await fetchPlayerById(id, league);
    setMainPlayer(player);
    return player;
  });
  const changeMainClub = useCallback(async (id, league) => {
    const club = await fetchClubById(id, league);
    setMainClub(club);
    return club;
  });

  // adding football player entered by user to guess list
  const addToGuessList = useCallback((guess) => {
    if (guessTheClubGame !== league?.id && !mainPlayer) return;
    else if (guessTheClubGame === league?.id && !mainClub) return;

    // providing clue to user's by highlighting similar info
    let guessCheck;

    if (guessTheClubGame === league?.id) {
      if (mainClub.id === guess.id || mainClub.club_name === guess.club_name) {
        guessCheck = {
          nation: true,
          club: true,
          foot: true,
          position: true,
          age: {
            greater: false,
            equal: true,
          },
          shirt_no: {
            greater: false,
            equal: true,
          },
          rating: {
            greater: false,
            equal: true,
          },
          first_appearance: {
            greater: false,
            equal: true,
          },
          league: true,
        };
      } else {
        guessCheck = {
          nation: true,
          club: false,
          foot: true,
          position: true,
          age: {
            greater: false,
            equal: true,
          },
          shirt_no: {
            greater: false,
            equal: true,
          },
          rating: {
            greater: false,
            equal: true,
          },
          first_appearance: {
            greater: false,
            equal: true,
          },
          league: guess.league === mainClub.league,
        };
      }
    } else {
      if (mainPlayer.id === guess.id || mainPlayer.name === guess.name) {
        guessCheck = {
          nation: true,
          club: true,
          foot: true,
          position: true,
          age: {
            greater: false,
            equal: true,
          },
          shirt_no: {
            greater: false,
            equal: true,
          },
          rating: {
            greater: false,
            equal: true,
          },
          first_appearance: {
            greater: false,
            equal: true,
          },
          league: true,
          group: true,
        };
      } else {
        guessCheck = {
          nation: guess.nation_name === mainPlayer.nation_name,
          club: guess.club === mainPlayer.club,
          foot: guess.foot === mainPlayer.foot,
          position: guess.position === mainPlayer.position,
          rating: {
            equal: guess.rating === mainPlayer.rating,
            greater: guess.rating > mainPlayer.rating,
          },
          age: {
            greater: guess.age > mainPlayer.age,
            equal: guess.age === mainPlayer.age,
          },
          shirt_no: {
            greater: guess.shirt_no > mainPlayer.shirt_no,
            equal: guess.shirt_no === mainPlayer.shirt_no,
          },
          rating: {
            greater: guess.rating > mainPlayer.rating,
            equal: guess.rating === mainPlayer.rating,
          },
          first_appearance: {
            greater: guess.first_appearance > mainPlayer.first_appearance,
            equal: guess.first_appearance === mainPlayer.first_appearance,
          },
          league:
            +guess.league === +mainPlayer.league ||
            guess.league === mainPlayer.league,
          group: guess.group === mainPlayer.group,
        };
      }
    }

    // adding player to guess list
    setGuessList([{ guess, guessCount, guessCheck }, ...guessList]);
    setGuessDistribution([
      { id: guess.id, name: guess.name },
      ...guessDistribution,
    ]);

    // only for today's game
    if (!lastGame) {
      const _gameState = JSON.parse(
        localStorage.getItem(`gameState-${league?.id}`)
      );
      localStorage.setItem(
        `gameState-${league?.id}`,
        JSON.stringify({
          ..._gameState,
          userGuesses: [
            { id: guess.id, name: guess.name },
            ...guessDistribution,
          ],
        })
      );
    }

    // increasing guess count
    setGuessCount((prevVal) => prevVal + 1);

    // if user's win the game
    if (
      guessTheClubGame !== league?.id &&
      (mainPlayer?.id === guess.id || mainPlayer?.name === guess.name)
    ) {
      return handleGameWin();
    } else if (mainClub?.id === guess.id || mainClub?.name === guess.name) {
      return handleGameWin();
    }

    // if user's lose the game
    if (guessCount === MAX_GUESS_COUNT) {
      setWinDistribution([...winDistribution, 0]);
      handleGameLose();
      return;
    }
    // setting win distribution
    setWinDistribution([...winDistribution, 0]);
  });

  // providing clue to user's
  const giveClue = useCallback(() => {
    if (
      (league.id === LEAGUES["world-cup"] ||
        league.id === LEAGUES["brasileirão"]) &&
      clueCount > MAX_CLUE_COUNT_BRA_INT
    )
      return false;
    else if (clueCount > MAX_CLUE_COUNT) return false;
    setClueCount((prevVal) => {
      if (!lastGame) {
        const _gameState = JSON.parse(
          localStorage.getItem(`gameState-${league.id}`)
        );
        localStorage.setItem(
          `gameState-${league.id}`,
          JSON.stringify({ ..._gameState, userClueCount: prevVal + 1 })
        );
      }
      return prevVal + 1;
    });
  });

  // if user wins the game
  const handleGameWin = useCallback(() => {
    setGameWinLose({ win: true, lose: false });
    setGameOver(true);
    if (lastGame) return;

    const userGameState = JSON.parse(
      localStorage.getItem(`gameState-${league?.id}`)
    );

    let _winDistribution = [
      ...winDistribution,
      1,
      ...Array(MAX_GUESS_COUNT - winDistribution.length - 1).fill(0),
    ];
    setWinDistribution(_winDistribution);

    let userGameStats = localStorage.getItem(`gameStats-${league?.id}`);
    userGameStats = JSON.parse(userGameStats);
    let _userStats;
    if (userGameStats) {
      const { totalFailed, totalTries, currentStreak, bestStreak } =
        userGameStats;
      const _totalTries = totalTries + 1;
      const successRate = ((_totalTries - totalFailed) / _totalTries) * 100;
      _userStats = {
        ...userGameStats,
        totalTries: _totalTries,
        successRate,
        currentStreak: shouldContinueStreak(userGameState.gameFinished)
          ? currentStreak + 1
          : 1,
        bestStreak: Math.max(
          shouldContinueStreak(userGameState.gameFinished)
            ? currentStreak + 1
            : 1,
          bestStreak
        ),
        winDistribution: _winDistribution,
      };
    } else {
      _userStats = {
        totalFailed: 0,
        totalTries: 1,
        successRate: 100,
        currentStreak: 1,
        bestStreak: 1,
        winDistribution: _winDistribution,
      };
    }

    setUserStatsObj(_userStats);

    const _userState = {
      ...userGameState,
      gameOver: true,
      gameWin: true,
      gameLose: false,
      gameFinished: new Date(),
    };
    setGameEnded(new Date());

    localStorage.setItem(`gameStats-${league?.id}`, JSON.stringify(_userStats));
    localStorage.setItem(`gameState-${league?.id}`, JSON.stringify(_userState));
  });

  // if user loses the game
  const handleGameLose = useCallback(() => {
    // set gameover and game lose
    setGameWinLose({ win: false, lose: true });
    setGameOver(true);

    if (lastGame) return;

    let userGameStats = localStorage.getItem(`gameStats-${league?.id}`);
    userGameStats = JSON.parse(userGameStats);
    let _userStats;
    if (userGameStats) {
      const { totalFailed, totalTries } = userGameStats;
      const _totalTries = totalTries + 1;
      const _totalFailed = totalFailed + 1;
      const successRate = ((_totalTries - _totalFailed) / _totalTries) * 100;
      _userStats = {
        ...userGameStats,
        totalFailed: _totalTries,
        totalTries: _totalTries,
        successRate,
        currentStreak: 0,
        winDistribution: Array(8).fill(0),
      };
    } else {
      _userStats = {
        totalFailed: 1,
        totalTries: 1,
        successRate: 0,
        currentStreak: 0,
        winDistribution: Array(8).fill(0),
        bestStreak: 0,
      };
    }

    setUserStatsObj(_userStats);

    const userGameState = JSON.parse(
      localStorage.getItem(`gameState-${league?.id}`)
    );
    const _userState = {
      ...userGameState,
      gameOver: true,
      gameWin: false,
      gameLose: true,
      gameFinished: new Date(),
    };
    setGameEnded(new Date());

    // updating local storage
    localStorage.setItem(`gameStats-${league?.id}`, JSON.stringify(_userStats));
    localStorage.setItem(`gameState-${league?.id}`, JSON.stringify(_userState));
  });

  // show previous stats
  const showStatsVal = useCallback((league_id) => {
    let userGameStats = localStorage.getItem(`gameStats-${league_id}`);
    userGameStats = JSON.parse(userGameStats);

    if (userGameStats) {
      setUserStatsObj(userGameStats);
    } else {
      setUserStatsObj(null);
    }
  });

  const shouldContinueStreak = (lastGameFinished) => {
    if (!lastGameFinished) return false;
    let _today = new Date();
    let lastGameDate = new Date(lastGameFinished);
    _today.setHours(0, 0, 0, 0);
    lastGameDate.setHours(0, 0, 0, 0);

    const diffInDays = differenceInDays(_today, lastGameDate);

    if (diffInDays > 1) return false;
    else return true;
  };

  // calculate guess the club solution
  const calcSolutionGuessTheClub = (gameNo = false) => {
    // August 23, 2022 Game Epoch
    const epoch = new Date(GuessTheClub.gameStartDate);
    const start = new Date(epoch);

    const today = new Date();
    const baseDate =
      gameNo && typeof Number(gameNo) === "number" && Number(gameNo) > 0
        ? addDays(start, Number(Number(gameNo) - 1))
        : today;

    const latestBaseDate = new Date();

    latestBaseDate.setHours(0, 0, 0, 0);
    baseDate.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    let index = 0;
    gameNo = differenceInDays(baseDate, start) + 1;
    let latestGameNo = differenceInDays(latestBaseDate, start) + 1;

    while (start < baseDate) {
      index++;
      start.setDate(start.getDate() + 1);
    }

    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    return {
      solution: GuessTheClub.clubs[index % GuessTheClub.clubs.length].id,
      gameNo: gameNo,
      latestGameNo,
    };
  };

  // solution for legends game
  const calcSolutionLegends = (players, gameStartDate, gameNo = false) => {
    // August 23, 2022 Game Epoch
    const epoch = new Date(gameStartDate);
    const start = new Date(epoch);

    const today = new Date();
    const baseDate =
      gameNo && typeof Number(gameNo) === "number" && Number(gameNo) > 0
        ? addDays(start, Number(Number(gameNo) - 1))
        : today;

    const latestBaseDate = new Date();

    latestBaseDate.setHours(0, 0, 0, 0);
    baseDate.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    let index = 0;
    gameNo = differenceInDays(baseDate, start) + 1;
    let latestGameNo = differenceInDays(latestBaseDate, start) + 1;

    while (start < baseDate) {
      index++;
      start.setDate(start.getDate() + 1);
    }

    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    return {
      solution: players[index % players.length].id,
      gameNo: gameNo,
      latestGameNo,
    };
  };

  const value = useMemo(
    () => ({
      newGameState,
      league,
      mainPlayer,
      mainClub,
      clueCount,
      giveClue,
      guessList,
      guessCount,
      addToGuessList,
      gameOver,
      gameWinLose,
      showStats,
      setShowStats,
      setGameOver,
      userStatsObj,
      winDistribution,
      gameEnded,
      showHelpbox,
      setShowHelpbox,
      lastGame,
      gameNo,
      oldGameState,
      lastGameNo,
      setLeague,
      loading,
      showContactForm,
      setShowContactForm,
      clues,
    }),
    [
      newGameState,
      league,
      mainPlayer,
      mainClub,
      clueCount,
      giveClue,
      guessList,
      guessCount,
      addToGuessList,
      gameOver,
      gameWinLose,
      showStats,
      setShowStats,
      setGameOver,
      userStatsObj,
      winDistribution,
      gameEnded,
      showHelpbox,
      setShowHelpbox,
      lastGame,
      gameNo,
      oldGameState,
      lastGameNo,
      setLeague,
      loading,
      clues,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const useGame = () => useContext(GameContext);
export default useGame;
