import axios from "axios";

const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

export async function fetchTables() {
  try {
    const response = await axios.get(`${baseUrl}/tables`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTableRows(tableName) {
  try {
    const response = await axios.get(
      `${baseUrl}/dashboard/table/${tableName}/10`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function analyseSelection(analysisBody) {
  try {
    const response = await axios.post(`${baseUrl}/analyze`, analysisBody);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
