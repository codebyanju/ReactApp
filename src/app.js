import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

/*
Chunking
Code Splitting
Lazy Loading
Dynamic Imports
DYnamic Bundling
On Demand Loading

lazy is a function
Suspense is a component
*/
const Grocery = lazy(() => import("./components/Grocery"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/res/:resId",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
// root.render(<AppLayout />);

root.render(<RouterProvider router={appRouter} />);
