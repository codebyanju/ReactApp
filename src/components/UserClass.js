import React from "react";

/* 
Class – A Blueprint for Objects
A class is like a blueprint or template for creating objects with the same structure and behavior.
A class defines what properties (data) and what methods (functions) objects created from it will have.
*/

class UserClass extends React.Component {
  /*
Constructor – The Setup Function for the Class
The constructor is a special method inside a class that automatically runs when you create a new object from that class.
It’s used to initialize (set up) properties.
*/
  constructor(props) {
    super(props); //call the constructor of the parent class (React.Component) and pass props to it to initialize this.props. So that we can use this.props in the component.
    console.log(this.props.name + "constructor()");

    this.state = {
      count: 0,
      userData: {
        name: "Dummy name",
        location: "Dummy location",
      },
    };
  }

  async componentDidMount() {
    // API call
    console.log(this.props.name + "componentDidMount()");
    const userData = await fetch("https://api.github.com/users/snikit");
    const json = await userData.json();
    this.setState({
      userData: json,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.name + "componentDidUpdate()");
    console.log(this.props.name + "Previous State: ", prevState);
    console.log(this.props.name + "Current State: ", this.state);

    //! Since it is a SPA, component will never unmount even if we navigate to other page.
    // So if you have a timer or subscription, it will keep running forever unless you clear it in componentWillUnmount.
    // this.timer = setInterval(() => {
    //   console.log("Interval running");
    // }, 1000);

    // Older way of doing API call on state change.
    // New way  - 1 dependency - useEffect(() => {}, [count])
    if (this.state.count !== prevState.count) {
      // API call
    }

    // useEffect with dependency [props.name]
    // New way - 2 dependency - useEffect(() => {}, [name, location])
    if (
      this.props.name !== prevProps.name ||
      this.props.location !== prevProps.location
    ) {
      // Something else api call
    }
  }

  componentWillUnmount() {
    // clearInterval(this.timer);
    console.log(this.props.name + "componentWillUnmount()");
  }

  /* 
Render must be defined – it tells React what to show on the screen.
It Returns JSX – the UI for that component.
It Runs automatically – when the component first loads and whenever its state or props change.
*/
  render() {
    console.log(this.props.name + "render()");
    const { name, location } = this.props;
    const { count } = this.state;
    const { name: gitUserName, avatar_url } = this.state.userData;

    return (
      <div className="my-3 flex justify-between">
        <div>
          <img
            src={avatar_url}
            alt="Github avatar"
            className="rounded-md h-[240px] w-full "
          />
          <h3 className="text-lg font-semibold my-3">
            GitHub User Name: {gitUserName}
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl">Count: {count}</h2>
          <button
            className="bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-300"
            onClick={() => {
              this.setState({ count: count + 1 }); // this will only update count and doesnt touch other state variables. And will trigger re-render.
              //! this.state.count = this.getSnapshotBeforeUpdate.count + 1; // NEVER UPDATE STATE VARIABLES DIRECTLY. This won't work. Direct state mutation doesn't trigger re-render.
            }}
          >
            Increment Count
          </button>

          <h2 className="text-xl">Name: {name} </h2>
          <h3 className="text-xl">Location: {location}</h3>
        </div>
      </div>
    );
  }
}

export default UserClass;

/*
Object – An Actual Instance of the Class
An object is what you get when you actually create something from the class (using new).
It’s a real thing you can use.

1. Here UserClass is a class (just like any other JS class).
Normally, with a class you’d do:

const obj = new UserClass();
But in React, you never do this manually.

2. When you use <UserClass /> in JSX:
function App() {
  return <UserClass name="Anju" location="India" />;
}

React internally does something like:
const props = { name: "Anju", location: "India" };
const obj = new MyComponent(props);
obj.render();

So yes — objects (instances) are created, but React does that for you every time the component is rendered or re-rendered

3. Each time <UserClass /> is used in JSX, a new object (instance) of UserClass is created by React.
So if you have multiple <UserClass /> components, each one is a separate object with its own props and state.
4. You don’t manually create instances of class components with new — React does that for you behind the scenes.

*/
