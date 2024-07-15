// src/api/api.js

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const apiFetch = async (endpoint, options = {}) => {
  const url = `${backendUrl}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export default apiFetch;
