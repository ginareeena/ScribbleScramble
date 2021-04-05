import React, { useState, useEffect } from "react";

import { DrawerTitle, DrawerH4 } from "./AppCSS";

const Drawer = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  return (
    <div>
      {/* <div onClick={toggle}>{title}</div> */}
      <DrawerTitle onClick={toggle}>
        <DrawerH4>{title}</DrawerH4>
        <img
          style={{
            width: "15px",
            marginLeft: "2px",
          }}
          src="/images/drawericon.png"
        />
      </DrawerTitle>
      {open && <div>{children}</div>}
    </div>
  );
};

export default Drawer;
