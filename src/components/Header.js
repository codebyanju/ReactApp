import { LOGO_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

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
    // console.log("useEffect called");
  });

  const onlineStatus = useOnlineStatus();

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
          <ul className="flex items-center gap-10 font-semibold">
            <li className="cursor-pointer">
              Online Status: {onlineStatus ? "🟢" : "🔴"}
            </li>
            <li className="rounded cursor-pointer hover:text-orange-500">
              <Link to="/">Home</Link>
            </li>
            <li className="rounded cursor-pointer hover:text-orange-500">
              <Link to="/about">About Us</Link>
            </li>
            <li className="rounded cursor-pointer hover:text-orange-500">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="rounded cursor-pointer hover:text-orange-500">
              <Link to="/grocery">Grocery</Link>
            </li>
            <li className="rounded cursor-pointer hover:text-orange-500">
              Cart
            </li>
            <li
              className="rounded cursor-pointer hover:text-orange-500"
              onClick={() => {
                btnName === "Login"
                  ? setBtnName("Logout")
                  : setBtnName("Login");
              }}
            >
              {btnName}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
