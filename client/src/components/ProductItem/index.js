import React from "react";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers";
// // import react-redux
// import { useDispatch, useSelector } from "react-redux";
// import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
// import { idbPromise } from "../../utils/helpers";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../ProductList/productList.css'


function ProductItem(item) {
  // create dispatch from useDispatch()
  // const dispatch = useDispatch();
  // // create state from useSelector
  // const state = useSelector((s) => s);

  const { image, name, _id, price, description } = item;

  // const { cart } = state;

  // const addToCart = () => {
  //   const itemInCart = cart.find((cartItem) => cartItem._id === _id);
  //   if (itemInCart) {
  //     dispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: _id,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  //     });
  //     idbPromise("cart", "put", {
  //       ...itemInCart,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  //     });
  //   } else {
  //     dispatch({
  //       type: ADD_TO_CART,
  //       product: { ...item, purchaseQuantity: 1 },
  //     });
  //     idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
  //   }
  // };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image[0]}`} />
        <p className="card-title">{name}</p>
      </Link>
      <div>
        <span>{description}</span>
        <br></br>
        {/* <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div> */}
        <span className="price">${price}</span>
      </div>

    </div>
  );
}

export default ProductItem;
