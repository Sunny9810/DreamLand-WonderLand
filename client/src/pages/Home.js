import React from "react";
import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";


// import Homepage from "../pages/Homepage";

const Home = () => {
  return (
    <div className="container">
      {/* <Homepage /> */}
     
      <ProductList />
      <Cart />
     
    </div>
  );
};

export default Home;
