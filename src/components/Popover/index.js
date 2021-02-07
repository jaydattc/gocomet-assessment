import React from "react";

const Popover = ({ children, ...props }) => (
  <div className="popover-base" {...props}>
    {children}
  </div>
);
export default Popover;
