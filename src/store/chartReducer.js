import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  suggestedChartTypes: [],
  metaData: {},
  activeChart: "",
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChartData: (state, action) => {
      state.data = action.payload.data;
      state.suggestedChartTypes = action.payload.suggestedChartTypes;
      state.metaData = action.payload.metaData;
    },
    setActiveChart: (state, action) => {
      state.activeChart = action.payload;
    },
  },
});

export const { setChartData, setActiveChart } = chartSlice.actions;
export default chartSlice.reducer;
