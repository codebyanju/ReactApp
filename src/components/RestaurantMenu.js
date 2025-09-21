import { useParams } from "react-router-dom";
import ShimmerCard from "./ShimmerCard";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(0);

  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const { itemCards: menuItems } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card || {};

  const itemCategories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => {
      return (
        c.card.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    });

  return resInfo === null ? (
    <ShimmerCard />
  ) : (
    <div className="max-w-8/10 mx-auto">
      <h1 className="text-3xl my-3">{name}</h1>
      <hr className="border-t border-gray-300 my-4" />
      <p className="text-lg mb-5 ">
        {cuisines.join(", ")} - {costForTwoMessage}{" "}
      </p>
      <h3 className="text-xl mb-4">Menu:</h3>

      {itemCategories.map((category, index) => {
        // console.log("category", category);
        return (
          <RestaurantCategory
            catData={category.card.card}
            key={category.card.card.categoryId}
            showItems={index === showIndex}
            setShowIndex={() =>
              setShowIndex((prevIndex) => (prevIndex === index ? null : index))
            }
          />
        );
      })}

      {/* <ul>
        {menuItems?.map((item, idx) => {
          const { id, name, price, defaultPrice } = item?.card?.info;
          const displayPrice = (price ?? defaultPrice) / 100;

          return (
            <li key={id} className="m-3">
              {idx + 1}. {name} - ₹ {displayPrice}
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default RestaurantMenu;
