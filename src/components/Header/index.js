import React from "react";
import logo from "logo.svg";
import "./index.css";

const Link = ({ children, ...props }) => (
  <button
    className="h-full ml-4 flex items-center hover:border-b-4 border-red-200"
    {...props}
  >
    {children}
  </button>
);

const Header = (props) => {
  const links = React.useMemo(
    () => [
      { label: "MEN" },
      { label: "WOMEN" },
      { label: "KIDS" },
      { label: "HOME & LIVING" },
      { label: "OFFERS" },
    ],
    [],
  );
  return (
    <header className="header-root bg-white">
      <span className="text-3xl font-bold">M</span>
      <div className="h-full flex items-center">
        {links.map((link) => (
          <Link>{link.label}</Link>
        ))}
      </div>
      <div></div>
      <div></div>
    </header>
  );
};

export default Header;
