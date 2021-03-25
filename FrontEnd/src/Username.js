import React from "react";
import { LandingPage } from "./AppCSS";

const Username = () => {
  return (
    <div>
      <LandingPage>
        <form>
          <h6>please choose a username</h6>
          <input type="text" name="username" />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </LandingPage>
    </div>
  );
};

export default Username;
