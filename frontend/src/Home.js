import "./App.css";
import { searchTrack, getAccessToken } from "./services/allApis";
import { useEffect, useState } from "react";
import Song from "./Song";
import Player from "./Player";

function Home(props) {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    getAccessToken()
      .then((data) => {
        console.log(data);
        setAccessToken(data);
      })
      .catch(setAccessToken(""));
  }, []);

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      track: query,
    };
    const response = await searchTrack(body);
    setSongs(response.items);
    setQuery("");
  };
  return (
    <div className="Home">
      <form onSubmit={onSubmit} className="login">
        <div className="spotify-search">
          <div className="input-group flex-nowrap my-1 auto-width">
            <input
              type="text"
              className="form-control"
              placeholder="Search Tracks, Artists, Songs"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              value={query}
              onChange={handleQuery}
            />
          </div>
        </div>
      </form>
      <div className="songs-body">
        {songs.map((data, index) => (
          <Song key={index} song={data} />
        ))}
      </div>
      <Player token={accessToken} />
    </div>
  );
}

export default Home;
