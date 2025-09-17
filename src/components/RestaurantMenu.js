import { useParams } from "react-router-dom";
import ShimmerCard from "./ShimmerCard";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const { itemCards: menuItems } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card || {};

  return resInfo === null ? (
    <ShimmerCard />
  ) : (
    <div className="max-w-8/10 mx-auto">
      <h1 className="text-3xl my-3">{name}</h1>
      <hr className="border-t border-gray-300 my-4" />
      <p className="text-lg mb-5 ">
        {cuisines.join(", ")} - {costForTwoMessage}{" "}
      </p>

      <h3 className="text-xl">Menu:</h3>
      <ul>
        {menuItems?.map((item, idx) => {
          const { id, name, price, defaultPrice } = item?.card?.info;
          const displayPrice = (price ?? defaultPrice) / 100;

          return (
            <li key={id} className="m-3">
              {idx + 1}. {name} - ₹ {displayPrice}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
