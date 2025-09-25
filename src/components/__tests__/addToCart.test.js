import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import Cart from "../Cart";
import "@testing-library/jest-dom";
import { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MOCK_DATA from "./mocks/restaurantMenu.json";
import { Provider } from "react-redux";
import appStore from "../../store/appStore";
import { BrowserRouter } from "react-router-dom";

// ✅ Mock useParams so useEffect receives a resId and fetchResInfo() runs
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // preserve other router exports (Link, Routes, etc.)
  useParams: jest.fn().mockReturnValue({ resId: "1234" }), // return mock param (actual ResId - 603438)
}));

// Mock fetch API
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  });
});

beforeEach(async () => {
  await act(async () =>
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Header />
          <RestaurantMenu />
          <Cart />
        </BrowserRouter>
      </Provider>
    )
  );
});

it("should load Restaurant Menu component", async () => {
  const accordionHeader = screen.getByText("Dessert (4)");

  expect(accordionHeader).toBeInTheDocument();
  fireEvent.click(accordionHeader);

  const foodItems = screen.getAllByTestId("foodItems");
  expect(foodItems.length).toBe(4);

  const addBtns = screen.getAllByRole("button", { name: "Add +" });
  fireEvent.click(addBtns[0]);

  const cart1 = screen.getByText("🛒(1 items)");
  expect(cart1).toBeInTheDocument();

  fireEvent.click(addBtns[1]);

  const cart2 = screen.getByText("🛒(2 items)");
  expect(cart2).toBeInTheDocument();
});
