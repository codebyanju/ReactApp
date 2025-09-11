import { useEffect, useState } from "react";

const RestaurantMenu = () => {
  const [resMenu, setResMenu] = useState(null);

  useEffect(() => {
    fetchResMenu();
  }, []);

  const fetchResMenu = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4400802&lng=78.3489168&restaurantId=847177&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();

    setResMenu(json?.data?.cards[2]?.card?.card?.info);

    console.log("ResMenu", json?.data?.cards[2]?.card?.card?.info);
  };

  return (
    <div className="menu">
      <h1>{resMenu.name}</h1>
      <h3>{resMenu.cuisines.join(", ")}</h3>

      <ul>
        <li>Paneer Tikka</li>
      </ul>
    </div>
  );
};

export default RestaurantMenu;
