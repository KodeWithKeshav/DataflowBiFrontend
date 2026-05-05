export const createAnalysisRequest = (
  table,
  columns,
  selectedColumns = [],
  aggregationType = "SUM",
  filters = [],
) => {
  console.log(columns);
  const dimensions = columns
    .filter((column) => selectedColumns.includes(column.columnName))
    .filter((column) => column.logicalType === "STRING")
    .map((column) => column.columnName);

  const measureColumns = columns
    .filter((column) => selectedColumns.includes(column.columnName))
    .filter(
      (column) =>
        column.logicalType === "NUMBER" || column.logicalType === "DECIMAL",
    )
    .map((column) => column.columnName);

  const dateColumns = columns
    .filter((column) => selectedColumns.includes(column.columnName))
    .filter((column) => column.logicalType === "DATE")
    .map((column) => column.columnName);

  // it needs to be handled properly
  if (dateColumns.length > 1) {
    console.log("two date columns cannot have a graph");
    return;
  }

  const requestBody = {
    tableName: table.tableName,
    dimensions: dimensions,
    measureColumns: measureColumns,
    aggregationType,
    filters,
  };

  if (dateColumns.length == 1) {
    requestBody["dateColumn"] = { columnName: dateColumns[0], by: "MONTH" }; // can be YEAR, DAY
  }

  return requestBody;
};
