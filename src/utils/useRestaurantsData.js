import { useState, useEffect } from "react";
import { RESTAURANTS_URL } from "../utils/constants";

// Hooks cannot be async
const useRestaurantsData = (resId) => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // useEffect cannot be async
  useEffect(() => {
    fetchData();
  }, [resId]);

  const fetchData = async () => {
    const data = await fetch(RESTAURANTS_URL);
    const json = await data.json();
    setListOfRestaurants(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilteredRestaurants(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  console.log("listOfRestaurants", listOfRestaurants);
  console.log("filteredRestaurants", filteredRestaurants);

  return {
    listOfRestaurants,
    setListOfRestaurants,
    filteredRestaurants,
    setFilteredRestaurants,
  };
};

export default useRestaurantsData;
