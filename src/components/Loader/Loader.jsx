import React from "react";
import useGame from "../../context/game";

const Loader = () => {
  const { loading } = useGame();
  if (!loading) return;
  return (
    <div className="loader-wrapper">
      <div className="loader-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
