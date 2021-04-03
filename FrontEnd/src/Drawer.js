import React, { useState, useEffect } from "react";

const Drawer = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  return (
    <div>
      <div onClick={toggle}>{title}</div>
      {open && <div>{children}</div>}
    </div>
  );
};

export default Drawer;
