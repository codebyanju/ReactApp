import { LOGO_URL } from "../utils/constants";
import { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
  // Never write useState Hook outside a React component or a custom Hook
  // const [btnName, setBtnName] = useState("Login");
  // const Header = () => {
  //   ...
  // }
  // Never write useState hooks inside conditions or loops or functions
  // This breaks the Rules of Hooks and creates inconsistencies in the order of Hook calls during re-renders.
  // if(true){
  //   const [btnName, setBtnName] = useState("Login");
  // }
  // State variables are meant to be created inside your functional component so that each instance of the component maintains its own state.
  // If you define a state variable outside the component, it will be shared across all instances of that component, leading to unexpected behavior. Its not a good practice
  // Always keep them on the top level of the component.
  const [loggedIn, setLoggedIn] = useState(false);

  // const [btnName, setBtnName] = useState("Login");

  // If no dependency array is provided => the useEffect runs AFTER every render of the component.
  // If dependency array is empty => the useEffect runs only once after the initial render. (Only Once)
  // If dependency array has variables => the useEffect runs after the initial render and whenever any of the dependencies change.
  useEffect(() => {}, []);

  const onLinkActive = ({ isActive }) => {
    const baseStyle = "rounded cursor-pointer";
    return isActive
      ? `${baseStyle} text-orange-500`
      : `${baseStyle} rounded cursor-pointer hover:text-orange-500`;
  };

  const onlineStatus = useOnlineStatus();

  const navLinks = [
    { link: "/", title: "Home" },
    { link: "/about", title: "About" },
    { link: "/contact", title: "Contact" },
    { link: "/grocery", title: "Grocery" },
    {
      link: "/cart",
      title: "🛒",
      // title: (prefix, postfix) => prefix + "🛒" + postfix,
      // computed: true,
    },
  ];

  // Access Context
  const { loggedinUserName } = useContext(UserContext);
  const count = 4;

  const navs = navLinks.map((nav) => (
    <li key={nav.link}>
      <NavLink to={nav.link} className={onLinkActive}>
        {nav.title}
        {nav.link == "/cart" && count > 0 && `(${count} items)`}
      </NavLink>
    </li>
  ));

  const onLogClick = () => {
    // ❌ Not recommended:
    // setLoggedIn(!loggedIn);
    // This directly uses the value of `loggedIn` from when the function started.
    // If React batches multiple state updates or if the user clicks very quickly,
    // it might toggle based on an outdated value (stale state).

    // ✅ Recommended:
    // Functional update ensures React always gives us the most recent state value,
    // even when updates are batched. This guarantees a reliable toggle.
    setLoggedIn((prev) => !prev);
  };

  return (
    <div className="shadow-sm bg-gray-50 mb-3">
      <div className="flex justify-between items-center max-w-8/10 mx-auto">
        {/* Logo */}
        <div className="w-24 p-2">
          <Link to="/">
            <img src={LOGO_URL} alt="Food Logo" width="150" />
          </Link>
        </div>

        {/* Nav Items */}
        <div>
          <ul id="menu" className="flex items-center gap-10 font-semibold">
            <li>Online Status: {onlineStatus ? "🟢" : "🔴"}</li>

            {navs}

            {/* 
            <li>
              <NavLink className={onLinkActive} to="/about">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink className={onLinkActive} to="/contact">
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink className={onLinkActive} to="/grocery">
                Grocery
              </NavLink>
            </li> */}

            {/* <li>🛒</li> */}
            <li onClick={onLogClick}>{loggedIn ? "LogOut" : "Login"}</li>
            <li>{loggedinUserName}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
