import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    CLEAR_CART,
    TOGGLE_CART,
  } from "./actions";
  
    //! initial Global state defined below
  const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: "",
    size: "",
    quantity: 1,
    listing: ""
  };
  
  // The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      // Returns a copy of state with an update products array. We use the action.products property and spread it's contents into the new array.
      case UPDATE_PRODUCTS:
        return {
          ...state,
          products: [...action.products],
        };
  
      case ADD_TO_CART:
        return {
          ...state,
          cartOpen: true,
          cart: [...state.cart, action.product],
        };
      case ADD_MULTIPLE_TO_CART:
        return {
          ...state,
          cart: [...state.cart, ...action.products],
        };
        
        //! checks for item id and item size
      case UPDATE_CART_QUANTITY:
        return {
          ...state,
          cartOpen: true,
          cart: state.cart.map((product) => {
            if (action._id === product._id && action.size === product.size) {
              return {
                ...product,
                purchaseQuantity: action.purchaseQuantity,
              };
            }
            return product;
          }),
        };
        
        //! remove from cart checks for size and id
      case REMOVE_FROM_CART:
        return {
          ...state,
          cartOpen: true,
          cart: state.cart.filter((item) => {
            // Keep the cart item in the cart array if either _id or size doesn't match the action's values
            return !(item._id === action._id && item.size === action.size);
          }),
        };
  
      case CLEAR_CART:
        return {
          ...state,
          //! cartOpen: false,
          cart: [],
        };
  
      case TOGGLE_CART:
        return {
          ...state,
          cartOpen: !state.cartOpen,
        };
  
      case UPDATE_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories],
        };
  
      case UPDATE_CURRENT_CATEGORY:
        return {
          ...state,
          currentCategory: action.currentCategory,
        };
  
      // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
      // This saves us from a crash.
      default:
        return state;
    }
  };
  
  // export function useProductReducer(initialState) {
  //   return useReducer(reducer, initialState);
  // }
  
  export default reducer;
  