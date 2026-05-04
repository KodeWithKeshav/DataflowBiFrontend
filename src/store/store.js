import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tableReducer";

const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});

export default store;
