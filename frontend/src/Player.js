import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

function Player(props) {
  const { token } = props;
  return <SpotifyPlayer token={token} />;
}

export default Player;
