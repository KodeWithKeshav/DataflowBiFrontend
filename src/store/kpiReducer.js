import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kpis: [],
  loading: false,
  error: null,
};

const kpiSlice = createSlice({
  name: "kpi",
  initialState,
  reducers: {
    setKpiLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setKpis: (state, action) => {
      state.kpis = action.payload;
      state.loading = false;
      state.error = null;
    },
    setKpiError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearKpis: (state) => {
      state.kpis = [];
      state.loading = false;
      state.error = null;
    },
    removeKpi: (state, action) => {
      const idx = action.payload;
      if (typeof idx === 'number') {
        state.kpis = state.kpis.filter((_, i) => i !== idx);
      }
    },
  },
});
export const { setKpiLoading, setKpis, setKpiError, clearKpis, removeKpi } =
  kpiSlice.actions;
export default kpiSlice.reducer;
