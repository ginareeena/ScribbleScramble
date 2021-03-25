import { useState, useEffect } from "react";
import { LandingPage } from "./AppCSS";

const Username = () => {
  const [username, setUsername] = useState("");
  const [hasUsername, setHasUsername] = useState(false);

  // useEffect( () => {
  //   // setUsernameSelected(true)
  // }, [username])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //need to control for just spaces!
    if (username !== "") {
      setHasUsername(true);
      console.log("username is ", username, hasUsername);
    } else {
      alert("you didn't actually choose one tho...");
    }
  };

  return (
    <div>
      <LandingPage>
        <form onSubmit={handleSubmit}>
          <h6>please choose a username</h6>
          <input
            type="text"
            name="username"
            onChange={(evt) => setUsername(evt.target.value)}
          />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </LandingPage>
    </div>
  );
};

export default Username;
