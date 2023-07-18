// import redux
import { createStore } from "redux";
// import reducers
import reducer from "./reducers";
// create store for reducer
const store = createStore(reducer);

// export store
export default store;
