// api.js
const BASE_URL = "http://localhost:5051";

async function request(endpoint, method = "GET", body = null) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      // Aquí puedes agregar Authorization si usas JWT
      // "Authorization": `Bearer ${token}`,
    },
  };  

  if (body) {
    config.body = JSON.stringify(body);
  }

const res = await fetch(`${BASE_URL}${endpoint}`, config);

const text = await res.text();

if (!res.ok) {
  throw new Error(`Backend error ${res.status}`);
}

return JSON.parse(text);
}

// Funciones helper
export const api = {
  get: (endpoint) => request(endpoint, "GET"),
  post: (endpoint, body) => request(endpoint, "POST", body),
  put: (endpoint, body) => request(endpoint, "PUT", body),
  patch: (endpoint, body) => request(endpoint, "PATCH", body),
  delete: (endpoint) => request(endpoint, "DELETE"),
};