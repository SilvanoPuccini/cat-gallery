/**
 * Main Module - Punto de Entrada de la Aplicación
 * Coordina todos los módulos y maneja el estado global
 */

import { fetchCats } from "./api.js";
import { renderGallery, renderFavorites, clearGallery } from "./gallery.js";
import { fetchBreeds, renderBreedOptions } from "./filters.js";

// =============================================
// ELEMENTOS DEL DOM
// =============================================
const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");
const errorDiv = document.getElementById("error");
const breedSelect = document.getElementById("breedSelect");
const sentinel = document.getElementById("scrollSentinel");
const galleryWrapper = document.querySelector(".gallery-wrapper");

// Panel de Favoritos
const favoritesBtn = document.getElementById("favoritesBtn");
const favoritesPanel = document.getElementById("favoritesPanel");
const closeFavoritesPanel = document.getElementById("closeFavoritesPanel");

// =============================================
// ESTADO DE LA APLICACIÓN
// =============================================
const appState = {
  loading: false,
  currentBreed: "",
  currentPage: 0,
  hasMoreData: true,
  favoritesOpen: false,
};

// =============================================
// PANEL DE FAVORITOS
// =============================================

/**
 * Abre el panel de favoritos
 */
function openFavoritesPanel() {
  document.body.classList.add("favorites-open");
  favoritesPanel?.classList.remove("hidden");
  appState.favoritesOpen = true;
  renderFavorites();
  console.log("✅ Panel de favoritos abierto");
}

/**
 * Cierra el panel de favoritos
 */
function closeFavoritesPanelHandler() {
  document.body.classList.remove("favorites-open");
  favoritesPanel?.classList.add("hidden");
  appState.favoritesOpen = false;
  console.log("✅ Panel de favoritos cerrado");
}

// Event Listeners del panel
if (favoritesBtn) {
  favoritesBtn.addEventListener("click", openFavoritesPanel);
}

if (closeFavoritesPanel) {
  closeFavoritesPanel.addEventListener("click", closeFavoritesPanelHandler);
}

// =============================================
// CARGA DE GATOS CON PAGINACIÓN
// =============================================

/**
 * Carga gatos desde la API con paginación
 */
async function loadCats() {
  // Prevenir múltiples cargas simultáneas
  if (appState.loading || !appState.hasMoreData) {
    return;
  }

  appState.loading = true;
  showLoader();
  hideError();

  try {
    console.log(`📥 Cargando página ${appState.currentPage}...`);

    const cats = await fetchCats(appState.currentBreed, appState.currentPage);

    // Verificar si hay más datos
    if (!cats || cats.length === 0) {
      appState.hasMoreData = false;
      showNoMoreDataMessage();
      console.log("ℹ️ No hay más gatos para cargar");
      return;
    }

    // Renderizar gatos
    renderGallery(cats, gallery);

    // Incrementar página para próxima carga
    appState.currentPage++;

    console.log(
      `✅ Página ${appState.currentPage - 1} cargada con ${cats.length} gatos`,
    );
  } catch (error) {
    console.error("❌ Error al cargar gatos:", error);
    showError(error.message || "Error al cargar los gatos");
  } finally {
    hideLoader();
    appState.loading = false;
  }
}

/**
 * Resetea la galería y recarga desde el principio
 */
function resetAndReload() {
  // Resetear estado
  appState.currentPage = 0;
  appState.hasMoreData = true;

  // Limpiar galería
  clearGallery(gallery);

  // Cargar primera página
  loadCats();

  console.log("🔄 Galería reseteada y recargada");
}

// =============================================
// SCROLL INFINITO
// =============================================

/**
 * Configurar observer para scroll infinito
 */
function setupInfiniteScroll() {
  if (!sentinel || !galleryWrapper) {
    console.error("❌ Elementos para scroll infinito no encontrados");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        !appState.loading &&
        appState.hasMoreData
      ) {
        console.log("👀 Sentinel visible, cargando más gatos...");
        loadCats();
      }
    },
    {
      root: galleryWrapper, // Contenedor con scroll
      rootMargin: "200px", // Cargar antes de llegar al final
      threshold: 0.1,
    },
  );

  observer.observe(sentinel);
  console.log("✅ Scroll infinito configurado");
}

// =============================================
// FILTRO POR RAZAS
// =============================================

/**
 * Maneja el cambio de filtro de raza
 */
function handleBreedChange() {
  const newBreed = breedSelect.value;

  console.log(`🔍 Filtro cambiado a: ${newBreed || "Todas las razas"}`);

  appState.currentBreed = newBreed;
  resetAndReload();
}

if (breedSelect) {
  breedSelect.addEventListener("change", handleBreedChange);
}

// =============================================
// UI HELPERS
// =============================================

/**
 * Muestra el loader
 */
function showLoader() {
  loader?.classList.remove("hidden");
}

/**
 * Oculta el loader
 */
function hideLoader() {
  loader?.classList.add("hidden");
}

/**
 * Muestra mensaje de error
 * @param {string} message - Mensaje de error a mostrar
 */
function showError(message) {
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
  }
}

/**
 * Oculta el mensaje de error
 */
function hideError() {
  errorDiv?.classList.add("hidden");
}

/**
 * Muestra mensaje cuando no hay más datos
 */
function showNoMoreDataMessage() {
  const message = document.createElement("p");
  message.className = "gallery-empty";
  message.textContent = "🐱 ¡Has visto todos los gatos disponibles!";
  gallery?.appendChild(message);
}

// =============================================
// INICIALIZACIÓN DE LA APLICACIÓN
// =============================================

/**
 * Inicializa la aplicación
 */
async function initApp() {
  console.log("🚀 Inicializando Cat Gallery...");

  try {
    // 1. Cargar y renderizar razas
    console.log("📋 Cargando razas...");
    const breeds = await fetchBreeds();
    renderBreedOptions(breeds);
    console.log(`✅ ${breeds.length} razas cargadas`);
  } catch (error) {
    console.error("❌ Error cargando razas:", error);
    showError("No se pudieron cargar las razas. Continuando sin filtros...");
  }

  // 2. Configurar scroll infinito
  setupInfiniteScroll();

  // 3. Cargar primera página de gatos
  appState.currentPage = 0;
  await loadCats();

  // 4. Renderizar favoritos iniciales
  renderFavorites();

  console.log("✅ Aplicación inicializada correctamente");
}

// =============================================
// PUNTO DE ENTRADA
// =============================================

// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  // DOM ya está listo
  initApp();
}

// =============================================
// MANEJO DE ERRORES GLOBAL
// =============================================

// Capturar errores no manejados
window.addEventListener("error", (event) => {
  console.error("❌ Error no manejado:", event.error);
});

// Capturar promesas rechazadas no manejadas
window.addEventListener("unhandledrejection", (event) => {
  console.error("❌ Promise rechazada no manejada:", event.reason);
});

console.log("✅ Main module cargado");
