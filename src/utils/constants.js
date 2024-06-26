export const MAX_GUESS_COUNT = 8;
export const MAX_CLUE_COUNT = 3;
export const MAX_CLUE_COUNT_BRA_INT = 1;

export const LEAGUES = {
  "super-league": 101,
  "world-cup": 25,
  "premier-league": 1,
  all_time_legends: 100,
  "man-united-legends": 1001,
  "english-football-league": 34,
  laliga: 4,
  "series-a": 6,
  bundesliga: 2,
  "ligue-1": 13,
  brasileirão: 15,
  guessTheClub: "gtc009",
};

export const LEAGUES_LIST = [
  {
    id: 101,
    name: "Big 5 Leagues",
    slug: "/",
    img: require("../assets/flags/super.png"),
    logo: "/league-img/super.png",
  },
  {
    id: 100,
    name: "Legends",
    slug: "/game/all_time_legends",
    img: require("../assets/flags/legends.png"),
    logo: "/league-img/legends.png",
  },
  {
    id: 25,
    name: "World Cup",
    slug: "/game/world-cup",
    img: require("../assets/flags/world.png"),
    logo: "/league-img/wc.png",
    style: { width: "62px" },
  },
  {
    id: 1,
    name: "Premier League",
    slug: "/game/premier-league",
    img: require("../assets/flags/eng.png"),
    logo: "/league-img/pl.icon.png",
    logoSecondary: "/league-img/pl-secondary.icon.png",
  },
  {
    id: 34,
    name: "EFL Championship",
    slug: "/game/english-football-league",
    img: require("../assets/flags/engefl.png"),
    logo: "/league-img/efl.png",
  },
  {
    id: 4,
    name: "Laliga",
    slug: "/game/laliga",
    img: require("../assets/flags/spain.png"),
    logo: "/league-img/laliga.icon.png",
    logoSecondary: "/league-img/laliga-secondary.icon.png",
  },
  {
    id: 6,
    name: "Serie A",
    slug: "/game/series-a",
    img: require("../assets/flags/Ita.png"),
    logo: "/league-img/serie-a.png",
  },
  {
    id: 2,
    name: "Bundesliga",
    slug: "/game/bundesliga",
    img: require("../assets/flags/ger.png"),
    logo: "/league-img/bundesliga.png",
  },
  {
    id: 13,
    name: "Ligue 1",
    slug: "/game/ligue-1",
    img: require("../assets/flags/fra.png"),
    logo: "/league-img/ligue-1.png",
  },
  {
    id: 15,
    name: "Brasileirão",
    slug: "/game/brasileirão",
    img: require("../assets/flags/bra.png"),
    logo: "/league-img/brasileirao.png",
  },
  {
    id: 1001,
    name: "Man Utd Legends",
    slug: "/game/man-united-legends",
    img: { default: "/league-img/man-u.png" },
    logo: "/league-img/man-u.png",
    hide: true,
  },
  {
    id: "gtc009",
    name: "Guess The Club Badge",
    slug: "/game/guessTheClub",
    img: require("../assets/flags/gtc.jpg"),
    logo: "/league-img/guesstheclub.png",
    hide: true,
  },
];

export const LEAGUES_LIST_NAV = [
  {
    name: "Guess Who Football",
    img: require("../assets/player.png"),
    nested: true,
    games: [
      {
        id: 101,
        name: "Big 5 Leagues",
        slug: "/",
        img: require("../assets/flags/super.png"),
        logo: "/league-img/super.png",
      },
      {
        id: 25,
        name: "World Cup",
        slug: "/game/world-cup",
        img: require("../assets/flags/world.png"),
        logo: "/league-img/wc.png",
        style: { width: "62px" },
      },
      {
        id: 13,
        name: "Premier League",
        slug: "/game/premier-league",
        img: require("../assets/flags/eng.png"),
        logo: "/league-img/pl.icon.png",
        logoSecondary: "/league-img/pl-secondary.icon.png",
      },
      {
        id: 14,
        name: "EFL Championship",
        slug: "/game/english-football-league",
        img: require("../assets/flags/engefl.png"),
        logo: "/league-img/efl.png",
      },
      {
        id: 53,
        name: "Laliga",
        slug: "/game/laliga",
        img: require("../assets/flags/spain.png"),
        logo: "/league-img/laliga.icon.png",
        logoSecondary: "/league-img/laliga-secondary.icon.png",
      },
      {
        id: 31,
        name: "Serie A",
        slug: "/game/series-a",
        img: require("../assets/flags/Ita.png"),
        logo: "/league-img/serie-a.png",
      },
      {
        id: 19,
        name: "Bundesliga",
        slug: "/game/bundesliga",
        img: require("../assets/flags/ger.png"),
        logo: "/league-img/bundesliga.png",
      },
      {
        id: 16,
        name: "Ligue 1",
        slug: "/game/ligue-1",
        img: require("../assets/flags/fra.png"),
        logo: "/league-img/ligue-1.png",
      },
      {
        id: 15,
        name: "Brasileirão",
        slug: "/game/brasileirão",
        img: require("../assets/flags/bra.png"),
        logo: "/league-img/brasileirao.png",
      },
    ],
  },
  {
    name: "Guess Who Football Legends",
    img: require("../assets/flags/legends.png"),
    nested: true,
    games: [
      {
        id: 100,
        name: "All Time Legends",
        slug: "/game/all_time_legends",
        img: require("../assets/flags/legends.icon.png"),
        logo: "/league-img/legends.png",
        class: "nav_menu-mobile_legendsBall",
      },
      {
        id: 1001,
        name: "Man Utd Legends",
        slug: "/game/man-united-legends",
        img: { default: "/league-img/man-u.png" },
        logo: "/league-img/man-u.png",
      },
    ],
  },
  {
    name: "Guess The Club Badge",
    slug: "/game/guessTheClub",
    img: require("../assets/flags/guesstheclub.png"),
    nested: false,
  },
  {
    name: "Football Wordle",
    img: require("../assets/flags-nav/football.png"),
    nested: true,
    class: "nav_menu-mobile_football-img",
    games: [
      {
        id: 11,
        name: "World Cup",
        slug: "https://www.worldcupwordle.com/",
        img: require("../assets/flags/world.png"),
        logo: "/league-img/wc.png",
        style: { width: "62px" },
      },
      {
        id: 1,
        name: "Big 5 Leagues",
        slug: "https://www.footballwordle.com/",
        img: require("../assets/flags/super.png"),
        logo: "/league-img/super.png",
      },
      {
        id: 680,
        name: "Man Utd",
        slug: "https://www.footballwordle.com/game/manchester-united",
        img: { default: "/league-img/man-u.png" },
        logo: "/league-img/man-u.png",
      },
      {
        id: 681,
        name: "Man City",
        slug: "https://www.footballwordle.com/game/manchester-city",
        img: { default: "/league-img/man-city.png" },
        logo: "/league-img/man-city.png",
      },
      {
        id: 682,
        name: "Liverpool FC",
        slug: "https://www.footballwordle.com/game/liverpool",
        img: { default: "/league-img/liverpool.png" },
        logo: "/league-img/liverpool.png",
      },
    ],
  },
];
