import React from "react";
import "./song.css";
const Song = ({ currentSong,prevSong,nextSong }) => {
       
  return (
    <div className="song-container">
        <div style={{width:"80vw",display:"flex", alignItems:"center", justifyContent:"space-around"}}>
      <img className="prev-container" src={prevSong.cover} alt={prevSong.name}></img>
      <img className="curr-container" src={currentSong.cover} alt={currentSong.name}></img>
      <img className="next-container" src={nextSong.cover} alt={nextSong.name}></img>
      </div>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
