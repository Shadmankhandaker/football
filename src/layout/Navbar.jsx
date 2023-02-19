import { useState, useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import {
  CrossIcon,
  HamburgerIcon,
  HelpIcon,
  StatsIcon,
  ArrowRight,
  TikTokIcon,
  TwitterIcon,
} from "../assets/Icons";
import useGame from "../context/game";
import Stats from "../components/Stats/Stats";
import HowToPlay from "../components/HowToPlay/HowToPlay";
import "./Navbar.css";
import { getColorForLeague } from "../utils/functions";
import { LEAGUES_LIST_NAV, LEAGUES } from "../utils/constants";
import Contact from "../components/Contact/Contact";

export default function Navbar() {
  const { setShowStats, lastGame, league } = useGame();
  const [isGamePage, setIsGamePage] = useState(false);
  const [inHomePageGame, setIsHomePageGame] = useState(true);
  const [openNav, setOpenNav] = useState(false);
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
  const closeStats = () => setShowStats(false);
  const openStats = () => setShowStats(true);

  const openNavHandle = () => !openNav && setOpenNav(true);
  const closeNavHandle = () => openNav && setOpenNav(false);

  useEffect(() => {
    setIsGamePage(location.pathname.includes("/game/"));
    setIsHomePageGame(location.pathname === "/");
  }, [location]);

  useEffect(() => {
    if (isGamePage && league) {
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
  }, [league, isGamePage]);

  return (
    <nav>
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

      <StatsModal closeStats={closeStats} />
      <div
        className={`container nav_items ${!isGamePage ? "home-layout" : ""}`}
      >
        <div
          className={`nav_head ${
            league?.id !== LEAGUES["premier-league"] ? "nav_head-others" : ""
          }`}
        >
          <button className="hamburger_menu-mobile" onClick={openNavHandle}>
            <HamburgerIcon />
          </button>
          <a
            href="/"
            className="site_title"
            style={
              inHomePageGame
                ? {
                    position: "absolute",
                    width: "auto",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }
                : {}
            }
          >
            <span>
              Guess <span className="green-text">Who?</span>
            </span>{" "}
            Football
          </a>
          {inHomePageGame && (
            <div className="nav_btn_wrapper" style={{ marginLeft: "auto" }}>
              <StatsBtn openStats={openStats} lastGame={lastGame} />
              <HelpBtn />
            </div>
          )}
        </div>
        {isGamePage && <LeagueLogo isGamePage={isGamePage} />}
        {isGamePage && (
          <div className="nav_btn_wrapper">
            <StatsBtn openStats={openStats} lastGame={lastGame} />
            <HelpBtn />
          </div>
        )}
        <MobileNav
          closeNavHandle={closeNavHandle}
          openNav={openNav}
          isGamePage={isGamePage}
          inHomePageGame={inHomePageGame}
          openStats={openStats}
          lastGame={lastGame}
        />
      </div>
    </nav>
  );
}

const LeagueLogo = memo(() => {
  const { league } = useGame();

  if (!league) return;
  return (
    <div className="league_title">
      <img
        className="logo"
        src={league.logo}
        alt={league.name}
        style={league.id === LEAGUES["world-cup"] ? { width: "20px" } : {}}
      />
      <div
        className={`league_name ${
          league.id === LEAGUES["premier-league"] ? "pl_name" : ""
        }`}
      >
        {league.name}
      </div>
    </div>
  );
});

const StatsBtn = memo(({ openStats, lastGame }) => {
  const { league } = useGame();
  if (lastGame) return;
  if (!league) return;
  return (
    <button className="player_stats_btn" onClick={openStats}>
      <StatsIcon />
    </button>
  );
});
const StatsBtnMob = memo(({ openStats, lastGame, closeNav }) => {
  if (lastGame) return;

  return (
    <button
      className="player_stats_btn"
      onClick={() => {
        openStats();
        closeNav();
      }}
    >
      <StatsIcon />
    </button>
  );
});

const StatsModal = memo(({ closeStats }) => {
  const { showStats } = useGame();
  return <Stats showStats={showStats} closeStats={closeStats} />;
});

const HelpBtn = memo(() => {
  const { league, showHelpbox, setShowHelpbox } = useGame();
  const closeHelpBox = () => setShowHelpbox(false);
  const openHelpBox = () => setShowHelpbox(true);
  if (!league) return;

  return (
    <>
      <button className="help_btn" onClick={openHelpBox}>
        <HelpIcon />
      </button>
      <HowToPlay show={showHelpbox} onClose={closeHelpBox} />
    </>
  );
});
const HelpBtnMob = memo(({ closeNav }) => {
  const { league, setShowHelpbox } = useGame();
  const openHelpBox = () => setShowHelpbox(true);
  if (!league) return;

  return (
    <>
      <button
        className="help_btn"
        onClick={() => {
          openHelpBox();
          closeNav();
        }}
      >
        <HelpIcon />
      </button>
    </>
  );
});
const ContactBtnMob = memo(({ closeNav }) => {
  const { showContactForm, setShowContactForm } = useGame();
  const openContactForm = () => setShowContactForm(true);
  const closeContactForm = () => setShowContactForm(false);

  return (
    <>
      <button
        className="nav_contact"
        onClick={() => {
          openContactForm();
          closeNav();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        <span>Contact</span>
      </button>
      <Contact show={showContactForm} onClose={closeContactForm} />
    </>
  );
});

const MobileNav = memo(
  ({
    openNav,
    closeNavHandle,
    isGamePage,
    inHomePageGame,
    openStats,
    lastGame,
  }) => {
    useEffect(() => {
      if (openNav) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }, [openNav]);

    return (
      <div
        className={`nav_menu-mobile_wrapper ${openNav ? "show-nav" : ""}`}
        onClick={closeNavHandle}
      >
        <div
          className={`nav_menu-mobile ${openNav ? "show-nav" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="nav_menu-mobile-head">
            <button className="nav_menu-mobile-close" onClick={closeNavHandle}>
              <CrossIcon />
            </button>

            {(isGamePage || inHomePageGame) && (
              <div className="nav_btn_wrapper-mobile">
                <HelpBtnMob closeNav={closeNavHandle} />
                <StatsBtnMob
                  openStats={openStats}
                  lastGame={lastGame}
                  closeNav={closeNavHandle}
                />
              </div>
            )}
          </div>
          <div className="nav_menu-mobile-leagues">
            {LEAGUES_LIST_NAV.map((league) => {
              return (
                <NavMenusMobile
                  key={league.name}
                  league={league}
                  closeNavHandle={closeNavHandle}
                />
              );
            })}
          </div>
          <div className="nav_menu-mobile-footer">
            <div className="nav_footer-social_links footer-social_links">
              <a
                href="https://twitter.com/GuessWhoFootbal"
                target="_blank"
                rel="noopener"
                aria-label="Tiktok"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://www.tiktok.com/@guesswhofootball.com"
                target="_blank"
                rel="noopener"
                aria-label="Twitter"
              >
                <TikTokIcon />
              </a>
            </div>
            <ContactBtnMob closeNav={closeNavHandle} />
          </div>
        </div>
      </div>
    );
  }
);

const NavMenusMobile = ({ league, closeNavHandle }) => {
  const [showChilds, setShowShilds] = useState(false);

  if (league.nested) {
    return (
      <div
        className="nav_menu-mobile-league-nested"
        onClick={() => setShowShilds((prev) => !prev)}
      >
        <div className="nav_menu-mobile-league-wrapper">
          <div className="nav_menu-mobile-league">
            <img
              className={league.class ? league.class : ""}
              src={league.img.default}
              alt={league.name}
            />

            <span className="user-select-0"> {league.name} </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            style={{
              transitionProperty: "all",
              transitionTimingFunction: "linear",
              transitionDuration: league.games.length * 0.05 + "s",
              transform: showChilds && "rotate(90deg)",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div
          className={`nav_menu-mobile-league-wrapper-childs ${
            showChilds ? "show" : ""
          }`}
          style={{
            transitionDuration: league.games.length * 0.05 + "s",
          }}
        >
          {league.games.map((game) => (
            <a
              key={game.name}
              href={game.slug}
              rel="noopener noreferrer"
              className="nav_menu-mobile-league-wrapper"
              onClick={closeNavHandle}
            >
              <div className="nav_menu-mobile-league">
                <img
                  className={game.class ? game.class : ""}
                  src={game.img.default}
                  alt={game.name}
                />

                <span className="user-select-0"> {game.name} </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <a
        key={league.name}
        href={league.slug}
        rel="noopener noreferrer"
        className="nav_menu-mobile-league-wrapper"
        onClick={closeNavHandle}
      >
        <div className="nav_menu-mobile-league">
          <img
            className={league.class ? league.class : ""}
            src={league.img.default}
            alt={league.name}
          />

          <span className="user-select-0"> {league.name} </span>
        </div>
        <ArrowRight />
      </a>
    );
  }
};
