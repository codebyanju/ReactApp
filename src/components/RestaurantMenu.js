import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShimmerCard from "./ShimmerCard";
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  const { resId } = useParams();

  useEffect(() => {
    fetchResMenu();
  }, []);

  const fetchResMenu = async () => {
    const data = await fetch(MENU_API + resId);
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
          return (
            <li key={item?.card?.info?.id}>
              {item?.card?.info?.name} - ₹ {item?.card?.info?.price / 100}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
