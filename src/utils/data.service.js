import { LEAGUES } from "./constants";
import moment from "moment";

// leagues - json
import pl from "../assets/data/leagues/pl.json";
import efl from "../assets/data/leagues/efl.json";
import bundesliga from "../assets/data/leagues/bundesliga.json";
import brasileirao from "../assets/data/leagues/brasileirao.json";
import laliga from "../assets/data/leagues/laliga.json";
import ligue1 from "../assets/data/leagues/ligue1.json";
import serieA from "../assets/data/leagues/serieA.json";

// json - data
import worldcup from "../assets/data/worldcup.json";
import guessTheClub from "../assets/data/guessTheClub.json";

// legends - json
import legends from "../assets/data/legends/legends.json";
import manUnitedLegends from "../assets/data/legends/man-united.json";

const allData = [
  // legends
  legends,
  manUnitedLegends,
  // leagues
  pl,
  efl,
  bundesliga,
  brasileirao,
  laliga,
  ligue1,
  serieA,
  // ---
  worldcup,
  guessTheClub,
];

// fetch league information
export const fetchLeague = (id) => {
  return new Promise((resolve, reject) => {
    if (id === LEAGUES["super-league"]) {
      resolve({
        id: LEAGUES["super-league"],
        name: "Super League",
        logo: "/league-img/super.png",
      });
    }

    let gameData = allData.find((dt) => dt.id === id);
    resolve({
      id: gameData.id,
      name: gameData.name,
      logo: gameData.logo,
    });
  });
};

// fetch player by name and league id
export const fetchPlayersByName = (name, league_id) => {
  let gameData;
  if (league_id === LEAGUES["super-league"]) {
    let players = [
      ...pl.players,
      ...laliga.players,
      ...serieA.players,
      ...bundesliga.players,
      ...ligue1.players,
    ];

    let regx = new RegExp(`^.*?\\b(${name.toLowerCase()}).*?`, "g");

    const uniquePlayerData = players.filter((dt) => {
      let cmp = dt.common_name
        ? dt.common_name.toLowerCase()
        : dt.name.toLowerCase();
      if (cmp.match(regx) && dt.shirt_no && dt.foot) {
        dt.position = groupPositions(dt.position.toUpperCase());
        return dt;
      }
    });

    return uniquePlayerData.map((player) => {
      return {
        ...player,
        name: player.common_name ? player.common_name : player.name,
        age: moment().diff(moment(player.birth_date), "years"),
        // clubLogo: `/images/clubs/${player.club}.png`,
        nationFlag: `/images/flags/${player.nationFlag}`,
        clubLogo: `/images/clubs/${player.club}.png`,
      };
    });
  } else {
    gameData = allData.find((dt) => dt.id === league_id);
    let players = gameData.players;

    let regx = new RegExp(`^.*?\\b(${name.toLowerCase()}).*?`, "g");

    const uniquePlayerData = players.filter((dt) => {
      let cmp = dt.common_name
        ? dt.common_name.toLowerCase()
        : dt.name.toLowerCase();
      if (
        (cmp.match(regx) &&
          (league_id === LEAGUES["all_time_legends"] ||
            league_id === LEAGUES["man-united-legends"])) ||
        (cmp.match(regx) && dt.shirt_no && dt.foot)
      ) {
        dt.position = groupPositions(dt.position.toUpperCase());
        return dt;
      }
    });

    return uniquePlayerData.map((player) => {
      switch (league_id) {
        case LEAGUES["world-cup"]:
          return {
            ...player,
            name: player.common_name ? player.common_name : player.name,
            age: moment().diff(moment(player.birth_date), "years"),
            nationFlag: `/images/flags/${player.nationFlag}`,
          };
        case LEAGUES["all_time_legends"]:
          return {
            ...player,
            name: player.common_name ? player.common_name : player.name,
            nationFlag: player.nation,
            nation_name: player.nation,
          };
        case LEAGUES["man-united-legends"]:
          return {
            ...player,
            nationFlag: `/images/flags/${player.nationFlag}`,
          };
        default:
          return {
            ...player,
            name: player.common_name ? player.common_name : player.name,
            age: moment().diff(moment(player.birth_date), "years"),
            nationFlag: `/images/flags/${player.nationFlag}`,
            clubLogo: `/images/clubs/${player.club}.png`,
          };
      }
    });
  }
};

// fetch club by name
export const fetchClubsByName = (name, game_id) => {
  let gameData = allData.find((dt) => dt.id === game_id);
  let clubs = gameData.clubs;

  let regx = new RegExp(`^.*?\\b(${name.toLowerCase()}).*?`, "g");

  const uniqueClubData = clubs.filter((dt) => {
    let cmp = dt.club_name.toLowerCase();
    if (cmp.match(regx)) {
      return dt;
    }
  });

  return uniqueClubData.map((club) => {
    return {
      ...club,
      name: club.club_name,
      clubLogo: `/images/clubs/${club.id}.png`,
    };
  });
};

// fetch player by player id
export const fetchPlayerById = async (player_id, league_id) => {
  try {
    let gameData;
    if (league_id === LEAGUES["super-league"]) {
      let players = [
        ...pl.players,
        ...laliga.players,
        ...serieA.players,
        ...bundesliga.players,
        ...ligue1.players,
      ];

      const player = players.find((dt) => {
        if (dt.id === player_id || +dt.id === +player_id) {
          dt.position = groupPositions(dt.position.toUpperCase());
          return dt;
        }
      });
      return {
        ...player,
        name: player.common_name ? player.common_name : player.name,
        age: moment().diff(moment(player.birth_date), "years"),
        photo: player.photo_url,
        nationFlag: `/images/flags/${player.nationFlag}`,
        clubLogo: `/images/clubs/${player.club}.png`,
      };
    } else {
      gameData = allData.find((dt) => dt.id === league_id);
      let player = gameData.players.find((dt) => {
        if (dt.id === player_id || +dt.id === +player_id) {
          dt.position = groupPositions(dt.position.toUpperCase());
          return dt;
        }
      });

      if (league_id === LEAGUES["all_time_legends"]) {
        return {
          ...player,
          name: player.common_name ? player.common_name : player.name,
          photo: player.photo_url,
          nationFlag: player.nation,
          nation_name: player.nation,
        };
      } else if (league_id === LEAGUES["man-united-legends"]) {
        return {
          ...player,
          photo: player.photo_url,
          nationFlag: `/images/flags/${player.nationFlag}`,
        };
      }
      return {
        ...player,
        name: player.common_name ? player.common_name : player.name,
        age: moment().diff(moment(player.birth_date), "years"),
        photo: player.photo_url,
        nationFlag: `/images/flags/${player.nationFlag}`,
        clubLogo: `/images/clubs/${player.club}.png`,
      };
    }
  } catch (err) {
    console.log(err.message);
  }
};

// fetch club by id
export const fetchClubById = async (club_id, game_id) => {
  let gameData = allData.find((dt) => dt.id === game_id);
  let clubs = gameData.clubs;

  const club = clubs.find((dt) => {
    if (dt.id === club_id || +dt.id === +club_id) {
      return dt;
    }
  });

  return {
    ...club,
    photo: `/images/clubs/${club.id}.png`,
  };
};

// Group positions
const groupPositions = (pos) => {
  const gkRegx = /^GK$/;
  const defRegx = /^(SW|RB|RWB|LB|LWB|CB|D)$/;
  const midRegx = /^(DM|CDM|CAM|CM|LM|RM|AM|M)$/;
  const forwardRegx = /^(LW|LWM|RW|RWM|ST|FW|CF|A)$/;

  if (gkRegx.test(pos)) {
    return "GK";
  } else if (defRegx.test(pos)) {
    return "DF";
  } else if (midRegx.test(pos)) {
    return "MF";
  } else if (forwardRegx.test(pos)) {
    return "FW";
  } else {
    return pos;
  }
};
