import { createSlice } from "@reduxjs/toolkit";

const tableReducer = createSlice({
  name: "table",
  initialState: { tables: [], activeTable: {}, activeTableRows: [] },
  reducers: {
    addTables: (state, action) => {
      state.tables = action.payload;
    },
    setActiveTable: (state, action) => {
      state.activeTable = action.payload;
    },
    setActiveTableRows: (state, action) => {
      state.activeTableRows = action.payload;
    },
  },
});

export const { addTables, setActiveTable, setActiveTableRows } =
  tableReducer.actions;

export default tableReducer.reducer;
