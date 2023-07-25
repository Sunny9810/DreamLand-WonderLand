import React from "react";
// import react-redux
import { useDispatch } from "react-redux";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import './cartitem.css';

const CartItem = ({ item }) => {
  console.log(item)
  // create dispatch object from useDispatch()
  const dispatch = useDispatch();

  //! since the item is being passed in as a prop from cart component with "state.cart.map((item).... <CartItem item='item'/>" we dont need state
    // // create state object from useSelector()
      // const state = useSelector((s) => s);

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
      size: item.size
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;

    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
        size: item.size,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        size: item.size,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className='cart-item'>
      <div className='cart-item__image'>
        <img src={`/images/${item.image[0]}`} alt="" />
      </div>
      <div className='cart-item__info'>
        <div className="cart-item__name-price">
          {item.name}, ${item.price}
        </div>
        <div className="cart-item__size" >
          Size :{item.size}
        </div>
        <div className="cart-item__quantity">
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
          className="cart-item__delete"
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
