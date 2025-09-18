import CategoryItemsAccordion from "./CategoryItemsAccordion";

const RestaurantCategory = ({ catData }) => {
  //   console.log("catData", catData);

  return (
    <div>
      <div className="w-full min-h-[60px] bg-gray-50 mx-auto my-3 p-3 shadow-md">
        <div className="flex justify-between ">
          <span className="text-xl font-semibold">
            {catData.title} ({catData.itemCards.length})
          </span>
          <span>⬇️</span>
        </div>

        <CategoryItemsAccordion catItems={catData.itemCards} />
      </div>
    </div>
  );
};

export default RestaurantCategory;
