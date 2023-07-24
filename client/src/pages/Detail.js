import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Cart from "../components/Cart";
// import react-redux for useDisptach and useSelector
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";
import "./styles/details.css";

function Detail() {
  // create disptach from useDispatch()
  const dispatch = useDispatch();
  // create state object for useSelector() pass arrow function for selector value
  const state = useSelector((s) => s);

  const { id } = useParams();

    //! local state holding product we want to add
  const [currentProduct, setCurrentProduct] = useState({ image: [] });

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const [currentImage, setCurrentImage] = useState(currentProduct.image[""]);

    //! pulling state and deconstructing product and cart 
  const { products, cart } = state;

    //! size chosen state value
  const [currentSize, setCurrentSize] = useState("");

    //! unique value for identifying item in cart
  const [listing, setListing] = useState("");

    //! quantity chosen state value
  const [quantity, setQuantity] = useState(1)

    //! warning state string value
  const [warning, setWarning] = useState("");

    //! checks if currentproduct matches any cart item and returns a boolean value
  const isCartItemMatch = (cartItem) => {
    return cartItem._id === currentProduct._id && cartItem.size === currentSize;
  };

  useEffect(() => {
    // already in global store
    if (products.length) {
      const myProduct = products.find((product) => product._id === id);
      setCurrentProduct(myProduct);
      setCurrentImage(myProduct.image[0]);
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

    //! function logic for adding to cart is button is clicked
  const addToCart = () => {
      //! checks if currentsize exists, if no currentsize warning is given a string value, and appears in in hmtl further down
    if (!currentSize) {
      
      setWarning("Please select a size before adding to cart");
      return;
    }
      //! if size warning is set to empty and doesnt appear
    setWarning("");

      //! looks for item existing in cart matching our size and id and assigns to itemInCart if found
    const itemInCart = cart.find(
      (cartItem) => cartItem._id === id && cartItem.size === currentSize
    );
      
      //! if itemInCart has data aka its in cart state then update its quantity
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        size: currentSize,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + quantity,
      });
        //! i tried to mimic the structure of action above
      idbPromise("cart", "put", {
        ...itemInCart,
        _id: id,
        size: currentSize,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + quantity,
      });
    } else {
        //! if no match to cart, add a product with our local state values to the store cart
      dispatch({
        type: ADD_TO_CART,
        product: {
          ...currentProduct,
          purchaseQuantity: quantity,
          size: currentSize,
          listing: listing,
        },
      }); //! i tried to mimic the action above's structure
      idbPromise("cart", "put", {
        ...currentProduct,
        purchaseQuantity: quantity,
        size: currentSize,
        listing: listing,
      });
    }
      //! reset quantity input form to 1
    setQuantity(1);
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
      size: currentSize,
    });

    idbPromise("cart", "delete", { ...currentProduct, size: currentSize, _id: currentProduct._id });
  };

  const onChange = (e) => {
    const { value } = e.target;
    setQuantity(parseInt(value, 10));
  };
  

  const isSizeSelected = (size) => {
    return size === currentSize;
  };

  const onClick = (e) => {
    const value = e.target.id;
    console.log(value);
    


    setCurrentSize(value);
    const newListing = `${value}-${currentProduct._id}`;
    setListing(newListing)


    idbPromise("cart", "put", {
      ...currentProduct,
      size: value,
      listing: newListing
    });
  };
  return (
    <>
      {currentProduct && cart ? (
        <div className="container">
          <div className="row product">
            <div className="col"></div>
            <div className="card">
              <div className="container d-flex back-link">
                <Link to="/">← Back to Products</Link>
              </div>
              <div className="container d-flex-col mx-auto p-2">
                <img
                  className="mainimage"
                  src={`/images/${currentImage}`}
                  alt={currentImage}
                />
                <div
                  className="row d-inline-flex mx-auto images"
                  style={{ width: 200 }}
                >
                  {/* Remove the unnecessary nested div element */}
                  {currentProduct.image.map((i) => (
                    <img
                      key={i} // Add a key attribute to each image
                      src={`/images/${i}`}
                      alt={i}
                      onClick={() => setCurrentImage(i)}
                      className="rounded-circle" // Add the class for the circular image
                    />
                  ))}
                </div>
              </div>

              <h2>{currentProduct.name}</h2>

              <p className="d-flex-row my-0">{currentProduct.description}</p>
              <br />
              <p className="d-flex-row">
                <strong>Price:</strong>${currentProduct.price} <br />
                <br />
                <label for="sizes">Sizes:  </label>
                {currentProduct?.category?.size?.map((s) => (
                  <button 
                    className={`d-btn ${isSizeSelected(s) ? 'selected' : ''}`}
                    id={s} 
                    onClick={onClick}
                    >
                    {s}
                  </button>
                ))}
                <br />
                <label for="quantity">Quantity:  </label>
                <input
                
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="1"
                  min="1"
                  value={quantity}
                  onChange={onChange}
                />
                <br />
                {warning && <p className="warning">{warning}</p>}
                <button className="d-btn" onClick={addToCart}>
                  Add to Cart
                </button>
                <button
                  className="d-btn"
                  //! disabled is false if the cart item matches currentProduct
                  //! meaning it will display
                  disabled={!cart.some(isCartItemMatch)}
                  onClick={removeFromCart}
                >
                  Remove from Cart
                </button>
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
