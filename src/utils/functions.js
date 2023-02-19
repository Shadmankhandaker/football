import { LEAGUES_LIST, LEAGUES } from "./constants";

export const getSecondsBetweenDates = (startDate, endDate) =>
  (new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000;

export const hasDateChanged = (startDate, endDate) =>
  new Date(startDate).toLocaleDateString() !==
  new Date(endDate).toLocaleDateString();

export const padZeros = (val, count) =>
  typeof val === "string"
    ? val.padStart(count, 0)
    : val.toString().padStart(count, 0);

export const daysUntilToday = (_date) =>
  (new Date().getTime() - new Date(_date).getTime()) / (1000 * 3600 * 24);

export const getColorForLeague = (id) => {
  switch (id) {
    case LEAGUES["premier-league"]:
      return {
        backgroundImage: "none",
        backgroundColor: "#7C0AD6",
      };
    case LEAGUES["laliga"]:
      return {
        backgroundImage: "none",
        backgroundColor: "#CD2323",
      };
    case LEAGUES["english-football-league"]:
      return {
        backgroundImage: "none",
        backgroundColor: "#1B309F",
      };
    case LEAGUES["man-united-legends"]:
      return {
        backgroundImage: "none",
        backgroundColor: "#DA291C",
      };
    default:
      return {
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
      };
  }
};

export const getLocalStorageState = (leagueId) => {
  let nextGame = LEAGUES_LIST.find((lg) => {
    let gameState = JSON.parse(localStorage.getItem(`gameState-${lg.id}`));
    if (lg.id !== leagueId && (!gameState || !gameState.gameOver)) {
      return true;
    } else {
      return false;
    }
  });

  return nextGame;
};
