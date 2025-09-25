import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import Cart from "../Cart";
import "@testing-library/jest-dom";
import { act } from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
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

const renderMethod = async () =>
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

beforeEach(async () => {});

afterEach(() => {
  cleanup();
});

it("should render Restaurant Menu component", async () => {
  await renderMethod();
  const accordionHeader = screen.getByText("Dessert (4)");
  expect(accordionHeader).toBeInTheDocument();
});

it("should expand category and show food items", async () => {
  await renderMethod();

  const accordionHeader = screen.getByText("Dessert (4)");
  fireEvent.click(accordionHeader);

  const foodItems = screen.getAllByTestId("foodItems");
  expect(foodItems.length).toBe(4);
});

it("should add items to cart correctly", async () => {
  await renderMethod();

  const accordionHeader = screen.getByText("Dessert (4)");
  fireEvent.click(accordionHeader);

  const addBtns = screen.getAllByRole("button", { name: "Add +" });
  fireEvent.click(addBtns[0]);

  expect(screen.getByText("🛒(1 items)")).toBeInTheDocument();

  fireEvent.click(addBtns[1]);
  expect(screen.getByText("🛒(2 items)")).toBeInTheDocument();

  const foodItems = screen.getAllByTestId("foodItems");
  expect(foodItems.length).toBe(6); // 6 coz it counts the Cart items also since we resused commeon component
});

it("clear cart", async () => {
  await renderMethod();
  const accordionHeader = screen.getByText("Dessert (4)");
  fireEvent.click(accordionHeader);

  const addBtns = screen.getAllByRole("button", { name: "Add +" });
  fireEvent.click(addBtns[0]);

  fireEvent.click(addBtns[1]);
  expect(screen.getByText("🛒(4 items)")).toBeInTheDocument();

  const foodItems = screen.getAllByTestId("foodItems");
  expect(foodItems.length).toBe(8); // 6 coz it counts the Cart items also since we resused commeon component

  const clearCartBtn = screen.getByRole("button", { name: "Clear Cart" });
  expect(clearCartBtn).toBeInTheDocument();

  fireEvent.click(clearCartBtn);
  const clearText = screen.getByText(
    "Your cart is empty. Please add items to the cart!"
  );
  expect(clearText).toBeInTheDocument();
});
