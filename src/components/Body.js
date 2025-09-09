import RestaurantCard from "./RestaurantCard";
import ShimmerCard from "./ShimmerCard";
import { useState, useEffect } from "react";

const Body = () => {
  // Local State variable - super powerful
  // ! Whenever a state variable updates, React re-renders the component by triggering a reconciliation cycle.
  // ! It compares the new Virtual DOM with the previous one and updates only the parts of the real DOM that have changed.

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4400802&lng=78.3489168&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    console.log(
      "1st fetchData",
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );

    setListOfRestaurants(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilteredRestaurants(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
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

  if (listOfRestaurants.length === 0) {
    return <ShimmerCard />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search-container">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <button
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

        <button
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );

            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div>Total {filteredRestaurants.length} Results</div>

      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            resData={restaurant}
            key={`${restaurant?.info?.id} - ${Date.now()}`}
          />
        ))}

        {/* We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. */}
        {/* <RestaurantCard resData={resList[0]} /> */}
      </div>
    </div>
  );
};

export default Body;
