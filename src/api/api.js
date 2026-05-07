import axios from "axios";
import {
  mockFetchTables,
  mockFetchTableRows,
  mockAnalyseSelection,
  mockFetchKpis,
} from "./mockData";

const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000, // 5 seconds — fail fast when backend is down
});

let _isMockMode = false;
const _listeners = new Set();

export function isMockMode() {
  return _isMockMode;
}

/** Subscribe to mock-mode changes. Returns an unsubscribe function. */
export function onMockModeChange(listener) {
  _listeners.add(listener);
  return () => _listeners.delete(listener);
}

function setMockMode(value) {
  if (_isMockMode !== value) {
    _isMockMode = value;
    _listeners.forEach((fn) => fn(value));
  }
}

function isNetworkError(error) {
  // No response received at all (server unreachable)
  if (!error.response) {
    return (
      error.code === "ERR_NETWORK" ||
      error.code === "ECONNREFUSED" ||
      error.code === "ECONNABORTED" || // timeout
      error.code === "ERR_BAD_REQUEST" ||
      error.message?.includes("Network Error") ||
      error.message?.includes("timeout")
    );
  }
  return false;
}

// ── API functions ─────────────────────────────────────────────

export async function fetchTables() {
  try {
    const response = await api.get("/tables");
    setMockMode(false);
    return response.data;
  } catch (error) {
    if (isNetworkError(error)) {
      console.warn("[API] Backend unreachable — using mock tables");
      setMockMode(true);
      return mockFetchTables();
    }
    console.log(error);
  }
}

export async function fetchTableRows(tableName) {
  try {
    const response = await api.get(`/dashboard/table/${tableName}/10`);
    setMockMode(false);
    return response.data;
  } catch (error) {
    if (isNetworkError(error)) {
      console.warn("[API] Backend unreachable — using mock table rows");
      setMockMode(true);
      return mockFetchTableRows(tableName);
    }
    console.log(error);
  }
}

export async function analyseSelection(analysisBody) {
  if (!analysisBody) {
    return;
  }
  try {
    const response = await api.post("/analyze", analysisBody);
    setMockMode(false);
    return response.data;
  } catch (error) {
    if (isNetworkError(error)) {
      console.warn("[API] Backend unreachable — using mock analysis");
      setMockMode(true);
      return mockAnalyseSelection(analysisBody);
    }
    console.log(error);
  }
}

export async function fetchKpis(tableName, selectedColumns) {
  try {
    const response = await api.post("/kpi", {
      tableName,
      selectedColumns,
    });
    setMockMode(false);
    return response.data;
  } catch (error) {
    if (isNetworkError(error)) {
      console.warn("[API] Backend unreachable — using mock KPIs");
      setMockMode(true);
      return mockFetchKpis(tableName, selectedColumns);
    }
    console.log(error);
    throw error;
  }
}
