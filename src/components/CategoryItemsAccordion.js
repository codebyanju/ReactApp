import { CDN_URL } from "../utils/constants";
const CategoryItemsAccordion = ({ catItems }) => {
  //   console.log("catitems", catItems);

  return (
    <div>
      {catItems.map((item) => {
        const { id, name, price, description, imageId } = item.card.info;

        console.log(item);
        return (
          <div key={id}>
            <div className="flex justify-between my-2 py-1 gap-2">
              <div className="flex flex-col">
                <span className="text-md font-semibold">
                  {name} - ₹ {price / 100}
                </span>
                <span className="text-sm text-gray-600">{description}</span>
              </div>

              <div className="flex items-center  max-w-[100px]">
                <img src={CDN_URL + imageId} alt={name} className="rounded" />
                <button className="p-1 rounded shadow bg-black text-white absolute mt-8">
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

export default CategoryItemsAccordion;
