import React, { useEffect, useState } from "react";
import useGame from "../../context/game";
import ModalWrapper from "../Modal";
import "./HowToPlay.css";
import { ArrowDown, ArrowUp } from "../../assets/Icons";

import { LEAGUES } from "../../utils/constants";
import { fetchPlayerById } from "../../utils/data.service";

const HowToPlay = ({ show, onClose }) => {
  const { league } = useGame();
  const [playerInfo, setPlayerInfo] = useState(null);

  const [isBraIntLeague, setIsBraIntLeague] = useState(false);
  const [isSuperLeague, setIsSuperLeague] = useState(false);
  const [isLegends, setIsLegends] = useState(false);

  useEffect(() => {
    setIsSuperLeague(false);
    if (LEAGUES["world-cup"] === league?.id) {
      fetchPlayerById(90027770, league?.id).then(
        ({
          first_name,
          nationFlag,
          position,
          foot,
          age,
          shirt_no,
          nation_name,
        }) => {
          setPlayerInfo({
            name: first_name,
            nationFlag,
            position,
            foot,
            age,
            shirt_no,
            nation_name,
          });
          setIsBraIntLeague(true);
        }
      );
    } else if (LEAGUES["premier-league"] === league?.id) {
      fetchPlayerById(90027523, league?.id).then(
        ({
          name,
          clubLogo,
          nationFlag,
          position,
          foot,
          age,
          shirt_no,
          nation_name,
          club_name,
        }) => {
          setPlayerInfo({
            name,
            clubLogo,
            nationFlag,
            position,
            foot,
            age,
            shirt_no,
            nation_name,
            club_name,
          });
          setIsBraIntLeague(false);
        }
      );
    } else if (LEAGUES["english-football-league"] === league?.id) {
      fetchPlayerById(90077085, league?.id).then(
        ({
          name,
          clubLogo,
          nationFlag,
          position,
          foot,
          age,
          shirt_no,
          nation_name,
          club_name,
        }) => {
          setPlayerInfo({
            name,
            clubLogo,
            nationFlag,
            position,
            foot,
            age,
            shirt_no,
            nation_name,
            club_name,
          });
          setIsBraIntLeague(false);
        }
      );
    } else if (LEAGUES["laliga"] === league?.id) {
      fetchPlayerById(90026339, league?.id).then(
        ({
          name,
          clubLogo,
          nationFlag,
          position,
          foot,
          age,
          shirt_no,
          nation_name,
          club_name,
        }) => {
          setPlayerInfo({
            name,
            clubLogo,
            nationFlag,
            position,
            foot,
            age,
            shirt_no,
            nation_name,
            club_name,
          });
          setIsBraIntLeague(false);
        }
      );
    } else if (LEAGUES["series-a"] === league?.id) {
      fetchPlayerById(90031484, league?.id).then(
        ({
          name,
          clubLogo,
          nationFlag,
          position,
          foot,
          age,
          shirt_no,
          nation_name,
          club_name,
        }) => {
          setPlayerInfo({
            name,
            clubLogo,
            nationFlag,
            position,
            foot,
            age,
            shirt_no,
            nation_name,
            club_name,
          });
          setIsBraIntLeague(false);
        }
      );
    } else if (LEAGUES["bundesliga"] === league?.id) {
      fetchPlayerById(90026295, league?.id).then(
        ({
          name,
          clubLogo,
          nationFlag,
          position,
          foot,
          age,
          shirt_no,
          nation_name,
          club_name,
        }) => {
          setPlayerInfo({
            name,
            clubLogo,
            nationFlag,
            position,
            foot,
            age,
            shirt_no,
            nation_name,
            club_name,
          });
          setIsBraIntLeague(false);
        }
      );
    } else if (LEAGUES["ligue-1"] === league?.id) {
      fetchPlayerById(90027501, league?.id).then(
        ({
          name,
          clubLogo,
          nationFlag,
          position,
          foot,
          age,
          shirt_no,
          nation_name,
          club_name,
        }) => {
          setPlayerInfo({
            name,
            clubLogo,
            nationFlag,
            position,
            foot,
            age,
            shirt_no,
            nation_name,
            club_name,
          });
          setIsBraIntLeague(false);
        }
      );
    } else if (LEAGUES["brasileirão"] === league?.id) {
      fetchPlayerById(90030204, league?.id).then(
        ({
          name,
          nationFlag,
          position,
          foot,
          age,
          shirt_no,
          nation_name,
          club_name,
          clubLogo,
        }) => {
          setPlayerInfo({
            name,
            nationFlag,
            position,
            foot,
            age,
            shirt_no,
            nation_name,
            club_name,
            clubLogo,
          });
        }
      );
    } else if (LEAGUES["super-league"] === league?.id) {
      fetchPlayerById(90027523, league?.id).then(
        ({
          name,
          clubLogo,
          nationFlag,
          position,
          foot,
          age,
          shirt_no,
          nation_name,
          club_name,
        }) => {
          setPlayerInfo({
            name,
            clubLogo,
            nationFlag,
            position,
            foot,
            age,
            shirt_no,
            nation_name,
            club_name,
          });
          setIsBraIntLeague(false);
          setIsLegends(false);
          setIsSuperLeague(true);
        }
      );
    } else if (LEAGUES["all_time_legends"] === league?.id) {
      fetchPlayerById("802e3ecc-e31c-46de-aa07-d74e83d1f1f2", league?.id).then(
        ({ name, nationFlag, position, foot, rating }) => {
          setPlayerInfo({
            name,
            nationFlag,
            position,
            foot,
            rating,
          });
          setIsLegends(true);
        }
      );
    } else if (LEAGUES["man-united-legends"] === league?.id) {
      fetchPlayerById("cc16bfa1-128d-43ef-b5ee-f5984632e69a", league?.id).then(
        ({ name, nationFlag, position, first_appearance }) => {
          setPlayerInfo({
            name,
            nationFlag,
            position,
            first_appearance,
          });
          setIsBraIntLeague(false);
          setIsLegends(false);
          setIsSuperLeague(false);
        }
      );
    }
  }, [league.id]);

  if (LEAGUES["guessTheClub"] === league?.id && league) {
    return (
      <ModalWrapper show={show} onClose={onClose}>
        <div className="game-guide_content">
          <h3>How to play Guess The Club</h3>
          <article>
            <p>
              Take a look at the obscured club badge and guess the club in 8
              tries.
            </p>
            <p>
              As you make your guesses you will see whether you guessed the
              league correctly to help you work it out.
            </p>
            <div className="how_to_play game-guess_club_info">
              <div>
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

                <h3 className="how_to_play game-guess_club_name">
                  MANCHESTER CITY
                </h3>
              </div>

              <div>
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

                <div className="how_to_play game-guess_club_league">
                  <img src="/league-img/pl.icon.png" alt="Premiere League" />
                </div>
              </div>
            </div>
            <div className="how_to_play game-guess_club_info">
              <div>
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

                <h3 className="how_to_play game-guess_club_name">PARIS SG</h3>
              </div>

              <div>
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

                <div className="how_to_play game-guess_club_league">
                  <img src="/league-img/ligue-1.png" alt="Ligue 1" />
                </div>
              </div>
            </div>
            <p>
              You can also click "give me a clue" if you get stuck to reveal the
              league the club plays in.
            </p>
            <p>
              Once completed you can press the back icon next to the badge to
              play previous days games or visit our menu at the top left for
              even more games to play.
            </p>
          </article>
        </div>
      </ModalWrapper>
    );
  } else if (!league || !playerInfo) return;

  return (
    <ModalWrapper show={show} onClose={onClose}>
      <div className="game-guide_content">
        <h3>
          {LEAGUES["man-united-legends"] === league?.id
            ? "How to play Guess Who? Man Utd Legends"
            : LEAGUES["world-cup"] === league?.id
            ? "How to play Guess Who? World Cup"
            : "How to play Guess Who? Football"}
        </h3>
        <article>
          <p>
            {LEAGUES["world-cup"] === league?.id
              ? "Play Guess Who? World Cup to test your knowledge of the best players in the game. The missing player will be in the squad for their national team in the 2022 World Cup."
              : LEAGUES["all_time_legends"] === league?.id
              ? "Play Guess Who? football to test your knowledge of the best players to have ever played the game. The missing player is a footballing legend and classed as one of the best of all time."
              : LEAGUES["man-united-legends"] === league?.id
              ? "Play Guess Who? Man Utd Legends to test your knowledge of Manchester United players past and present. The missing player will have played 25 games or more for Manchester United since 1980."
              : `Play Guess Who? football to test your knowledge of the best players in the game. The missing player will play for a club in the ${
                  LEAGUES["brasileirão"] === league?.id
                    ? "Brasileirão Serie A"
                    : LEAGUES["super-league"] === league?.id
                    ? "big 5 leagues"
                    : league
                    ? league.name
                    : "League"
                }*.`}
          </p>
          <p>
            There is a silhouette image of the player if you would like to
            reveal it.
          </p>
          <div className="main-guid-para">
            As you start to make your guesses, attributes will be shown to give
            you clues to who the missing player is. For example, if you guess{" "}
            {playerInfo?.name}...
            <Attributes
              playerInfo={playerInfo}
              isBraIntLeague={isBraIntLeague}
              isSuperLeague={isSuperLeague}
              isLegends={isLegends}
              league={league}
            />
            {LEAGUES["world-cup"] === league?.id
              ? `… This means that the mystery player does not play for a country in Group G. They are not Brazilian. The player is a Forward, plays with the right foot and they are under the age of 30 with a higher shirt number than 10.`
              : LEAGUES["premier-league"] === league?.id
              ? `… This means that the mystery player does not play for Liverpool and they are not Epyptian. The player is a Forward, plays with the left foot and they are under the age of ${playerInfo.age} with higher shirt number than ${playerInfo.shirt_no}.`
              : LEAGUES["english-football-league"] === league?.id
              ? `… This means that the mystery player does not play for Blackburn Rovers and they are not Chilean. The player is a Forward, plays with the right foot and they are under the age of ${playerInfo.age} with higher shirt number than ${playerInfo.shirt_no}.`
              : LEAGUES["laliga"] === league?.id
              ? `… This means that the mystery player does not play for Real Madrid and they are not Belgian. The player is a Goalkeeper, plays with the left foot and they are under the age of ${playerInfo.age} with higher shirt number than ${playerInfo.shirt_no}.`
              : LEAGUES["series-a"] === league?.id
              ? `… This means that the mystery player does not play for Napoli and they are not Italian. The player is a Midfielder, plays with the right foot and they are under the age of ${playerInfo.age} with higher shirt number than ${playerInfo.shirt_no}.`
              : LEAGUES["bundesliga"] === league?.id
              ? `… This means that the mystery player does not play for Bayern Munich and they are not German. The player is a Midfielder, plays with the right foot and they are under the age of ${playerInfo.age} with higher shirt number than ${playerInfo.shirt_no}.`
              : LEAGUES["ligue-1"] === league?.id
              ? `… This means that the mystery player does not play for PSG and they are not French. The player is a Forward, plays with the right foot and they are under the age of ${playerInfo.age} with higher shirt number than ${playerInfo.shirt_no}.`
              : LEAGUES["brasileirão"] === league?.id
              ? `… This means that the mystery player does not play for America FC and they are not Argentinian. The player is a Defender, plays with the right foot and they are under the age of ${playerInfo.age} with a higher shirt number than ${playerInfo.shirt_no}.`
              : LEAGUES["super-league"] === league?.id
              ? `… This means that the mystery player does not play for Liverpool, they are not Egyptian and they do not play in the premier league. The player is a Forward and they are under the age of ${playerInfo.age} with a higher shirt number than ${playerInfo.shirt_no}.`
              : LEAGUES["all_time_legends"] === league?.id
              ? `… This means that the mystery player is not Brazilian and plays with their Right foot. They play as a forward and have a higher FUT rating than ${playerInfo.rating}.`
              : LEAGUES["man-united-legends"] === league?.id
              ? "… This means that the mystery player is not Irish, they are a defender and they made their Man Utd debut more recently than 1982."
              : ""}
          </div>
          <p>
            <em>
              {LEAGUES["world-cup"] === league?.id
                ? "*The mystery player will be in a national team squad in the 2022 World Cup in Qatar"
                : LEAGUES["super-league"] === league?.id
                ? "*The mystery player will have made at least one appearance for a club in The Premier League, La Liga, Serie A, Ligue 1, or The Bundesliga this season."
                : LEAGUES["all_time_legends"] === league?.id
                ? "*The mystery player is now retired and one of the game's greats."
                : LEAGUES["man-united-legends"] === league?.id
                ? "*The mystery player will have made at least 25 appearances for Manchester United and made their debut more recently than 1980."
                : `*The mystery player will have made at least one appearance for a
              club in The ${league ? league.name : "League"} this season.`}
            </em>
          </p>
        </article>
      </div>
    </ModalWrapper>
  );
};

const Attributes = ({
  playerInfo,
  isBraIntLeague,
  isSuperLeague,
  isLegends,
  league,
}) => {
  if (LEAGUES["world-cup"] === league?.id) {
    return (
      <div className="game-guess_player_info guide-guess_player ">
        <div className="game-guess_player_box">G</div>
        <div className="game-guess_player_box">
          <img src={playerInfo?.nationFlag} alt={playerInfo?.nation_name} />
        </div>

        <div className="game-guess_player_box bg-success">
          {playerInfo?.position}
        </div>

        <div className="game-guess_player_box bg-success">
          {playerInfo?.foot}
        </div>

        <div className="game-guess_player_box">
          <span>{playerInfo?.age}</span> <ArrowDown />
        </div>

        <div className="game-guess_player_box">
          <span>{playerInfo?.shirt_no}</span>
          <ArrowUp />
        </div>
      </div>
    );
  } else if (isBraIntLeague) {
    return (
      <div className="game-guess_player_info guide-guess_player col-5">
        <div className="game-guess_player_box">
          <img src={playerInfo?.nationFlag} alt={playerInfo?.nation_name} />
        </div>

        <div className="game-guess_player_box bg-success">
          {playerInfo?.position}
        </div>

        <div className="game-guess_player_box bg-success">
          {playerInfo?.foot}
        </div>

        <div className="game-guess_player_box">
          <span>{playerInfo?.age}</span> <ArrowDown />
        </div>

        <div className="game-guess_player_box">
          <span>{playerInfo?.shirt_no}</span>
          <ArrowUp />
        </div>
      </div>
    );
  } else if (isLegends) {
    return (
      <div className="game-guess_player_info guide-guess_player col-4">
        <div className="game-guess_player_box">
          <img src={playerInfo?.nationFlag} alt="nation-flag" />
        </div>

        <div className="game-guess_player_box bg-success">
          {playerInfo?.position}
        </div>

        <div className="game-guess_player_box bg-success">
          {playerInfo?.foot}
        </div>
        <div className="game-guess_player_box">
          <span>{playerInfo?.rating}</span>
          <ArrowUp />
        </div>
      </div>
    );
  } else if (league?.id === LEAGUES["man-united-legends"]) {
    return (
      <div className="game-guess_player_info guide-guess_player col-3">
        <div className="game-guess_player_box">
          <img src={playerInfo?.nationFlag} alt="nation-flag" />
        </div>

        <div className="game-guess_player_box bg-success">
          {playerInfo?.position}
        </div>
        <div className="game-guess_player_box">
          <span>{playerInfo?.first_appearance}</span>
          <ArrowUp />
        </div>
      </div>
    );
  } else {
    return (
      <div className="game-guess_player_info guide-guess_player">
        <div className="game-guess_player_box">
          <img src={playerInfo?.clubLogo} alt={playerInfo?.club_name} />
        </div>

        <div className="game-guess_player_box">
          <img src={playerInfo?.nationFlag} alt={playerInfo?.nation_name} />
        </div>
        {isSuperLeague && (
          <div className="game-guess_player_box">
            <img src="/league-img/pl.icon.png" alt="Premiere League" />
          </div>
        )}
        <div className="game-guess_player_box bg-success">
          {playerInfo?.position}
        </div>
        {!isSuperLeague && (
          <div className="game-guess_player_box bg-success">
            {playerInfo?.foot}
          </div>
        )}

        <div className="game-guess_player_box">
          <span>{playerInfo?.age}</span> <ArrowDown />
        </div>

        <div className="game-guess_player_box">
          <span>{playerInfo?.shirt_no}</span>
          <ArrowUp />
        </div>
      </div>
    );
  }
};

export default HowToPlay;
