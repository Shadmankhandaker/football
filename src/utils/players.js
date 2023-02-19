// leagues - json
import superLeague from "../libs/solutions/leagues/super-league.json";
import premierLegue from "../libs/solutions/leagues/premier-league.json";
import laliga from "../libs/solutions/leagues/laliga.json";
import ligue1 from "../libs/solutions/leagues/ligue-1.json";
import serieA from "../libs/solutions/leagues/serie-a.json";
import efl from "../libs/solutions/leagues/efl.json";
import bundesliga from "../libs/solutions/leagues/bundesliga.json";
import brasileirao from "../libs/solutions/leagues/brasileirao.json";

import worldCup from "../libs/solutions/world-cup.json";

export default {
  //world cup//
  "league-101": {
    gameSolutions: superLeague,
  },
  "league-25": {
    gameSolutions: worldCup,
  },
  //premier league//
  "league-1": {
    gameSolutions: premierLegue,
  },
  // //
  "league-100": {
    gameSolutions: {},
  },
  "league-1001": {
    gameSolutions: {},
  },
  //la liga//
  "league-4": {
    gameSolutions: laliga,
  },
  //serie a//
  "league-6": {
    gameSolutions: serieA,
  },
  //bundesliga//
  "league-2": {
    gameSolutions: bundesliga,
  },
  //ligue 1//
  "league-13": {
    gameSolutions: ligue1,
  },
  //efl//
  "league-34": {
    gameSolutions: efl,
  },
  //brazil//
  "league-15": {
    gameSolutions: brasileirao,
  },
  //guess the club//
  "league-gtc009": {
    gameSolutions: {},
  },
};
