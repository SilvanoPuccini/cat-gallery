/**
 * API Module - The Cat API Integration
 * Maneja todas las peticiones a la API de gatos
 */

const BASE_URL = "https://api.thecatapi.com/v1/images/search";
const LIMIT = 9; // Número de imágenes por página

/**
 * Obtiene gatos de la API con paginación y filtros
 * @param {string} breedId - ID de la raza (opcional)
 * @param {number} page - Número de página para scroll infinito
 * @returns {Promise<Array>} Array de objetos de gatos
 */
export async function fetchCats(breedId = "", page = 0) {
  try {
    let url = `${BASE_URL}?limit=${LIMIT}&page=${page}&order=ASC&has_breeds=1`;

    if (breedId) {
      url += `&breed_ids=${breedId}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Validación de respuesta
    if (!Array.isArray(data)) {
      throw new Error("Respuesta inválida de la API");
    }

    // Validar que tengamos datos
    if (data.length === 0) {
      console.warn("⚠️ No se encontraron gatos en esta página");
    }

    return data;
  } catch (error) {
    console.error("❌ fetchCats error:", error);
    throw error; // Re-lanzar para que el llamador maneje el error
  }
}

/**
 * Obtiene los detalles completos de un gato específico por ID
 * @param {string} catId - ID único del gato
 * @returns {Promise<Object>} Objeto con datos completos del gato
 */
export async function fetchCatDetails(catId) {
  try {
    const response = await fetch(`https://api.thecatapi.com/v1/images/${catId}`);

    if (!response.ok) {
      throw new Error(`Error obteniendo detalles: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ fetchCatDetails error:", error);
    throw error;
  }
}
