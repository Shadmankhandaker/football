import burgerImg from "./icons/hamburger.png";
import barChart from "./icons/bar chart.png";
import tiktokImg from "./icons/tiktok.png";
import twitterImg from "./icons/twitter.png";
import fifaImg from "./icons/fifa.png";
import playerImg from "./icons/player.png";
import footballImg from "./icons/football.png";
import calendarRight from "./icons/calendar-right.png";
import calendarLeft from "./icons/calendar-left.png";
import shirtImg from "./icons/shirt.png";
import leagueTrophy from "./icons/leaguetrophy.png";
import first_appearance from "./icons/first_appearance.png";
import fifa_group from "./icons/fifa_group.png";

export const HamburgerIcon = () => {
  return (
    <img src={burgerImg} alt="hamburger-icon" aria-label="menu toggle button" />
  );
};

export const StatsIcon = () => {
  return (
    <img src={barChart} alt="stats-icon" aria-label="stats toggle button" />
  );
};

export const LeagueTrophy = () => {
  return (
    <img
      src={leagueTrophy}
      alt="stats-icon"
      aria-label="placeholder league icon"
    />
  );
};

export const FlagIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z" />
    </svg>
  );
};

export const BootIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
      <path d="M192 159.1L224 159.1V32L192 32c-35.38 0-64 28.62-64 63.1S156.6 159.1 192 159.1zM0 415.1c0 35.37 28.62 64.01 64 64.01l32-.0103v-127.1l-32-.0005C28.62 351.1 0 380.6 0 415.1zM337.5 287.1c-35 0-76.25 13.12-104.8 31.1C208 336.4 188.3 351.1 128 351.1v128l57.5 15.98c26.25 7.25 53 13.13 80.38 15.01c32.63 2.375 65.63 .743 97.5-6.132C472.9 481.2 512 429.2 512 383.1C512 319.1 427.9 287.1 337.5 287.1zM491.4 7.252c-31.88-6.875-64.88-8.625-97.5-6.25C366.5 2.877 339.8 8.752 313.5 16L256 32V159.1c60.25 0 80 15.62 104.8 31.1c28.5 18.87 69.75 31.1 104.8 31.1C555.9 223.1 640 191.1 640 127.1C640 82.75 600.9 30.75 491.4 7.252z" />
    </svg>
  );
};

export const CakeIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M352 111.1c22.09 0 40-17.88 40-39.97S352 0 352 0s-40 49.91-40 72S329.9 111.1 352 111.1zM224 111.1c22.09 0 40-17.88 40-39.97S224 0 224 0S184 49.91 184 72S201.9 111.1 224 111.1zM383.1 223.1L384 160c0-8.836-7.164-16-16-16h-32C327.2 144 320 151.2 320 160v64h-64V160c0-8.836-7.164-16-16-16h-32C199.2 144 192 151.2 192 160v64H128V160c0-8.836-7.164-16-16-16h-32C71.16 144 64 151.2 64 160v63.97c-35.35 0-64 28.65-64 63.1v68.7c9.814 6.102 21.39 11.33 32 11.33c20.64 0 45.05-19.73 52.7-27.33c6.25-6.219 16.34-6.219 22.59 0C114.1 348.3 139.4 367.1 160 367.1s45.05-19.73 52.7-27.33c6.25-6.219 16.34-6.219 22.59 0C242.1 348.3 267.4 367.1 288 367.1s45.05-19.73 52.7-27.33c6.25-6.219 16.34-6.219 22.59 0C370.1 348.3 395.4 367.1 416 367.1c10.61 0 22.19-5.227 32-11.33V287.1C448 252.6 419.3 223.1 383.1 223.1zM352 373.3c-13.75 10.95-38.03 26.66-64 26.66s-50.25-15.7-64-26.66c-13.75 10.95-38.03 26.66-64 26.66s-50.25-15.7-64-26.66c-13.75 10.95-38.03 26.66-64 26.66c-11.27 0-22.09-3.121-32-7.377v87.38C0 497.7 14.33 512 32 512h384c17.67 0 32-14.33 32-32v-87.38c-9.91 4.256-20.73 7.377-32 7.377C390 399.1 365.8 384.3 352 373.3zM96 111.1c22.09 0 40-17.88 40-39.97S96 0 96 0S56 49.91 56 72S73.91 111.1 96 111.1z" />
    </svg>
  );
};

export const ClubIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M256-.0078C260.7-.0081 265.2 1.008 269.4 2.913L457.7 82.79C479.7 92.12 496.2 113.8 496 139.1C495.5 239.2 454.7 420.7 282.4 503.2C265.7 511.1 246.3 511.1 229.6 503.2C57.25 420.7 16.49 239.2 15.1 139.1C15.87 113.8 32.32 92.12 54.3 82.79L242.7 2.913C246.8 1.008 251.4-.0081 256-.0078V-.0078z" />
    </svg>
  );
};

export const PersonIcon = () => {
  return <img src={playerImg} alt="player-icon" />;
};

export const ArrowUp = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
      <path d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z" />
    </svg>
  );
};

export const ArrowDown = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
      <path d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z" />
    </svg>
  );
};

export const ArrowRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
};

export const CrossIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
    </svg>
  );
};

export const TikTokIcon = () => {
  return <img src={tiktokImg} alt="tiktok-icon" />;
};

export const TwitterIcon = () => {
  return <img src={twitterImg} alt="twitter-icon" />;
};

export const FifaIcon = () => {
  return <img src={fifaImg} alt="fifa-icon" />;
};

export const ShirtIcon = () => {
  return <img src={shirtImg} alt="shirt-icon" />;
};

export const HelpIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
    </svg>
  );
};

export const CalendarRightIcon = () => {
  return <img src={calendarRight} alt="calendar-next-day" />;
};
export const CalendarLeftIcon = () => {
  return <img src={calendarLeft} alt="calendar-previous-day" />;
};
export const FirstAppearance = () => {
  return (
    <img
      src={first_appearance}
      alt="first-appearance"
      style={{ filter: "invert(1)", transform: "scale(1.2)" }}
    />
  );
};
export const FifaGroup = () => {
  return (
    <img
      src={fifa_group}
      alt="fifa-world-cup-group"
      style={{ filter: "invert(1)", transform: "scale(1.2)" }}
    />
  );
};
