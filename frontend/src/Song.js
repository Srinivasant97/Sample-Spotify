import React from "react";

function Song(props) {
  const { song } = props;
  const playSong = () => {
    window.open(song?.external_urls?.spotify, "_blank");
  };
  return (
    <div onClick={playSong} className="songs-container">
      <img src={song?.album?.images[0]?.url} alt="" width="50" height="50" />
      <div className="song-details">
        <div className="song-name">{song.name}</div>
        <div className="song-artist">
          {song?.artists?.map((artist, index) => (
            <div key={index} className="artist-name">
              {artist.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Song;
