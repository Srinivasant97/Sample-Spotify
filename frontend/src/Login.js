import "./App.css";
import { logIn } from "./services/allApis";

function Login() {
  const handleLogin = async () => {
    //const response = await logIn();
    window.location = "http://localhost:8001/login";
  };
  return (
    <div className="Login">
      <button className="login-button" onClick={handleLogin}>
        Login to Spotify
      </button>
    </div>
  );
}

export default Login;
