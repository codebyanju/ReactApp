import RestaurantCard from "./RestaurantCard";
import ShimmerCard from "./ShimmerCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import useRestaurantsData from "../utils/useRestaurantsData";

const Body = () => {
  // Local State variable - super powerful
  // ! Whenever a state variable updates, React re-renders the component by triggering a reconciliation cycle.
  // ! It compares the new Virtual DOM with the previous one and updates only the parts of the real DOM that have changed.
  const [searchText, setSearchText] = useState("");

  const {
    listOfRestaurants,
    setListOfRestaurants,
    filteredRestaurants,
    setFilteredRestaurants,
  } = useRestaurantsData();
  const onlineStatus = useOnlineStatus();

  // useEffect(() => {
  //   let isFetching = false; // flag to prevent multiple calls

  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //         document.body.offsetHeight - 100 &&
  //       !isFetching
  //     ) {
  //       isFetching = true; // block further calls
  //       getNewRestaurants().finally(() => {
  //         // release the block after fetch completes
  //         isFetching = false;
  //       });
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const goToRestaurant = (resId) => {
    console.log("resId", resId);
    setResId(resId);
  };

  // const getNewRestaurants = async () => {
  //   const data = await fetch(
  //     "https://corsproxy.io/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );

  //   const json = await data.json();
  //   console.log("json", json);
  //   console.log(
  //     json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
  //   );
  //   const newRestaurants =
  //     json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
  //   console.log("new rest", newRestaurants);

  //   setListOfRestaurants((prev) => [...prev, ...newRestaurants]);
  //   setFilteredRestaurants((prev) => [...prev, ...newRestaurants]);
  // };

  if (onlineStatus === false) {
    return <h1>You are offline. Please check your internet connection</h1>;
  }

  if (listOfRestaurants.length === 0) {
    return <ShimmerCard />;
  }

  return (
    <div className="max-w-8/10 mx-auto py-3 ">
      {/* Search, Top Rated */}
      <div>
        {/* Search */}
        <div className="flex justify-between">
          <div className="flex gap-3">
            <input
              type="text"
              className="h-12 w-3xl border rounded-sm border-gray-400 focus:outline-none px-3"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            ></input>
            <button
              className="cursor-pointer hover:text-orange-500 "
              onClick={() => {
                const searchResults = listOfRestaurants.filter((rest) =>
                  rest?.info?.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                );
                setFilteredRestaurants(searchResults);
              }}
            >
              Search
            </button>
          </div>

          {/* Top Rated */}
          <button
            className="bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-300 "
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );

              setFilteredRestaurants(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      {/* Restaurants Container */}
      <div className="my-3">
        {/* Total Results */}
        <div className=" text-gray-500 mb-3">
          Viewing {filteredRestaurants.length} Results
        </div>

        {/* Restaurants Cards */}
        <div className="flex flex-wrap justify-start gap-4">
          {filteredRestaurants.map((restaurant) => (
            <Link
              to={"/res/" + restaurant?.info?.id}
              key={restaurant?.info?.id}
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))}

          {/* We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. */}
          {/* <RestaurantCard resData={resList[0]} /> */}
        </div>
      </div>
    </div>
  );
};

// 1. child to parent communication
// <RestaurantCard
//   resData={restaurant}
//   key={restaurant.info.id}
//   onHit={goToRestaurant}
// />

// 2. Single responsibility principle - navigate to restaurant is responsibility of RestaurantCard
//  <RestaurantCard
//     resData={restaurant}
//     key={restaurant.info.id}
// />

export default Body;
