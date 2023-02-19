import { useEffect, useMemo, useState } from "react";
import ModalWrapper from "../Modal";
import useGame from "../../context/game";
import { MAX_GUESS_COUNT, LEAGUES } from "../../utils/constants";
import shareImg from "../../assets/share.png";
import "./Stats.css";
import { getLocalStorageState } from "../../utils/functions";
import { fetchLeague } from "../../utils/data.service";

import { CopyToClipboard } from "react-copy-to-clipboard";

function isFloat(x) {
  if (x && !!(x % 1)) {
    return Number(x.toFixed(2));
  } else {
    return x;
  }
}

const Stats = ({ showStats, closeStats }) => {
  const {
    userStatsObj,
    winDistribution,
    gameOver,
    gameNo,
    guessList,
    league,
    lastGame,
  } = useGame();

  const win = winDistribution?.some((val) => val === 1);

  if (lastGame) return;
  return (
    <ModalWrapper show={showStats} onClose={closeStats}>
      <h4>Statistics</h4>
      <div className="stats-info">
        <div>
          <span>{userStatsObj?.totalTries ? userStatsObj.totalTries : 0}</span>
          <span>Total tries</span>
        </div>
        <div>
          <span>
            {userStatsObj?.successRate ? isFloat(userStatsObj.successRate) : 0}%
          </span>
          <span>Success rate</span>
        </div>
        <div>
          <span>
            {userStatsObj?.currentStreak ? userStatsObj.currentStreak : 0}
          </span>
          <span>Current streak</span>
        </div>
        <div>
          <span>{userStatsObj?.bestStreak ? userStatsObj.bestStreak : 0}</span>
          <span>Best streak</span>
        </div>
      </div>
      {gameOver && winDistribution?.length === MAX_GUESS_COUNT && (
        <>
          <ShareButton
            stats={userStatsObj}
            gameNo={gameNo}
            league={league}
            guessList={guessList}
          />
          <h4>Guess Distribution</h4>
          <div
            className={`stats-guess_distribution ${
              !win ? "block_all_full" : ""
            } `}
          >
            {winDistribution.map((dist, idx) => (
              <div
                key={idx}
                className={`stats-guess_distribution_block ${
                  dist === 1 ? "block_full" : ""
                }`}
              >
                <span className="first">{idx + 1}</span>
                <span className="second">{dist}</span>
              </div>
            ))}
          </div>
          <GameCountdown league={league} />
          <NextGame league={league} />
        </>
      )}
    </ModalWrapper>
  );
};

export default Stats;

const NextGame = ({ league }) => {
  let [nextLeagueInfo, setNextLeagueInfo] = useState(null);
  useEffect(() => {
    let nextLeague = getLocalStorageState(league?.id);
    if (nextLeague) {
      fetchLeague(nextLeague.id).then((data) => {
        setNextLeagueInfo({
          ...data,
          ...nextLeague,
        });
      });
    } else {
      setNextLeagueInfo({
        slug: "https://www.footballwordle.com",
        name: "Football Wordle",
        logo: "/images/football.png",
      });
    }
  }, [league]);

  if (!nextLeagueInfo) return;

  return (
    <div className="stats_next-btn">
      <h2> Play Another Game </h2>
      <a href={nextLeagueInfo.slug} className="stats_next-game">
        <div>
          <img
            src={nextLeagueInfo.logo}
            alt={nextLeagueInfo.name}
            style={nextLeagueInfo.style ? { width: "1rem" } : {}}
          />
          <span> {nextLeagueInfo.name} </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="transparent"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
};

const GameCountdown = ({ league }) => {
  const { gameEnded } = useGame();
  const [time, setTime] = useState(null);

  useEffect(() => {
    let interval;
    if (gameEnded) {
      interval = setInterval(() => {
        const midnight = new Date();
        midnight.setHours(24);
        midnight.setMinutes(0);
        midnight.setSeconds(0);
        midnight.setMilliseconds(0);

        const countdown = midnight - Date.now();
        const seconds = Math.floor(countdown / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        setTime({
          seconds: (seconds % 60).toString().padStart(2, 0),
          minutes: (minutes % 60).toString().padStart(2, 0),
          hours: hours.toString().padStart(2, 0),
        });
      }, 1000);
    }
    () => {
      setTime(null);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameEnded]);

  if (!time) return;
  return (
    <div className="stats-timer">
      <div>
        {league.id === LEAGUES["guessTheClub"]
          ? "New club in"
          : "New footballer in"}
        <span> {`${time.hours}:${time.minutes}:${time.seconds}`}</span>
      </div>
    </div>
  );
};

const ShareButton = ({ gameNo, stats, league, guessList }) => {
  const [success, setSuccess] = useState({
    winAt: 0,
    total: 0,
  });

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let winAt = stats.winDistribution.findIndex((val) => val === 1);

    if (winAt !== -1) {
      setSuccess({
        winAt: winAt + 1,
        total: stats.winDistribution.length,
      });
    } else {
      setSuccess({
        winAt: "X",
        total: stats.winDistribution.length,
      });
    }

    stats.successRate = isFloat(stats.successRate);
  }, [stats, league]);

  let showDestro = useMemo(() => {
    let displayEntries = [];
    if (league.id === LEAGUES["world-cup"]) {
      guessList.map((gs) => {
        let tmp = "";

        if (gs.guessCheck.nation) tmp += "🟢";
        else tmp += "⚪";

        if (gs.guessCheck.position) tmp += "🟢";
        else tmp += "⚪";

        if (gs.guessCheck.foot) tmp += "🟢";
        else tmp += "⚪";

        if (gs.guessCheck.age.equal) tmp += "🟢";
        else if (gs.guessCheck.age.greater) {
          tmp += "⬇️";
        } else tmp += "⬆️";

        if (gs.guessCheck.shirt_no.equal) {
          tmp += "🟢";
        } else if (gs.guessCheck.shirt_no.greater) {
          tmp += "⬇️";
        } else tmp += "⬆️";

        displayEntries.push(tmp);
      });

      return [...displayEntries].reverse().join("\n");
    } else if (league.id === LEAGUES["guessTheClub"]) {
      guessList.map((gs) => {
        let tmp = "";

        if (gs.guessCheck.club) tmp += "🟢";
        else tmp += "⚪";

        displayEntries.push(tmp);
      });

      return [...displayEntries].reverse().join("\n");
    } else if (league.id === LEAGUES["all_time_legends"]) {
      guessList.map((gs) => {
        let tmp = "";

        if (gs.guessCheck.nation) tmp += "🟢";
        else tmp += "⚪";

        if (gs.guessCheck.position) tmp += "🟢";
        else tmp += "⚪";

        if (gs.guessCheck.foot) tmp += "🟢";
        else tmp += "⚪";

        if (gs.guessCheck.rating.equal) {
          tmp += "🟢";
        } else if (gs.guessCheck.rating.greater) {
          tmp += "⬇️";
        } else tmp += "⬆️";

        displayEntries.push(tmp);
      });

      return [...displayEntries].reverse().join("\n");
    } else if (league.id === LEAGUES["man-united-legends"]) {
      guessList.map((gs) => {
        let tmp = "";

        if (gs.guessCheck.nation) tmp += "🟢";
        else tmp += "⚪";

        if (gs.guessCheck.position) tmp += "🟢";
        else tmp += "⚪";

        if (gs.guessCheck.first_appearance.equal) {
          tmp += "🟢";
        } else if (gs.guessCheck.first_appearance.greater) {
          tmp += "⬇️";
        } else tmp += "⬆️";

        displayEntries.push(tmp);
      });

      return [...displayEntries].reverse().join("\n");
    } else {
      guessList.map((gs) => {
        let tmp = "";

        if (gs.guessCheck.club) tmp += "🟢";
        else tmp += "⚪";

        if (gs.guessCheck.nation) tmp += "🟢";
        else tmp += "⚪";

        if (gs.guessCheck.position) tmp += "🟢";
        else tmp += "⚪";

        if (gs.guessCheck.foot) tmp += "🟢";
        else tmp += "⚪";

        if (gs.guessCheck.age.equal) tmp += "🟢";
        else if (gs.guessCheck.age.greater) {
          tmp += "⬇️";
        } else tmp += "⬆️";

        if (gs.guessCheck.shirt_no.equal) {
          tmp += "🟢";
        } else if (gs.guessCheck.shirt_no.greater) {
          tmp += "⬇️";
        } else tmp += "⬆️";

        displayEntries.push(tmp);
      });

      return [...displayEntries].reverse().join("\n");
    }
  }, [guessList]);

  return (
    <div className="game-share">
      <CopyToClipboard
        text={`GuessWho Football ${success.winAt}/${success.total}
${league.name} #${gameNo}

Total tries: ${stats.totalTries}
Success rate: ${stats.successRate}%
Current streak:${stats.currentStreak}
Best streak:${stats.bestStreak}

${showDestro}
      
https://www.guesswhofootball.com${window.location.pathname}`}
        onCopy={() => setIsCopied(true)}
      >
        <button>
          <img src={shareImg} alt="share button" />
        </button>
      </CopyToClipboard>

      <p className={`isCopied ${isCopied ? "active" : ""}`}>
        {" "}
        {isCopied ? "Copied!" : ""}{" "}
      </p>
    </div>
  );
};
