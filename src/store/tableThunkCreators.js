import { addTables, setActiveTableRows } from "./tableReducer";
import { fetchTableRows, fetchTables } from "./../api/api";

export const fetchTableThunk = () => {
  return async (dispatch) => {
    const tables = await fetchTables();
    if (tables) {
      dispatch(addTables(tables));
    }
  };
};

export const fetchTableRowsThunk = (tableName) => {
  return async (dispatch) => {
    const tableRows = await fetchTableRows(tableName);
    console.log(tableRows);
    if (tableRows) {
      dispatch(setActiveTableRows(tableRows));
    }
  };
};
