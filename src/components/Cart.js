import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";

import RestaurantCategoryItems from "./RestaurantCategoryItems";

const Cart = () => {
  //! Never Do this - it is very less efficient.
  //! Problem: any change in the store (even unrelated slices) will trigger a re-render of this component, because store as a whole changed.
  // const store = useSelector((store) => store);
  // const items = store.cart.items;

  // Subscribe to selected portion of the Store.
  // Re-renders are more efficient because React-Redux only watches the part of the state you selected
  const cartItems = useSelector((store) => store.cart.items);

  // Dispatch Action
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="w-8/12 min-h-[80px] mx-auto my-3 p-3 ">
      <h1 className="text-3xl font-bold mb-3">Cart</h1>

      {cartItems.length > 0 && (
        <button
          className="p-2 bg-black text-white rounded-lg"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      )}

      {/* Empty Cart */}
      {cartItems.length === 0 && (
        <div className="w-8/12 min-h-[80px] my-3">
          Your cart is empty. Please add items to the cart!
        </div>
      )}

      <div>
        <RestaurantCategoryItems catItems={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
