import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
// import react-redux
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import "./cart.css";
import LilBear from '../../images/animals/CutieWave.png'

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  // create dispatch from useDispatch()
  const dispatch = useDispatch();
  // create state from useSelector()
  const state = useSelector((s) => s);

    //! productids are structured as the options in getcheckout
    //! passed to this query and res.data is waited on
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    //! when the data exist/updates from the QUERYCHECKOUT response
      //! the sessionid is extracted and helps redirect to the stripe checkout page
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

    //! checks if state.cart has data and if not gets product data from 
      //! indexDB, passes that data as the payload to the ADD_MULTIPLE_TO_CART action type
  useEffect(() => {
    async function getCart() {
      const cartItems = await idbPromise("cart", "get");
        console.log('iDB cart:', cartItems)
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cartItems] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

    //! on submit all the item ids are psuhed into a productIDs array
      //! passed into getcheckout and used as the options for QUERYCHECKOUT
  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash" style={{ position: "relative", top: "-8px" }}>
          🛒
        </span>
      </div>
    );
  }

  state.cart.forEach((item) => {
    console.log(item);
  });

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2 className="shopping-cart">Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item.listing} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong className="total">Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span className="checkout">(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
          <img style={{ height:100 , width:100 }} src={ LilBear} alt="little cartoon bear"/>
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
