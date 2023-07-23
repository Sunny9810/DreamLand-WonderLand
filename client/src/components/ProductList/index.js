import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
//  import react-redux
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import "./productList.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import CategoryMenu from "../CategoryMenu";
import { Link } from "react-router-dom";
import DreamLogo from "../../images/DreamLogo.png";




function ProductList() {
  // create dispatch from useDispatch()
  const dispatch = useDispatch();
  // create state from useSelector()
  const state = useSelector((s) => s);

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <main>
      <div className="pg-header">
    
      <img style={{ height:200}} src={ DreamLogo} alt="dreamland wonderland logo"/>
        <h2>Our Products:</h2>
        <div className="products-row">
        <Link to="/">
          <span role="img" aria-label="">
            
          </span>
        </Link>
        </div>
        <CategoryMenu />
      </div>
      <div>
        {state.products.length ? (
          <div className="flex-row">
            {filterProducts().map((product) => (
              <ProductItem
                key={product._id}
                _id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
              />
            ))}
          </div>
        ) : (
          <h3>You haven't added any products yet!</h3>
        )}
        {loading ? <img src={spinner} alt="loading" /> : null}
      </div>
    </main>
  );
}

export default ProductList;
