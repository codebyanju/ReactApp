import { LOGO_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [btnName, setBtnName] = useState("Login");

  // If no dependency array is provided => the useEffect runs AFTER every render of the component.
  // If dependency array is empty => the useEffect runs only once after the initial render. (Only Once)
  // If dependency array has variables => the useEffect runs after the initial render and whenever any of the dependencies change.
  useEffect(() => {
    console.log("useEffect called");
  });

  return (
    <div className="header">
      <div className="logo">
        <img src={LOGO_URL} alt="Food Logo" width="150" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/about">About Us </Link>
          </li>
          <li>
            <Link to="/contact">Contact Us </Link>
          </li>
          <li>Cart</li>
          <li
            className="login"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
