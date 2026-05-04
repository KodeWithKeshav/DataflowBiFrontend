import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tableReducer";
import chartReducer from "./chartReducer";

const store = configureStore({
  reducer: {
    table: tableReducer,
    chart: chartReducer,
  },
});

export default store;
