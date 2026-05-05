import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tableReducer";
import chartReducer from "./chartReducer";
import kpiReducer from "./kpiReducer";

const store = configureStore({
  reducer: {
    table: tableReducer,
    chart: chartReducer,
    kpi: kpiReducer,
  },
});

export default store;
