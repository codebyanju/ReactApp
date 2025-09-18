const CategoryItemsAccordion = ({ catItems }) => {
  //   console.log("catitems", catItems);

  return (
    <div>
      {catItems.map((item) => {
        console.log(item);
        const { id, name, price, description } = item.card.info;
        return (
          <div className="flex flex-col my-2 py-1 gap-2" key={id}>
            <span className="text-md font-semibold ">
              {name} - ₹ {price / 100}
            </span>

            <span className="text-sm text-gray-600">{description}</span>
            <hr className="border-gray-300 mt-2" />
          </div>
        );
      })}
    </div>
  );
};

export default CategoryItemsAccordion;
