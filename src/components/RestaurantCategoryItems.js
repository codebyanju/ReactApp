import { CDN_URL } from "../utils/constants";
const RestaurantCategoryItems = ({ catItems }) => {
  //   console.log("catitems", catItems);

  return (
    <div>
      {catItems.map((item) => {
        const { id, name, price, defaultPrice, description, imageId } =
          item.card.info;

        console.log(item);
        return (
          <div key={id}>
            <div className="flex justify-between my-2 py-1 gap-2">
              <div className="flex flex-col">
                <span className="text-md font-semibold">
                  {name} - ₹ {price ? price / 100 : defaultPrice / 100}
                </span>
                <span className="text-sm text-gray-600">{description}</span>
              </div>

              <div className="relative w-32 h-32">
                <img
                  src={CDN_URL + imageId}
                  alt={name}
                  className="w-full h-full object-cover rounded"
                />
                <button className="absolute bottom-1 right-1 p-1 bg-black text-white rounded">
                  Add +
                </button>
              </div>
            </div>

            <hr className="border-t border-gray-300" />
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantCategoryItems;
