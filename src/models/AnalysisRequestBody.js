export const createAnalysisRequest = (
  table,
  columns,
  selectedColumns = [],
  aggregationType = "SUM",
) => {
  console.log(columns);
  const dimensions = columns
    .filter((column) => selectedColumns.includes(column.columnName))
    .filter(
      (column) =>
        column.logicalType === "STRING" || column.logicalType === "DATE",
    )
    .map((column) => column.columnName);

  const measureColumns = columns
    .filter((column) => selectedColumns.includes(column.columnName))
    .filter(
      (column) =>
        column.logicalType === "NUMBER" || column.logicalType === "DECIMAL",
    )
    .map((column) => column.columnName);

  return {
    tableName: table.tableName,
    dimensions: dimensions,
    measureColumns: measureColumns,
    aggregationType,
    filters: [],
  };
};
