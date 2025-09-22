import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Body from "../Body";
import MOCK_DATA from "./mocks/restaurantList.json";
import { act } from "react";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Search for text input burger", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const resCardsOnLoad = screen.getAllByTestId("resCard");
  expect(resCardsOnLoad.length).toBe(20);

  const searchBtn = screen.getByRole("button", { name: "Search" });
  expect(searchBtn).toBeInTheDocument();

  const searchInput = screen.getByTestId("searchInput");
  console.log(searchInput);

  fireEvent.change(searchInput, {
    target: {
      value: "burger",
    },
  });

  fireEvent.click(searchBtn);

  const resCardsAfterSearch = screen.getAllByTestId("resCard");
  expect(resCardsAfterSearch.length).toBe(4);

  fireEvent.click(searchBtn);
});

it("top rated res - rating > 4", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const resCardsOnLoad = screen.getAllByTestId("resCard");
  expect(resCardsOnLoad.length).toBe(20);

  const searchBtn = screen.getByRole("button", {
    name: "Top Rated Restaurants",
  });
  expect(searchBtn).toBeInTheDocument();

  fireEvent.click(searchBtn);

  const resCardsAfterSearch = screen.getAllByTestId("resCard");
  expect(resCardsAfterSearch.length).toBe(17);

  fireEvent.click(searchBtn);
});
