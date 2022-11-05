var express = require("express");
var cors = require("cors");
var SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();
var app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

app.get("/login", (req, res) => {
  var state = "asdfghgfdsaASDS";
  var scope = [
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "playlist-read-private",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-read-playback-state",
    "user-modify-playback-state",
    "streaming",
    "user-read-email",
  ];

  var authorizeURL = spotifyApi.createAuthorizeURL(scope, state);
  res.redirect(authorizeURL);
});

app.get("/getAccessToken", (req, res) => {
  res.send(spotifyApi.getAccessToken());
});

app.get("/callback", (req, res) => {
  const code = req.query.code;
  if (spotifyApi.getAccessToken()) {
    return res.status(200).send("Token Already Exist");
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const token = {
        accessToken: data.body["access_token"],
        refreshToken: data.body["refresh_token"],
      };
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.setRefreshToken(data.body["refresh_token"]);
      res.redirect("http://localhost:3000/Home");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/searchTrack", (req, res) => {
  const track = req.body.track;
  spotifyApi.searchTracks(track).then(
    function (data) {
      res.status(200).send(data.body.tracks);
    },
    function (err) {
      res.status(400).send("Something went wrong!", err);
    }
  );
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is Started", process.env.SERVER_PORT);
});
