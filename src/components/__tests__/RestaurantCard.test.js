import RestaurantCard, { withPromotedCard } from "../RestaurantCard";
import MOCK_DATA from "./mocks/restaurantCard.json";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

it("should render Restaurant Card with name", () => {
  render(<RestaurantCard resData={MOCK_DATA} />);

  const name = screen.getByRole("heading", { name: "Pizza Hut" });
  expect(name).toBeInTheDocument();
});

it("should render withPromotedCard", () => {
  const RestaurantCardPromoted = withPromotedCard(RestaurantCard); // HOF -- returns function

  render(<RestaurantCardPromoted resData={MOCK_DATA} />); // call the returned func

  const label = screen.getByText("Promoted");
  expect(label).toBeInTheDocument();
});
