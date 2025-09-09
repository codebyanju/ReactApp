import React from "react";
import { createRoot } from "react-dom/client";
// console.log(createRoot);

const ele = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", { key: "123" }, "Anju12345678"),
    React.createElement("h2", { key: "1234" }, "I'm h2"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", { key: "1231" }, "I'm h1"),
    React.createElement("h2", { key: "1235" }, "I'm h2"),
  ]),
]);

// root.render(ele);

// Create ELement using React Core
const heading = React.createElement("h1", { id: "heading" }, "Namaste React");
// console.log(heading);

// Create ELement using JSX
const jsxHeading = <h1 id="heading">Namaste React JSX</h1>;
// console.log(jsxHeading);

// Create Root and render
const root = createRoot(document.getElementById("root"));

// root.render(heading);
// root.render(jsxHeading);

const Title = () => {
  return <h1>Title</h1>;
};

const Heading = () => (
  <div>
    {/*  ways to render a componnet */}
    {Title()}
    <Title />
    <h1>Heading</h1>
    React.createElement(Title)
    <Title {...data} />
    <Title a={data.a} b={data.b} />
    <Title2 />
  </div>
);

const Title2 = function () {
  return <div>Hello Normal Function</div>;
};

root.render(<Heading />);
