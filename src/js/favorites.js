/**
 * Favorites Module - Gestión de Favoritos
 * Maneja el almacenamiento local de gatos favoritos
 */

const STORAGE_KEY = "catFavorites";

/**
 * Obtiene la lista de favoritos desde localStorage
 * @returns {Array} Array de objetos de gatos favoritos
 */
export function getFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    
    // Validar que sea un array
    if (!Array.isArray(parsed)) {
      console.warn("⚠️ Datos de favoritos inválidos, reiniciando...");
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    
    return parsed;
  } catch (error) {
    console.error("❌ Error leyendo favoritos:", error);
    return [];
  }
}

/**
 * Verifica si un gato está en favoritos
 * @param {string} catId - ID del gato a verificar
 * @returns {boolean} true si está en favoritos
 */
export function isFavorite(catId) {
  if (!catId) return false;
  return getFavorites().some((cat) => cat.id === catId);
}

/**
 * Guarda un gato en favoritos
 * @param {Object} cat - Objeto del gato a guardar
 * @returns {boolean} true si se guardó exitosamente
 */
export function saveFavorite(cat) {
  try {
    // Validar datos del gato
    if (!cat || !cat.id || !cat.url) {
      console.error("❌ Datos de gato inválidos");
      return false;
    }

    const favorites = getFavorites();

    // Evitar duplicados
    if (favorites.some((fav) => fav.id === cat.id)) {
      console.log("ℹ️ El gato ya está en favoritos");
      return false;
    }

    // Crear objeto limpio con solo los datos necesarios
    const catToSave = {
      id: cat.id,
      url: cat.url,
      breeds: cat.breeds || [],
      width: cat.width || null,
      height: cat.height || null,
      addedAt: Date.now(), // Timestamp para posible ordenamiento futuro
    };

    favorites.push(catToSave);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    
    console.log("✅ Favorito guardado:", cat.id);
    return true;
  } catch (error) {
    console.error("❌ Error guardando favorito:", error);
    return false;
  }
}

/**
 * Elimina un gato de favoritos
 * @param {string} catId - ID del gato a eliminar
 * @returns {boolean} true si se eliminó exitosamente
 */
export function removeFavorite(catId) {
  try {
    if (!catId) {
      console.error("❌ ID de gato inválido");
      return false;
    }

    const favorites = getFavorites().filter((cat) => cat.id !== catId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    
    console.log("✅ Favorito eliminado:", catId);
    return true;
  } catch (error) {
    console.error("❌ Error eliminando favorito:", error);
    return false;
  }
}

/**
 * Limpia todos los favoritos (útil para testing o reset)
 * @returns {boolean} true si se limpió exitosamente
 */
export function clearAllFavorites() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log("✅ Todos los favoritos eliminados");
    return true;
  } catch (error) {
    console.error("❌ Error limpiando favoritos:", error);
    return false;
  }
}

/**
 * Obtiene el número total de favoritos
 * @returns {number} Cantidad de favoritos
 */
export function getFavoritesCount() {
  return getFavorites().length;
}
