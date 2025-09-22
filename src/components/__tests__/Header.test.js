import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";

// ✅ Wraps component with Redux store so `useSelector` and `useDispatch` work
import { Provider } from "react-redux";
import appStore from "../../store/appStore";

// ✅ Provides React Router context so components using <Link>, <NavLink>, or hooks (useNavigate, useParams) don't break in tests
import { BrowserRouter } from "react-router-dom";

// ✅ Adds custom Jest matchers like `toBeInTheDocument` and `toHaveTextContent`
// Improves readability and accuracy of assertions
import "@testing-library/jest-dom";

test("should toggle login logout button", () => {
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  // Fire event
  const loginBtn = screen.getByText("Login");
  expect(loginBtn).toBeInTheDocument();

  fireEvent.click(loginBtn);

  const logoutBtn = screen.getByText("Logout");
  expect(logoutBtn).toBeInTheDocument();
});

test("should render Header component", () => {
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  // Find
  const cartBtn = screen
    .getAllByRole("listitem")
    .find((nav) => nav.textContent == "About");
  expect(cartBtn).toBeInTheDocument();
});

test("should render Nav Link", () => {
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  // RegEx
  const cartIcon = screen.getByText(/🛒/);
  expect(cartIcon).toBeInTheDocument();
});
