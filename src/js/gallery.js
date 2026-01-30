/**
 * Gallery Module - Renderizado de Galerías
 * Maneja el renderizado de la galería principal y panel de favoritos
 */

import {
  saveFavorite,
  getFavorites,
  removeFavorite,
  isFavorite,
  getFavoritesCount,
} from "./favorites.js";
import { openModal } from "./modal.js";

/**
 * Renderiza la galería principal de gatos
 * @param {Array} cats - Array de objetos de gatos
 * @param {HTMLElement} container - Contenedor donde renderizar
 */
export function renderGallery(cats, container) {
  if (!container) {
    console.error("❌ Contenedor de galería no encontrado");
    return;
  }

  if (!Array.isArray(cats) || cats.length === 0) {
    console.warn("⚠️ No hay gatos para renderizar");
    return;
  }

  cats.forEach((cat) => {
    if (!cat || !cat.id || !cat.url) {
      console.warn("⚠️ Gato con datos inválidos:", cat);
      return;
    }

    const card = createCatCard(cat, "gallery");
    container.appendChild(card);
  });

  console.log(`✅ ${cats.length} gatos renderizados en galería`);
}

/**
 * Renderiza el panel de favoritos
 */
export function renderFavorites() {
  const container = document.getElementById("favorites");
  if (!container) {
    console.error("❌ Contenedor de favoritos no encontrado");
    return;
  }

  // Buscar o crear el contenedor de galería
  let gallery = container.querySelector(".favorites-gallery");
  if (!gallery) {
    gallery = document.createElement("div");
    gallery.className = "favorites-gallery";
    container.appendChild(gallery);
  }

  // Limpiar contenido previo
  gallery.innerHTML = "";

  const favorites = getFavorites();

  // Actualizar contador en el botón
  updateFavoritesCounter();

  // Mostrar mensaje si no hay favoritos
  if (favorites.length === 0) {
    gallery.innerHTML =
      '<p class="favorites-empty">No hay favoritos aún. ¡Agrega tus gatos favoritos! 🐱</p>';
    return;
  }

  // Renderizar cada favorito
  favorites.forEach((cat) => {
    const card = createCatCard(cat, "favorites");
    gallery.appendChild(card);
  });

  console.log(`✅ ${favorites.length} favoritos renderizados`);
}

/**
 * Crea una tarjeta de gato (reutilizable para galería y favoritos)
 * @param {Object} cat - Objeto del gato
 * @param {string} context - Contexto: "gallery" o "favorites"
 * @returns {HTMLElement} Elemento div con la tarjeta
 */
function createCatCard(cat, context = "gallery") {
  const card = document.createElement("div");
  card.className = "cat-card";
  card.dataset.catId = cat.id; // Para sincronización

  // 🖼️ IMAGEN
  const img = document.createElement("img");
  img.alt = context === "favorites" ? "Gato favorito" : "Imagen de gato";
  img.loading = "lazy";

  // Evento de carga exitosa
  img.addEventListener("load", () => {
    img.classList.add("loaded");
  });

  // Manejo de errores de carga
  img.addEventListener("error", () => {
    console.error(`❌ Error cargando imagen: ${cat.url}`);
    img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23333' width='300' height='300'/%3E%3Ctext fill='%23666' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
  });

  // Asignar src
  img.src = cat.url;

  // Click para abrir modal
  img.addEventListener("click", () => {
    openModal(cat);
  });

  // ❤️ BOTÓN FAVORITO
  const btn = createFavoriteButton(cat, context);

  card.appendChild(img);
  card.appendChild(btn);

  return card;
}

/**
 * Crea el botón de favorito
 * @param {Object} cat - Objeto del gato
 * @param {string} context - Contexto: "gallery" o "favorites"
 * @returns {HTMLElement} Botón de favorito
 */
function createFavoriteButton(cat, context) {
  const btn = document.createElement("button");
  btn.className = "btn favorite";
  
  const isFav = isFavorite(cat.id);

  if (context === "favorites") {
    // En el panel de favoritos, siempre mostrar X para eliminar
    btn.textContent = "✕";
    btn.classList.add("active");
  } else {
    // En la galería, mostrar corazón lleno o vacío
    btn.textContent = isFav ? "❤️" : "🤍";
    if (isFav) btn.classList.add("active");
  }

  // Evento click
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // Evitar que abra el modal

    if (context === "favorites") {
      // Eliminar de favoritos
      handleRemoveFromFavorites(cat.id);
    } else {
      // Toggle favorito
      handleToggleFavorite(cat, btn);
    }
  });

  return btn;
}

/**
 * Maneja el toggle de favorito en la galería
 * @param {Object} cat - Objeto del gato
 * @param {HTMLElement} btn - Botón que disparó el evento
 */
function handleToggleFavorite(cat, btn) {
  if (isFavorite(cat.id)) {
    // Quitar de favoritos
    removeFavorite(cat.id);
    btn.textContent = "🤍";
    btn.classList.remove("active");
    console.log("💔 Gato eliminado de favoritos");
  } else {
    // Agregar a favoritos
    saveFavorite(cat);
    btn.textContent = "❤️";
    btn.classList.add("active");
    console.log("💖 Gato agregado a favoritos");
  }

  // Actualizar panel de favoritos
  renderFavorites();
}

/**
 * Maneja la eliminación de un favorito
 * @param {string} catId - ID del gato a eliminar
 */
function handleRemoveFromFavorites(catId) {
  removeFavorite(catId);
  renderFavorites();

  // Sincronizar estado en galería principal
  syncGalleryFavoriteState(catId, false);

  console.log("🗑️ Favorito eliminado");
}

/**
 * Sincroniza el estado de favorito en la galería principal
 * @param {string} catId - ID del gato
 * @param {boolean} isFavorite - Estado de favorito
 */
function syncGalleryFavoriteState(catId, isFavorite) {
  const galleryCards = document.querySelectorAll('.cat-card[data-cat-id="' + catId + '"]');
  
  galleryCards.forEach((card) => {
    const btn = card.querySelector(".btn.favorite");
    if (btn) {
      btn.textContent = isFavorite ? "❤️" : "🤍";
      if (isFavorite) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  });
}

/**
 * Actualiza el contador de favoritos en el botón
 */
function updateFavoritesCounter() {
  const countBadge = document.getElementById("favoritesCount");
  if (countBadge) {
    const count = getFavoritesCount();
    countBadge.textContent = count;
    
    // Opcional: añadir clase si hay favoritos
    if (count > 0) {
      countBadge.classList.add("has-favorites");
    } else {
      countBadge.classList.remove("has-favorites");
    }
  }
}

/**
 * Limpia la galería principal
 * @param {HTMLElement} container - Contenedor de la galería
 */
export function clearGallery(container) {
  if (container) {
    container.innerHTML = "";
    console.log("🧹 Galería limpiada");
  }
}
