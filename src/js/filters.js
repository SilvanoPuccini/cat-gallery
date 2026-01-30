/**
 * Filters Module - Gestión de Filtros
 * Maneja la carga y renderizado de razas para filtros
 */

const BREEDS_API_URL = "https://api.thecatapi.com/v1/breeds";

/**
 * Obtiene la lista de razas desde la API
 * @returns {Promise<Array>} Array de objetos de razas
 */
export async function fetchBreeds() {
  try {
    const response = await fetch(BREEDS_API_URL);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudieron cargar las razas`);
    }

    const breeds = await response.json();

    // Validar respuesta
    if (!Array.isArray(breeds)) {
      throw new Error("Respuesta inválida de la API de razas");
    }

    console.log(`✅ ${breeds.length} razas cargadas`);
    return breeds;
  } catch (error) {
    console.error("❌ Error en fetchBreeds:", error);
    throw error;
  }
}

/**
 * Renderiza las opciones de razas en el select
 * @param {Array} breeds - Array de objetos de razas
 * @param {string} selectId - ID del elemento select (default: "breedSelect")
 */
export function renderBreedOptions(breeds, selectId = "breedSelect") {
  const select = document.getElementById(selectId);

  if (!select) {
    console.error(`❌ No se encontró el elemento select con ID: ${selectId}`);
    return;
  }

  // Limpiar opciones existentes (excepto la primera "Todas las razas")
  const firstOption = select.firstElementChild;
  select.innerHTML = "";
  if (firstOption) {
    select.appendChild(firstOption);
  }

  // Validar que breeds sea un array
  if (!Array.isArray(breeds) || breeds.length === 0) {
    console.warn("⚠️ No hay razas para renderizar");
    return;
  }

  // Renderizar opciones
  breeds.forEach((breed) => {
    if (!breed.id || !breed.name) {
      console.warn("⚠️ Raza con datos inválidos:", breed);
      return;
    }

    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    select.appendChild(option);
  });

  console.log(`✅ ${breeds.length} razas renderizadas en el selector`);
}

/**
 * Obtiene la raza seleccionada actualmente
 * @param {string} selectId - ID del elemento select
 * @returns {string} ID de la raza seleccionada (vacío si es "todas")
 */
export function getSelectedBreed(selectId = "breedSelect") {
  const select = document.getElementById(selectId);
  if (!select) return "";
  return select.value;
}

/**
 * Resetea el filtro de razas a "Todas las razas"
 * @param {string} selectId - ID del elemento select
 */
export function resetBreedFilter(selectId = "breedSelect") {
  const select = document.getElementById(selectId);
  if (select) {
    select.selectedIndex = 0;
    console.log("✅ Filtro de razas reseteado");
  }
}
