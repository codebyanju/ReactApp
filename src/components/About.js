import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";

// Class Component
class About extends Component {
  // Another way to create class component
  constructor(props) {
    super(props);
    console.log("Parent constructor() - AboutClass");
  }

  componentDidMount() {
    console.log("Parent componentDidMount() - AboutClass");
  }

  render() {
    console.log("Parent render() - AboutClass");
    return (
      <div>
        <h1>About</h1>
        {/* <User name="Anju (Functional)" location="Hyderabad (Functional)" /> */}
        <UserClass name="First Child " location="Hyderabad (Class)" />
        {/* <UserClass name="Second Child " location="Hyderabad (Class)" /> */}
      </div>
    );
  }
}

export default About;

/* 
? OUTPUT 

🟢 Mounting Phase (Render Phase)
Parent constructor() 
Parent render() 

First Child constructor() 
First Child render() 

Second Child constructor() 
Second Child render() 

🟢 Commit Phase
React updates real DOM ONCE (batched)

First Child componentDidMount() 
Second Child componentDidMount() 
Parent componentDidMount()

*/

/* 
! REACT LIFECYCLE DIAGRAM - https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

? 📝 React Mounting Lifecycle (Combined Notes)

1️⃣ Render Phase (Planning Stage)
Purpose: React prepares UI in memory (Virtual DOM). No real DOM updates yet.

Steps:
1. Class Component:
 - constructor() → sets initial state, binds methods.
 - render() → returns JSX.

1. Functional Component:
 - Component function runs → returns JSX.
2. JSX → Babel transpiles to → React.createElement() → React converts to → Virtual DOM (JS object tree)
3. Virtual DOM = JS object tree representing the UI.
4. Children Components: React runs constructor/render (class) or function (functional) for children → builds their Virtual DOM.
✅ No actual DOM updates yet — just a blueprint in memory.

2️⃣ Commit Phase (Construction Stage)
Purpose: Apply changes to the real DOM and run side effects.

Steps:
1. React diffs Virtual DOM with previous Virtual DOM (for initial render, previous is empty).
2. Finds minimal changes → batch updates the Real DOM (adds, removes, updates nodes).
   - ✅ Batching is important because DOM manipulation is expensive.
3. Browser paints UI → Updated DOM is now visible to the user.
4. Runs lifecycle methods / side effects
 - Class Component: componentDidMount() is called.
 - Functional Component: useEffect(() => {...}, []) runs.
 - Ideal place for API calls, subscriptions, or other setup tasks. 
 - Side effects (like API calls) run after the DOM is already painted, asynchronously.


 ? LIFECYCLE EXAMPLE WITH PARENT, CHILD, API CALL

import { useState, useEffect } from "react";

const Child = ({ data }) => {
  return <p>Child sees: {data ? data.name : "Loading..."}</p>;
};

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(result => setData(result));
  }, []);

  return (
    <div>
      <h1>{data ? data.name : "Loading..."}</h1>
      <Child data={data} />
    </div>
  );
};

export default MyComponent;


? Timeline with a Slow API 

Initial Mount (first render)
1. Render Phase → JSX <Loading /> → Virtual DOM created
2. Parent renders first, then children → full Virtual DOM tree ready
3. Commit Phase → batch updates Real DOM (parent + children) → browser paints UI
4. constructor / componentDidMount (class) or useEffect(..., []) (functional) runs → API call starts

API resolves (after 1 min)
1. setState / setData → triggers update lifecycle
2. Render Phase → new Virtual DOM created (parent + children if needed)
3. Diffing → compare new Virtual DOM with previous Virtual DOM
4. Commit Phase → batch update only changed DOM nodes → browser paints updated UI

✅ Key: Component rendered 2 times, DOM updates are batched for efficiency, side effects run only on initial mount.
*/
