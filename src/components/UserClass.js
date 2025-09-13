import React from "react";

// Class – A Blueprint for Objects
// A class is like a blueprint or template for creating objects with the same structure and behavior.
// A class defines what properties (data) and what methods (functions) objects created from it will have.

class UserClass extends React.Component {
  // Constructor – The Setup Function for the Class
  // The constructor is a special method inside a class that automatically runs when you create a new object from that class.
  // It’s used to initialize (set up) properties.
  constructor(props) {
    super(props); //call the constructor of the parent class (React.Component) and pass props to it to initialize this.props. So that we can use this.props in the component.
    console.log(props);
  }

  // Render must be defined – it tells React what to show on the screen.
  // It Returns JSX – the UI for that component.
  // It Runs automatically – when the component first loads and whenever its state or props change.
  render() {
    const { name, location } = this.props;

    return (
      <div className="user-card">
        <h1>Name: {name} </h1>
        <h3>Location: {location}</h3>
      </div>
    );
  }
}

export default UserClass;

// Object – An Actual Instance of the Class
// An object is what you get when you actually create something from the class (using new).
// It’s a real thing you can use.

// 1. Here UserClass is a class (just like any other JS class).
// Normally, with a class you’d do:

// const obj = new UserClass();
// But in React, you never do this manually.

// 2. When you use <UserClass /> in JSX:
// function App() {
//   return <UserClass />;
// }

// React internally does something like:
// const obj = new UserClass(props);
// obj.render();

// So yes — objects (instances) are created, but React does that for you every time the component is rendered or re-rendered

// 3. Each time <UserClass /> is used in JSX, a new object (instance) of UserClass is created by React.
// So if you have multiple <UserClass /> components, each one is a separate object with its own props and state.
// 4. You don’t manually create instances of class components with new — React does that for you behind the scenes.
