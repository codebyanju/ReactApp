import { useState } from "react";
import CategoryItemsAccordion from "./CategoryItemsAccordion";

const RestaurantCategory = ({ catData }) => {
  const [showItems, setShowItems] = useState(false);

  const handleClick = () => {
    setShowItems(!showItems);
  };

  return (
    <div>
      <div className="w-full min-h-[60px] bg-gray-50 mx-auto my-3 p-3 shadow-md">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="text-xl font-semibold">
            {catData.title} ({catData.itemCards.length})
          </span>
          <span>{showItems ? "⬆️" : "⬇️"}</span>
        </div>

        {showItems && <CategoryItemsAccordion catItems={catData.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
