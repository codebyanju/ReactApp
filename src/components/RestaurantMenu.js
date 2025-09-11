import { useEffect, useState } from "react";
import ShimmerCard from "./ShimmerCard";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchResMenu();
  }, []);

  const fetchResMenu = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4400802&lng=78.3489168&restaurantId=847177&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();

    setResInfo(json?.data);
  };

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const { itemCards: menuItems } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card || {};

  return resInfo === null ? (
    <ShimmerCard />
  ) : (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}{" "}
      </p>

      <h3>Menu:</h3>
      <ul>
        {menuItems?.map((item) => {
          //   console.log("item", item);
          return <li key={item?.card?.info?.id}>{item?.card?.info?.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
