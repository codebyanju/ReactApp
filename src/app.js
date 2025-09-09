/* 
Header
 - Logo
 - Nav Items
Body
 - Search
- Restaurant COntainer
 - Restaurant Card
Footer
 - Links

*/

import { createRoot } from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<AppLayout />);
