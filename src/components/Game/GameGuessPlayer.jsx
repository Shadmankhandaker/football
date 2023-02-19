import { useEffect, useState } from "react";
import {
  ClubIcon,
  FlagIcon,
  PersonIcon,
  BootIcon,
  CakeIcon,
  ArrowUp,
  ArrowDown,
  FifaIcon,
  ShirtIcon,
  LeagueTrophy,
  FirstAppearance,
  FifaGroup,
} from "../../assets/Icons";
import useGame from "../../context/game";
import { LEAGUES, LEAGUES_LIST } from "../../utils/constants";
import "./Game.css";

const GameGuessPlayers = ({ inHomePageGame }) => {
  const { guessList, league } = useGame();
  const [isBraIntLeague, setIsBraIntLeague] = useState(false);
  const [isLegendsLeague, setIsLegendsLeague] = useState(false);

  useEffect(() => {
    if (LEAGUES["world-cup"] === league?.id) {
      setIsLegendsLeague(false);
      setIsBraIntLeague(true);
    } else if (LEAGUES["all_time_legends"] === league?.id) {
      setIsLegendsLeague(true);
      setIsBraIntLeague(false);
    } else if (LEAGUES["guessTheClub"] === league?.id) {
      setIsLegendsLeague(false);
      setIsBraIntLeague(false);
    }
  }, [league]);

  if (!guessList || guessList.length <= 0 || !league) return;
  else if (LEAGUES["world-cup"] === league?.id) {
    return (
      <div className="game-guess_players_wrapper ">
        <div className="game-guess_players_heading">
          <div className="icon">
            <div className="tooltip" aria-label="Nationality">
              <span className="tooltiptext">Group</span>
              <FifaGroup />
            </div>
          </div>
          <div className="icon">
            <div className="tooltip" aria-label="Nationality">
              <span className="tooltiptext">Nationality</span>
              <FlagIcon />
            </div>
          </div>
          <div className="icon person-icon">
            <div className="tooltip" aria-label="Position">
              <span className="tooltiptext">Position</span>
              <PersonIcon />
            </div>
          </div>
          <div className="icon">
            <div className="tooltip" aria-label="Foot">
              <span className="tooltiptext">Foot</span>
              <BootIcon />
            </div>
          </div>
          <div className="icon cake-icon">
            <div className="tooltip" aria-label="Age">
              <span className="tooltiptext">Age</span>
              <CakeIcon />
            </div>
          </div>

          <div className="icon shirt-icon">
            <div className="tooltip" aria-label="Shirt Number">
              <span className="tooltiptext tooltiptext-shirt">
                Shirt Number
              </span>
              <ShirtIcon />
            </div>
          </div>
        </div>
        <div className="game-guess_players_list">
          {guessList.map((guessData) => {
            return (
              <GameGuessPlayerBox
                key={
                  guessData.guess.id +
                  "-guess-" +
                  guessData.guessCount.toString()
                }
                {...guessData}
                leagueId={league?.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else if (isBraIntLeague) {
    return (
      <div className="game-guess_players_wrapper brazil-league_wrapper">
        <div className="game-guess_players_heading col-5">
          <div className="icon">
            <div className="tooltip" aria-label="Nationality">
              <span className="tooltiptext">Nationality</span>
              <FlagIcon />
            </div>
          </div>
          <div className="icon person-icon">
            <div className="tooltip" aria-label="Position">
              <span className="tooltiptext">Position</span>
              <PersonIcon />
            </div>
          </div>
          <div className="icon">
            <div className="tooltip" aria-label="Foot">
              <span className="tooltiptext">Foot</span>
              <BootIcon />
            </div>
          </div>
          <div className="icon cake-icon">
            <div className="tooltip" aria-label="Age">
              <span className="tooltiptext">Age</span>
              <CakeIcon />
            </div>
          </div>

          <div className="icon shirt-icon">
            <div className="tooltip" aria-label="Shirt Number">
              <span className="tooltiptext tooltiptext-shirt">
                Shirt Number
              </span>
              <ShirtIcon />
            </div>
          </div>
        </div>
        <div className="game-guess_players_list">
          {guessList.map((guessData) => {
            return (
              <GameGuessPlayerBox
                key={
                  guessData.guess.id +
                  "-guess-" +
                  guessData.guessCount.toString()
                }
                {...guessData}
                isBraIntLeague={isBraIntLeague}
              />
            );
          })}
        </div>
      </div>
    );
  } else if (isLegendsLeague) {
    return (
      <div className="game-guess_players_wrapper brazil-league_wrapper">
        <div className="game-guess_players_heading col-4">
          <div className="icon">
            <div className="tooltip" aria-label="Nationality">
              <span className="tooltiptext">Nationality</span>
              <FlagIcon />
            </div>
          </div>
          <div className="icon person-icon">
            <div className="tooltip" aria-label="Position">
              <span className="tooltiptext">Position</span>
              <PersonIcon />
            </div>
          </div>
          <div className="icon">
            <div className="tooltip" aria-label="Foot">
              <span className="tooltiptext">Foot</span>
              <BootIcon />
            </div>
          </div>

          <div className="icon fifa-icon">
            <div className="tooltip" aria-label="FUT rating">
              <span className="tooltiptext">FUT rating</span>
              <FifaIcon />
            </div>
          </div>
        </div>
        <div className="game-guess_players_list">
          {guessList.map((guessData) => {
            return (
              <GameGuessPlayerBox
                key={
                  guessData.guess.id +
                  "-guess-" +
                  guessData.guessCount.toString()
                }
                {...guessData}
                isBraIntLeague={isBraIntLeague}
                isLegendsLeague={isLegendsLeague}
              />
            );
          })}
        </div>
      </div>
    );
  } else if (LEAGUES["guessTheClub"] === league?.id) {
    return (
      <div className="game-guess_clubs_wrapper">
        <div className="game-guess_players_list">
          {guessList.map((guessData) => {
            return (
              <GameGuessPlayerBox
                key={
                  guessData.guess.id +
                  "-guess-" +
                  guessData.guessCount.toString()
                }
                {...guessData}
                isGuessTheClubGame={LEAGUES["guessTheClub"] === league?.id}
                isBraIntLeague={isBraIntLeague}
                inHomePageGame={inHomePageGame}
              />
            );
          })}
        </div>
      </div>
    );
  } else if (LEAGUES["man-united-legends"] === league?.id) {
    return (
      <div className="game-guess_players_wrapper brazil-league_wrapper">
        <div className="game-guess_players_heading col-3">
          <div className="icon">
            <div className="tooltip" aria-label="Nationality">
              <span className="tooltiptext">Nationality</span>
              <FlagIcon />
            </div>
          </div>
          <div className="icon person-icon">
            <div className="tooltip" aria-label="Position">
              <span className="tooltiptext">Position</span>
              <PersonIcon />
            </div>
          </div>
          <div className="icon">
            <div className="tooltip" aria-label="Foot">
              <span className="tooltiptext">Year of first appearance</span>
              <FirstAppearance />
            </div>
          </div>
        </div>
        <div className="game-guess_players_list">
          {guessList.map((guessData) => {
            return (
              <GameGuessPlayerBox
                key={
                  guessData.guess.id +
                  "-guess-" +
                  guessData.guessCount.toString()
                }
                {...guessData}
                isBraIntLeague={false}
                isLegendsLeague={false}
                isManUtdLegends={true}
              />
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="game-guess_players_wrapper">
      <div className="game-guess_players_heading">
        <div className="icon">
          <div className="tooltip" aria-label="Club">
            <span className="tooltiptext tooltip-left">Club</span>
            <ClubIcon />
          </div>
        </div>
        <div className="icon">
          <div className="tooltip" aria-label="Nationality">
            <span className="tooltiptext">Nationality</span>
            <FlagIcon />
          </div>
        </div>
        {inHomePageGame && (
          <div className="icon league-trophy">
            <div className="tooltip" aria-label="League">
              <span className="tooltiptext">League</span>
              <LeagueTrophy />
            </div>
          </div>
        )}
        <div className="icon person-icon">
          <div className="tooltip" aria-label="Position">
            <span className="tooltiptext">Position</span>
            <PersonIcon />
          </div>
        </div>
        {!inHomePageGame && (
          <div className="icon">
            <div className="tooltip" aria-label="Foot">
              <span className="tooltiptext">Foot</span>
              <BootIcon />
            </div>
          </div>
        )}
        <div className="icon cake-icon">
          <div className="tooltip" aria-label="Age">
            <span className="tooltiptext">Age</span>
            <CakeIcon />
          </div>
        </div>

        <div className="icon shirt-icon">
          <div className="tooltip" aria-label="Shirt Number">
            <span className="tooltiptext tooltiptext-shirt">Shirt Number</span>
            <ShirtIcon />
          </div>
        </div>
      </div>
      <div className="game-guess_players_list">
        {guessList.map((guessData) => {
          return (
            <GameGuessPlayerBox
              key={
                guessData.guess.id + "-guess-" + guessData.guessCount.toString()
              }
              {...guessData}
              isBraIntLeague={isBraIntLeague}
              inHomePageGame={inHomePageGame}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameGuessPlayers;

const GameGuessPlayerBox = ({
  guess: {
    name,
    clubLogo,
    nationFlag,
    position,
    foot,
    age,
    shirt_no,
    league,
    nation_name,
    club_name,
    rating,
    first_appearance,
    group,
  },
  guessCheck,
  isBraIntLeague,
  isLegendsLeague,
  inHomePageGame,
  isGuessTheClubGame,
  isManUtdLegends,
  leagueId,
}) => {
  if (LEAGUES["world-cup"] === leagueId) {
    return (
      <div className="game-guess_player">
        <div className="game-guess_player_name">{name}</div>
        <div className="game-guess_player_info">
          <div
            className={`game-guess_player_box ${
              guessCheck.group ? "bg-success" : ""
            }`}
          >
            <span>{group ? group : "."}</span>
          </div>
          <div
            className={`game-guess_player_box ${
              guessCheck.nation ? "bg-success" : ""
            }`}
          >
            <img src={nationFlag} alt={nation_name} />
          </div>
          <div
            className={`game-guess_player_box  ${
              guessCheck.position ? " bg-success" : ""
            }`}
          >
            {position ? position : "null"}
          </div>
          <div
            className={`game-guess_player_box ${
              guessCheck.foot ? "bg-success" : ""
            }`}
          >
            {foot ? foot?.substring?.(0, 1) : "null"}
          </div>
          <div
            className={`game-guess_player_box ${
              guessCheck.age.equal ? "bg-success" : ""
            }`}
          >
            <span>{age ? age : "."}</span>
            {!guessCheck.age.equal &&
              (guessCheck.age.greater ? <ArrowDown /> : <ArrowUp />)}
          </div>

          <div
            className={`game-guess_player_box ${
              guessCheck.shirt_no.equal ? "bg-success" : ""
            }`}
          >
            <span>{shirt_no ? shirt_no : "null"}</span>
            {!guessCheck.shirt_no.equal &&
              (guessCheck.shirt_no.greater ? <ArrowDown /> : <ArrowUp />)}
          </div>
        </div>
      </div>
    );
  } else if (isBraIntLeague) {
    return (
      <div className="game-guess_player">
        <div className="game-guess_player_name">{name}</div>
        <div className="game-guess_player_info col-5">
          <div
            className={`game-guess_player_box ${
              guessCheck.nation ? "bg-success" : ""
            }`}
          >
            <img src={nationFlag} alt={nation_name} />
          </div>
          <div
            className={`game-guess_player_box  ${
              guessCheck.position ? " bg-success" : ""
            }`}
          >
            {position ? position : "null"}
          </div>
          <div
            className={`game-guess_player_box ${
              guessCheck.foot ? "bg-success" : ""
            }`}
          >
            {foot ? foot?.substring?.(0, 1) : "null"}
          </div>
          <div
            className={`game-guess_player_box ${
              guessCheck.age.equal ? "bg-success" : ""
            }`}
          >
            <span>{age ? age : "."}</span>
            {!guessCheck.age.equal &&
              (guessCheck.age.greater ? <ArrowDown /> : <ArrowUp />)}
          </div>

          <div
            className={`game-guess_player_box ${
              guessCheck.shirt_no.equal ? "bg-success" : ""
            }`}
          >
            <span>{shirt_no ? shirt_no : "null"}</span>
            {!guessCheck.shirt_no.equal &&
              (guessCheck.shirt_no.greater ? <ArrowDown /> : <ArrowUp />)}
          </div>
        </div>
      </div>
    );
  } else if (isLegendsLeague) {
    return (
      <div className="game-guess_player">
        <div className="game-guess_player_name">{name}</div>
        <div className="game-guess_player_info col-4">
          <div
            className={`game-guess_player_box ${
              guessCheck.nation ? "bg-success" : ""
            }`}
          >
            <img src={nationFlag} alt="nation-flag" />
          </div>
          <div
            className={`game-guess_player_box  ${
              guessCheck.position ? " bg-success" : ""
            }`}
          >
            {position ? position : "null"}
          </div>
          <div
            className={`game-guess_player_box ${
              guessCheck.foot ? "bg-success" : ""
            }`}
          >
            {foot ? foot?.substring?.(0, 1) : "null"}
          </div>

          <div
            className={`game-guess_player_box ${
              guessCheck.rating.equal ? "bg-success" : ""
            }`}
          >
            <span>{rating ? rating : "null"}</span>
            {!guessCheck.rating.equal &&
              (guessCheck.rating.greater ? <ArrowDown /> : <ArrowUp />)}
          </div>
        </div>
      </div>
    );
  } else if (isGuessTheClubGame) {
    return (
      <div className="game-guess_club_info">
        <div>
          {guessCheck.club ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="correct"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="wrong"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          <h3 className="game-guess_club_name">{name}</h3>
        </div>

        <div>
          {guessCheck.league ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="correct"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="wrong"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          <div className="game-guess_club_league">
            {LEAGUES_LIST.map((el) => {
              if (el.id === +league || el.id === league) {
                return <img key={el.id} src={el.logo} alt={el.name} />;
              }
            })}
          </div>
        </div>
      </div>
    );
  } else if (isManUtdLegends) {
    return (
      <div className="game-guess_player">
        <div className="game-guess_player_name">{name}</div>
        <div className="game-guess_player_info col-3">
          <div
            className={`game-guess_player_box ${
              guessCheck.nation ? "bg-success" : ""
            }`}
          >
            <img src={nationFlag} alt="nation-flag" />
          </div>
          <div
            className={`game-guess_player_box  ${
              guessCheck.position ? " bg-success" : ""
            }`}
          >
            {position ? position : "null"}
          </div>

          <div
            className={`game-guess_player_box ${
              guessCheck.first_appearance.equal ? "bg-success" : ""
            }`}
          >
            <span>{first_appearance ? first_appearance : "."}</span>
            {!guessCheck.first_appearance.equal &&
              (guessCheck.first_appearance.greater ? (
                <ArrowDown />
              ) : (
                <ArrowUp />
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-guess_player">
      <div className="game-guess_player_name">{name}</div>
      <div className="game-guess_player_info">
        <div
          className={`game-guess_player_box ${
            guessCheck.club ? "bg-success" : ""
          }`}
        >
          <img src={clubLogo} alt={club_name} />
        </div>
        <div
          className={`game-guess_player_box ${
            guessCheck.nation ? "bg-success" : ""
          }`}
        >
          <img src={nationFlag} alt={nation_name} />
        </div>
        {inHomePageGame && (
          <div
            className={`game-guess_player_box ${
              guessCheck.league ? "bg-success" : ""
            }`}
          >
            {LEAGUES_LIST.map((el) => {
              if (el.id === +league || el.id === league) {
                return <img key={el.id} src={el.logo} alt={el.name} />;
              }
            })}
          </div>
        )}
        <div
          className={`game-guess_player_box  ${
            guessCheck.position ? " bg-success" : ""
          }`}
        >
          {position ? position : "null"}
        </div>
        {!inHomePageGame && (
          <div
            className={`game-guess_player_box ${
              guessCheck.foot ? "bg-success" : ""
            }`}
          >
            {foot ? foot?.substring?.(0, 1) : "null"}
          </div>
        )}

        <div
          className={`game-guess_player_box ${
            guessCheck.age.equal ? "bg-success" : ""
          }`}
        >
          <span>{age ? age : "."}</span>
          {!guessCheck.age.equal &&
            (guessCheck.age.greater ? <ArrowDown /> : <ArrowUp />)}
        </div>

        <div
          className={`game-guess_player_box ${
            guessCheck.shirt_no.equal ? "bg-success" : ""
          }`}
        >
          <span>{shirt_no ? shirt_no : "null"}</span>
          {!guessCheck.shirt_no.equal &&
            (guessCheck.shirt_no.greater ? <ArrowDown /> : <ArrowUp />)}
        </div>
      </div>
    </div>
  );
};
