"use server";
import { api } from "./api"; // Ajusta la ruta según tu estructura

export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // Llamada al backend
    const result = await api.post("/api/auth/login", { email, password });

    // Devuelve directamente lo que retorna el backend
    return {
      success: result.success,
      user: result.user || null,
      error: result.error || null,
    };
  } catch (error) {
    console.error("Error en loginAction:", error);
    return { success: false, user: null, error: error.message || "Error al iniciar sesión" };
  }
}

export async function registerAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // Llamada al backend
    const result = await api.post("/api/auth/register", { email, password });

    // Devuelve directamente lo que retorna el backend
    return {
      success: result.success,
      user: result.user || null,
      error: result.error || null,
    };
  } catch (error) {
    console.error("Error en loginAction:", error);
    return { success: false, user: null, error: error.message || "Error al iniciar sesión" };
  }
}