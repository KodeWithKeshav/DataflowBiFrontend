/**
 * Mock data fallback — only used when the backend is unreachable.
 * Mirrors the exact shapes returned by the Spring Boot backend.
 */

// ── Table Metadata ─────────────────────────────────────────
export const MOCK_TABLES = [
  {
    tableName: "employees",
    columns: [
      { columnName: "employee_id",   dataType: "INT",     logicalType: "NUMBER" },
      { columnName: "first_name",    dataType: "VARCHAR", logicalType: "STRING" },
      { columnName: "last_name",     dataType: "VARCHAR", logicalType: "STRING" },
      { columnName: "department",    dataType: "VARCHAR", logicalType: "STRING" },
      { columnName: "salary",        dataType: "DECIMAL", logicalType: "NUMBER" },
      { columnName: "hire_date",     dataType: "DATE",    logicalType: "DATE"   },
      { columnName: "performance",   dataType: "DECIMAL", logicalType: "NUMBER" },
    ],
  },
  {
    tableName: "products",
    columns: [
      { columnName: "product_id",    dataType: "INT",     logicalType: "NUMBER" },
      { columnName: "product_name",  dataType: "VARCHAR", logicalType: "STRING" },
      { columnName: "category",      dataType: "VARCHAR", logicalType: "STRING" },
      { columnName: "price",         dataType: "DECIMAL", logicalType: "NUMBER" },
      { columnName: "stock_qty",     dataType: "INT",     logicalType: "NUMBER" },
      { columnName: "supplier",      dataType: "VARCHAR", logicalType: "STRING" },
    ],
  },
  {
    tableName: "orders",
    columns: [
      { columnName: "order_id",      dataType: "INT",     logicalType: "NUMBER" },
      { columnName: "customer_name", dataType: "VARCHAR", logicalType: "STRING" },
      { columnName: "order_date",    dataType: "DATE",    logicalType: "DATE"   },
      { columnName: "total_amount",  dataType: "DECIMAL", logicalType: "NUMBER" },
      { columnName: "status",        dataType: "VARCHAR", logicalType: "STRING" },
      { columnName: "quantity",      dataType: "INT",     logicalType: "NUMBER" },
    ],
  },
];

// ── Table Rows ─────────────────────────────────────────────
export const MOCK_TABLE_ROWS = {
  employees: [
    { employee_id: 1,  first_name: "Alice",   last_name: "Johnson",  department: "Engineering", salary: 95000,  hire_date: "2021-03-15", performance: 4.5 },
    { employee_id: 2,  first_name: "Bob",     last_name: "Smith",    department: "Marketing",   salary: 72000,  hire_date: "2020-07-22", performance: 3.8 },
    { employee_id: 3,  first_name: "Carol",   last_name: "Williams", department: "Engineering", salary: 105000, hire_date: "2019-01-10", performance: 4.9 },
    { employee_id: 4,  first_name: "David",   last_name: "Brown",    department: "Sales",       salary: 68000,  hire_date: "2022-06-01", performance: 3.5 },
    { employee_id: 5,  first_name: "Eve",     last_name: "Davis",    department: "HR",          salary: 78000,  hire_date: "2020-11-18", performance: 4.2 },
    { employee_id: 6,  first_name: "Frank",   last_name: "Miller",   department: "Engineering", salary: 112000, hire_date: "2018-09-05", performance: 4.7 },
    { employee_id: 7,  first_name: "Grace",   last_name: "Wilson",   department: "Marketing",   salary: 65000,  hire_date: "2023-02-14", performance: 3.9 },
    { employee_id: 8,  first_name: "Henry",   last_name: "Moore",    department: "Sales",       salary: 71000,  hire_date: "2021-08-30", performance: 4.1 },
    { employee_id: 9,  first_name: "Ivy",     last_name: "Taylor",   department: "HR",          salary: 82000,  hire_date: "2019-12-20", performance: 4.4 },
    { employee_id: 10, first_name: "Jack",    last_name: "Anderson", department: "Engineering", salary: 98000,  hire_date: "2020-04-11", performance: 4.6 },
  ],
  products: [
    { product_id: 1,  product_name: "Laptop Pro 15",    category: "Electronics", price: 1299.99, stock_qty: 45,  supplier: "TechCorp" },
    { product_id: 2,  product_name: "Wireless Mouse",   category: "Accessories", price: 29.99,   stock_qty: 230, supplier: "PeripheralCo" },
    { product_id: 3,  product_name: "Standing Desk",    category: "Furniture",   price: 549.00,  stock_qty: 18,  supplier: "OfficePlus" },
    { product_id: 4,  product_name: "Monitor 27\"",     category: "Electronics", price: 399.99,  stock_qty: 62,  supplier: "TechCorp" },
    { product_id: 5,  product_name: "Keyboard Mech",    category: "Accessories", price: 89.99,   stock_qty: 150, supplier: "PeripheralCo" },
    { product_id: 6,  product_name: "Webcam HD",        category: "Electronics", price: 79.99,   stock_qty: 95,  supplier: "VisionTech" },
    { product_id: 7,  product_name: "Desk Lamp LED",    category: "Furniture",   price: 34.99,   stock_qty: 200, supplier: "OfficePlus" },
    { product_id: 8,  product_name: "USB-C Hub",        category: "Accessories", price: 49.99,   stock_qty: 120, supplier: "TechCorp" },
    { product_id: 9,  product_name: "Ergonomic Chair",  category: "Furniture",   price: 699.00,  stock_qty: 25,  supplier: "OfficePlus" },
    { product_id: 10, product_name: "Noise-Cancel Headphones", category: "Electronics", price: 249.99, stock_qty: 78, supplier: "AudioMax" },
  ],
  orders: [
    { order_id: 1001, customer_name: "Acme Corp",       order_date: "2024-01-15", total_amount: 4500.00,  status: "Delivered",  quantity: 5  },
    { order_id: 1002, customer_name: "GlobalTech",      order_date: "2024-01-22", total_amount: 12300.50, status: "Delivered",  quantity: 12 },
    { order_id: 1003, customer_name: "StartupXYZ",      order_date: "2024-02-03", total_amount: 890.00,   status: "Shipped",    quantity: 3  },
    { order_id: 1004, customer_name: "MegaRetail",      order_date: "2024-02-18", total_amount: 25600.00, status: "Delivered",  quantity: 30 },
    { order_id: 1005, customer_name: "Acme Corp",       order_date: "2024-03-01", total_amount: 3200.75,  status: "Processing", quantity: 4  },
    { order_id: 1006, customer_name: "DesignStudio",    order_date: "2024-03-10", total_amount: 1549.00,  status: "Delivered",  quantity: 2  },
    { order_id: 1007, customer_name: "GlobalTech",      order_date: "2024-03-22", total_amount: 8750.00,  status: "Shipped",    quantity: 8  },
    { order_id: 1008, customer_name: "EduLearn",        order_date: "2024-04-05", total_amount: 6400.00,  status: "Delivered",  quantity: 10 },
    { order_id: 1009, customer_name: "MegaRetail",      order_date: "2024-04-15", total_amount: 19200.00, status: "Processing", quantity: 25 },
    { order_id: 1010, customer_name: "StartupXYZ",      order_date: "2024-04-28", total_amount: 2100.00,  status: "Shipped",    quantity: 6  },
  ],
};

// ── KPI Generator ──────────────────────────────────────────
function computeMockKpis(tableName, selectedColumns) {
  const rows = MOCK_TABLE_ROWS[tableName] || [];
  const table = MOCK_TABLES.find(t => t.tableName === tableName);
  if (!table || rows.length === 0) return [];

  const kpis = [];

  for (const colName of selectedColumns) {
    const colMeta = table.columns.find(c => c.columnName === colName);
    if (!colMeta) continue;

    const values = rows.map(r => r[colName]).filter(v => v !== null && v !== undefined);

    if (colMeta.logicalType === "NUMBER") {
      const nums = values.map(Number);
      kpis.push({ columnName: colName, function: "SUM",   value: nums.reduce((a, b) => a + b, 0) });
      kpis.push({ columnName: colName, function: "AVG",   value: nums.reduce((a, b) => a + b, 0) / nums.length });
      kpis.push({ columnName: colName, function: "MIN",   value: Math.min(...nums) });
      kpis.push({ columnName: colName, function: "MAX",   value: Math.max(...nums) });
      kpis.push({ columnName: colName, function: "COUNT", value: nums.length });
    } else if (colMeta.logicalType === "STRING") {
      const freq = {};
      values.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
      const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
      kpis.push({ columnName: colName, function: "COUNT",          value: values.length });
      kpis.push({ columnName: colName, function: "COUNT_DISTINCT", value: new Set(values).size });
      kpis.push({ columnName: colName, function: "MOST_FREQUENT",  value: sorted[0]?.[0] || "—" });
      kpis.push({ columnName: colName, function: "LEAST_FREQUENT", value: sorted[sorted.length - 1]?.[0] || "—" });
      kpis.push({ columnName: colName, function: "NULL_COUNT",     value: rows.length - values.length });
      kpis.push({ columnName: colName, function: "NON_NULL_COUNT", value: values.length });
    } else if (colMeta.logicalType === "DATE") {
      const sorted = [...values].sort();
      kpis.push({ columnName: colName, function: "MIN",   value: sorted[0] });
      kpis.push({ columnName: colName, function: "MAX",   value: sorted[sorted.length - 1] });
      kpis.push({ columnName: colName, function: "COUNT", value: values.length });
    }
  }

  return kpis;
}

// ── Analysis Generator ─────────────────────────────────────
function applyMockFilters(rows, filters) {
  if (!filters || filters.length === 0) return rows;

  return rows.filter(row => {
    return filters.every(f => {
      const val = row[f.columnName];
      if (val === null || val === undefined) return false;

      const filterVals = f.values || [];
      switch (f.operator) {
        case "EQUALS":
          return String(val) === String(filterVals[0]);
        case "NOT_EQUALS":
          return String(val) !== String(filterVals[0]);
        case "GREATER_THAN":
          return Number(val) > Number(filterVals[0]);
        case "LESS_THAN":
          return Number(val) < Number(filterVals[0]);
        case "BETWEEN":
          return Number(val) >= Number(filterVals[0]) && Number(val) <= Number(filterVals[1]);
        case "CONTAINS":
          return String(val).toLowerCase().includes(String(filterVals[0]).toLowerCase());
        default:
          return true;
      }
    });
  });
}

function computeMockAnalysis(requestBody) {
  const { tableName, dimensions, measureColumns, aggregationType, filters } = requestBody;
  const allRows = MOCK_TABLE_ROWS[tableName] || [];

  if (!dimensions?.length || !measureColumns?.length) {
    return { data: [], suggestedCharts: [], metaData: {} };
  }

  // Apply filters before aggregation (mirrors backend WHERE clause)
  const rows = applyMockFilters(allRows, filters);

  const dim = dimensions[0];
  const measure = measureColumns[0];

  // Group by dimension
  const groups = {};
  rows.forEach(row => {
    const key = String(row[dim] ?? "Unknown");
    if (!groups[key]) groups[key] = [];
    groups[key].push(Number(row[measure]) || 0);
  });

  const aggFn = aggregationType || "SUM";
  const data = Object.entries(groups).map(([key, vals]) => {
    let aggValue;
    switch (aggFn) {
      case "AVG": aggValue = vals.reduce((a, b) => a + b, 0) / vals.length; break;
      case "MIN": aggValue = Math.min(...vals); break;
      case "MAX": aggValue = Math.max(...vals); break;
      case "COUNT": aggValue = vals.length; break;
      default: aggValue = vals.reduce((a, b) => a + b, 0);
    }
    // ✅ Use "value" as the data key — matches what BarChart / PieChart expect
    return { [dim]: key, value: Math.round(aggValue * 100) / 100 };
  });

  // ✅ Chart types match the backend's AnalysisService output (BAR, PIE, LINE — NOT BAR_CHART etc.)
  const dimLower = dim.toLowerCase();
  const suggestedCharts = [];

  if (dimLower.includes("date") || dimLower.includes("time") || dimLower.includes("month") || dimLower.includes("year")) {
    suggestedCharts.push(
      { chartType: "LINE",  xAxisColumn: dim, yAxisColumn: measure, sizeColumn: null, insightMessage: `Trend over ${dim}` },
      { chartType: "BAR",   xAxisColumn: dim, yAxisColumn: measure, sizeColumn: null, insightMessage: `${measure} by ${dim}` },
    );
  } else {
    suggestedCharts.push(
      { chartType: "BAR",   xAxisColumn: dim, yAxisColumn: measure, sizeColumn: null, insightMessage: `Categorical comparison` },
      { chartType: "PIE",   xAxisColumn: dim, yAxisColumn: measure, sizeColumn: null, insightMessage: `Part-to-whole relationship` },
    );
  }

  // ✅ metaData matches ChartMetaData DTO — seriesKeys contains "value" for LineChart compatibility
  const metaData = {
    xAxisKey: dim,
    yAxisKey: "value",
    seriesKeys: ["value"],
    facetKeys: [],
  };

  return { data, suggestedCharts, metaData };
}

// ── Public mock API functions ──────────────────────────────
export function mockFetchTables() {
  return MOCK_TABLES;
}

export function mockFetchTableRows(tableName) {
  return MOCK_TABLE_ROWS[tableName] || [];
}

export function mockAnalyseSelection(requestBody) {
  return computeMockAnalysis(requestBody);
}

export function mockFetchKpis(tableName, selectedColumns) {
  return { kpis: computeMockKpis(tableName, selectedColumns) };
}
