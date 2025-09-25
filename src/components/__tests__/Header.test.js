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

test("should toggle login to logout button", () => {
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

test("should toggle logout to login  button", () => {
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

  fireEvent.click(logoutBtn);

  expect(loginBtn).toBeInTheDocument();
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

const renderHeader = () =>
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

describe("Header Online Status", () => {
  it("should show 🟢 when online", () => {
    // Mock navigator.onLine so we can test online/offline status in Jest
    Object.defineProperty(window.navigator, "onLine", {
      value: true,
      configurable: true,
    });

    renderHeader();

    expect(screen.getByText(/Online Status: 🟢/)).toBeInTheDocument();
  });

  it("should show 🔴 when offline", () => {
    Object.defineProperty(window.navigator, "onLine", {
      value: false,
      configurable: true,
    });

    renderHeader();

    expect(screen.getByText(/Online Status: 🔴/)).toBeInTheDocument();
  });

  it("should update status when window goes offline/online", () => {
    Object.defineProperty(window.navigator, "onLine", {
      value: true,
      configurable: true,
    });

    renderHeader();

    // Simulate offline
    fireEvent(window, new Event("offline"));
    expect(screen.getByText(/Online Status: 🔴/)).toBeInTheDocument();

    // Simulate online
    fireEvent(window, new Event("online"));
    expect(screen.getByText(/Online Status: 🟢/)).toBeInTheDocument();
  });
});
