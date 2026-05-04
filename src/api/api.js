import axios from "axios";

const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

// ─── Mock / Fallback Data ──────────────────────────────────────
// Used only when the backend is unreachable. Real endpoints stay intact.

const MOCK_TABLES = [
  {
    tableName: "orders",
    columns: [
      { columnName: "order_id", logicalType: "NUMBER" },
      { columnName: "product_category", logicalType: "STRING" },
      { columnName: "region", logicalType: "STRING" },
      { columnName: "order_date", logicalType: "STRING" },
      { columnName: "total_amount", logicalType: "NUMBER" },
      { columnName: "quantity", logicalType: "NUMBER" },
    ],
  },
  {
    tableName: "customers",
    columns: [
      { columnName: "customer_id", logicalType: "NUMBER" },
      { columnName: "name", logicalType: "STRING" },
      { columnName: "country", logicalType: "STRING" },
      { columnName: "lifetime_value", logicalType: "NUMBER" },
    ],
  },
  {
    tableName: "products",
    columns: [
      { columnName: "product_id", logicalType: "NUMBER" },
      { columnName: "product_name", logicalType: "STRING" },
      { columnName: "category", logicalType: "STRING" },
      { columnName: "price", logicalType: "NUMBER" },
      { columnName: "stock", logicalType: "NUMBER" },
    ],
  },
];

const MOCK_ROWS = {
  orders: [
    { order_id: 1, product_category: "Electronics", region: "North", order_date: "2025-01-10", total_amount: 1200, quantity: 2 },
    { order_id: 2, product_category: "Clothing", region: "South", order_date: "2025-01-12", total_amount: 450, quantity: 1 },
    { order_id: 3, product_category: "Electronics", region: "East", order_date: "2025-02-03", total_amount: 2200, quantity: 5 },
    { order_id: 4, product_category: "Books", region: "West", order_date: "2025-02-20", total_amount: 120, quantity: 3 },
    { order_id: 5, product_category: "Clothing", region: "North", order_date: "2025-03-11", total_amount: 980, quantity: 2 },
    { order_id: 6, product_category: "Electronics", region: "South", order_date: "2025-03-15", total_amount: 3300, quantity: 7 },
    { order_id: 7, product_category: "Books", region: "East", order_date: "2025-04-01", total_amount: 340, quantity: 4 },
    { order_id: 8, product_category: "Clothing", region: "West", order_date: "2025-04-12", total_amount: 1550, quantity: 3 },
    { order_id: 9, product_category: "Electronics", region: "North", order_date: "2025-04-22", total_amount: 4100, quantity: 8 },
    { order_id: 10, product_category: "Books", region: "South", order_date: "2025-05-01", total_amount: 210, quantity: 2 },
  ],
  customers: [
    { customer_id: 1, name: "Alice", country: "USA", lifetime_value: 1200 },
    { customer_id: 2, name: "Bob", country: "Canada", lifetime_value: 980 },
    { customer_id: 3, name: "Celine", country: "USA", lifetime_value: 450 },
    { customer_id: 4, name: "David", country: "UK", lifetime_value: 2200 },
    { customer_id: 5, name: "Eva", country: "Germany", lifetime_value: 3100 },
    { customer_id: 6, name: "Frank", country: "USA", lifetime_value: 870 },
    { customer_id: 7, name: "Grace", country: "Canada", lifetime_value: 1650 },
    { customer_id: 8, name: "Henry", country: "UK", lifetime_value: 740 },
    { customer_id: 9, name: "Iris", country: "Germany", lifetime_value: 2900 },
    { customer_id: 10, name: "Jack", country: "USA", lifetime_value: 1100 },
  ],
  products: [
    { product_id: 1, product_name: "Laptop Pro", category: "Electronics", price: 1299, stock: 45 },
    { product_id: 2, product_name: "Wireless Mouse", category: "Electronics", price: 29, stock: 320 },
    { product_id: 3, product_name: "Denim Jacket", category: "Clothing", price: 89, stock: 150 },
    { product_id: 4, product_name: "Python Handbook", category: "Books", price: 42, stock: 200 },
    { product_id: 5, product_name: "Monitor 27\"", category: "Electronics", price: 399, stock: 60 },
    { product_id: 6, product_name: "Running Shoes", category: "Clothing", price: 120, stock: 95 },
    { product_id: 7, product_name: "Data Science Guide", category: "Books", price: 55, stock: 180 },
    { product_id: 8, product_name: "Keyboard RGB", category: "Electronics", price: 75, stock: 210 },
    { product_id: 9, product_name: "Winter Coat", category: "Clothing", price: 199, stock: 70 },
    { product_id: 10, product_name: "AI Fundamentals", category: "Books", price: 38, stock: 250 },
  ],
};

function mockAnalyse(analysisBody) {
  const { tableName, dimensions, measureColumn, aggregationType } = analysisBody;
  const rows = MOCK_ROWS[tableName] || [];

  // Simple aggregation by the first dimension
  const dim = dimensions[0];
  const grouped = {};
  rows.forEach((row) => {
    const key = row[dim] || "Unknown";
    if (!grouped[key]) grouped[key] = { count: 0, sum: 0 };
    grouped[key].count += 1;
    grouped[key].sum += Number(row[measureColumn]) || 0;
  });

  const chartData = Object.entries(grouped).map(([key, val]) => ({
    [dim]: key,
    [measureColumn]: aggregationType === "COUNT" ? val.count : val.sum,
  }));

  return {
    chartData,
    suggestedChartTypes: ["Bar Chart", "Pie Chart", "Line Chart", "Donut Chart"],
  };
}

// ─── API Functions (with fallback) ─────────────────────────────

export async function fetchTables() {
  try {
    if (!baseUrl || baseUrl === 'undefined') throw new Error("No backend URL configured");
    const response = await axios.get(`${baseUrl}/tables`);
    if (!Array.isArray(response.data)) throw new Error("Invalid response format");
    return response.data;
  } catch (error) {
    console.log("Backend unavailable, using mock data:", error.message);
    return MOCK_TABLES;
  }
}

export async function fetchTableRows(tableName) {
  try {
    if (!baseUrl || baseUrl === 'undefined') throw new Error("No backend URL configured");
    const response = await axios.get(
      `${baseUrl}/dashboard/table/${tableName}/10`,
    );
    if (!Array.isArray(response.data)) throw new Error("Invalid response format");
    return response.data;
  } catch (error) {
    console.log("Backend unavailable, using mock data:", error.message);
    return MOCK_ROWS[tableName] || [];
  }
}

export async function analyseSelection(analysisBody) {
  try {
    if (!baseUrl || baseUrl === 'undefined') throw new Error("No backend URL configured");
    const response = await axios.post(`${baseUrl}/analyze`, analysisBody);
    if (!response.data || typeof response.data === 'string') throw new Error("Invalid response format");
    return response.data;
  } catch (error) {
    console.log("Backend unavailable, using mock data:", error.message);
    return mockAnalyse(analysisBody);
  }
}
