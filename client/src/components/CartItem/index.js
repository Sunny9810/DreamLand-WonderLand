import React, { useEffect, useState } from "react";
// import react-redux
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import './cartitem.css';

const CartItem = ({ item }) => {
  // create dispatch object from useDispatch()
  const dispatch = useDispatch();
  // create state object from useSelector()
  const state = useSelector((s) => s);

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className='cart-item'>
      <div calssName='cart-item__image'>
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
