import React from "react";
import store from './redux/redux-store';

let init = store;

const StoreContext = React.createContext(init);

export default StoreContext;