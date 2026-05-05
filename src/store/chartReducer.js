import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  suggestedChartTypes: [],
  metaData: {},
  activeCharts: [],
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
    setActiveCharts: (state, action) => {
      state.activeCharts = Array.isArray(action.payload) ? action.payload : [];
    },
    toggleActiveChart: (state, action) => {
      const chart = action.payload;
      if (!chart) return;
      const idx = state.activeCharts.indexOf(chart);
      if (idx === -1) state.activeCharts.push(chart);
      else state.activeCharts.splice(idx, 1);
    },
  },
});

export const { setChartData, setActiveCharts, toggleActiveChart } = chartSlice.actions;
export default chartSlice.reducer;
