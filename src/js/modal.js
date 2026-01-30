/**
 * Modal Module - Modal de Detalles
 * Maneja la apertura y cierre del modal con información del gato
 */

import { fetchCatDetails } from "./api.js";

// Elementos del DOM
const modal = document.getElementById("catModal");
const modalImage = document.getElementById("modalImage");
const modalBreed = document.getElementById("modalBreed");
const modalOrigin = document.getElementById("modalOrigin");
const modalTemperament = document.getElementById("modalTemperament");
const closeBtn = document.getElementById("closeModal");
const overlay = document.querySelector(".modal-overlay");

/**
 * Abre el modal con información del gato
 * @param {Object} cat - Objeto del gato con sus datos
 */
export async function openModal(cat) {
  if (!cat || !cat.id) {
    console.error("❌ Datos de gato inválidos para el modal");
    return;
  }

  console.log("🐱 Abriendo modal para:", cat.id);

  // Mostrar imagen inmediatamente (mejor UX)
  if (cat.url) {
    modalImage.src = cat.url;
    modalImage.alt = "Imagen de gato";
  }

  // Estado de carga
  showLoadingState();

  try {
    // Intentar usar datos existentes primero
    if (cat.breeds && cat.breeds.length > 0) {
      populateBreedInfo(cat);
    } else {
      // Fallback: obtener detalles desde la API
      console.log("ℹ️ Obteniendo detalles adicionales del gato...");
      const detailedCat = await fetchCatDetails(cat.id);
      populateBreedInfo(detailedCat);
    }
  } catch (error) {
    console.warn("⚠️ Error obteniendo detalles:", error.message);
    // Mostrar datos básicos aunque fallen los detalles
    populateBreedInfo(cat);
  }

  // Mostrar modal
  modal.classList.remove("hidden");
  
  // Prevenir scroll del body cuando modal está abierto
  document.body.style.overflow = "hidden";
}

/**
 * Cierra el modal
 */
export function closeModal() {
  modal.classList.add("hidden");
  
  // Restaurar scroll del body
  document.body.style.overflow = "";
  
  console.log("✅ Modal cerrado");
}

/**
 * Muestra estado de carga en el modal
 */
function showLoadingState() {
  modalBreed.textContent = "Cargando...";
  modalOrigin.textContent = "—";
  modalTemperament.textContent = "—";
}

/**
 * Puebla la información de la raza en el modal
 * @param {Object} cat - Objeto del gato con datos de raza
 */
function populateBreedInfo(cat) {
  if (!cat) {
    showNoDataState();
    return;
  }

  // Si tiene información de raza
  if (cat.breeds && Array.isArray(cat.breeds) && cat.breeds.length > 0) {
    const breed = cat.breeds[0];
    
    modalBreed.textContent = breed.name || "Raza desconocida";
    modalOrigin.textContent = breed.origin || "Origen desconocido";
    modalTemperament.textContent = breed.temperament || "No especificado";
    
    // Agregar más información si está disponible
    updateAdditionalInfo(breed);
  } else {
    // Sin información de raza
    showNoDataState();
  }
}

/**
 * Muestra estado cuando no hay datos disponibles
 */
function showNoDataState() {
  modalBreed.textContent = "Raza desconocida";
  modalOrigin.textContent = "—";
  modalTemperament.textContent = "—";
}

/**
 * Actualiza información adicional del modal (opcional)
 * @param {Object} breed - Objeto con información de la raza
 */
function updateAdditionalInfo(breed) {
  // Opcional: agregar más campos si existen en tu HTML
  const modalDescription = document.getElementById("modalDescription");
  if (modalDescription && breed.description) {
    modalDescription.textContent = breed.description;
  }

  const modalLifeSpan = document.getElementById("modalLifeSpan");
  if (modalLifeSpan && breed.life_span) {
    modalLifeSpan.textContent = `${breed.life_span} años`;
  }

  const modalWeight = document.getElementById("modalWeight");
  if (modalWeight && breed.weight) {
    modalWeight.textContent = `${breed.weight.metric} kg`;
  }
}

/**
 * Maneja el error de carga de imagen en el modal
 */
modalImage.addEventListener("error", () => {
  console.error("❌ Error cargando imagen del modal");
  modalImage.alt = "Imagen no disponible";
  modalImage.style.backgroundColor = "#333";
});

// Event Listeners
if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

if (overlay) {
  overlay.addEventListener("click", closeModal);
}

// Cerrar modal con tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Prevenir cierre al hacer click dentro del contenido del modal
const modalContent = document.querySelector(".modal-content");
if (modalContent) {
  modalContent.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

console.log("✅ Modal module inicializado");
