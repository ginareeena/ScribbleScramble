import React from "react";

const Username = () => {
  return (
    <form>
      <label>
        username:
        <input type="text" name="username" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Username;
