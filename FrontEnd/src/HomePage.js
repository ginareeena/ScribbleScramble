import { useState } from "react";
import { LandingPage } from "./AppCSS";
import LandingPageComp from "./LandingPage";
import socket from "./Socket";

const Home = () => {
  const [username, setUsername] = useState("");
  const [hasUsername, setHasUsername] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (username) {
      setHasUsername(true);
      socket.auth = { username };
      socket.connect();
    } else {
      alert("please choose a valid username");
    }
  };

  return (
    <div>
      {hasUsername ? (
        <LandingPageComp />
      ) : (
        <LandingPage>
          <form onSubmit={handleSubmit}>
            <h6>please choose a username</h6>
            <input
              type="text"
              name="username"
              onChange={(evt) => setUsername(evt.target.value.trim())}
            />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </LandingPage>
      )}
    </div>
  );
};

export default Home;
