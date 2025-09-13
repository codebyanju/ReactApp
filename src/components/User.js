import { useState, useEffect } from "react";

const User = ({ name, location }) => {
  const [count, setCount] = useState(0);
  const [count2] = useState(1);

  useEffect(() => {
    // API call
    console.log("Functional compoent - useEffect  - User");
  });

  return (
    <div className="user-card">
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      <h2>Count2: {count2}</h2>
      <h1>Name: {name} </h1>
      <h3>Location: {location}</h3>
    </div>
  );
};

export default User;

// 📝 Behind the Scenes (on useState + Click)
// Button Click → setCount(count + 1) called
// React schedules state update (adds it to internal queue)

// 🔄 Component re-renders → new Virtual DOM is created
// React calls your function component again (it’s just a function).
// useState returns the updated count.
// The function runs from top to bottom, returning new JSX (new virtual DOM tree).

// ⚡ Reconciliation → React diffs new vs old Virtual DOM
// React compares new virtual DOM with previous virtual DOM.
// Finds exactly what changed (e.g., text content of <h1>).
// Reuses unchanged nodes, updates only changed ones.

// Then:
// Minimal DOM update → only changed parts are patched in real DOM.
// Browser repaints → UI shows new value.
