📘 Entrega de Proyecto JavaScript - CatGallery
Máster en Desarrollo Web Full Stack – Conquer Blocks

---

## 👤 Alumno
**Silvano Puccini**

---

## 📚 Módulo
**JavaScript – APIs REST, Persistencia y Arquitectura Modular**

---
### 🌐 Demo en Vivo

🔗 **[Ver Proyecto](https://silvanopuccini.github.io/cat-gallery/)**

---

## 🎯 Objetivo del proyecto

Este trabajo corresponde a la **Propuesta 3: CatGallery con The Cat API** del módulo de JavaScript del Máster en Desarrollo Web Full Stack.

El objetivo es consolidar los conocimientos avanzados de JavaScript mediante el desarrollo de una aplicación web completa que incluye:

* Consumo de APIs REST con `fetch`
* Manipulación avanzada del DOM
* Persistencia de datos con `localStorage`
* Manejo de estados y eventos complejos
* Paginación mediante scroll infinito (IntersectionObserver)
* Filtrado dinámico de contenido
* Arquitectura modular ES6
* Diseño responsive y accesible
* Manejo profesional de errores y estados de carga

---

## 🗂️ Estructura del proyecto

El proyecto sigue una **arquitectura modular escalable**, separando responsabilidades en módulos ES6 independientes:

```
JS-EJERCICIOS-CATGALLERY/
│
├── assets/
│   ├── favicon/
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── favicon.ico
│   └── manifest.json
│
├── dist/
│   ├── styles.css
│   └── styles.css.map
│
├── node_modules/
│
├── src/
│   ├── js/
│   │   ├── api.js
│   │   ├── favorites.js
│   │   ├── filters.js
│   │   ├── gallery.js
│   │   ├── main.js
│   │   └── modal.js
│   │
│   └── scss/
│       ├── _components.scss
│       ├── _favorites.scss
│       ├── _gallery.scss
│       ├── _layout.scss
│       ├── _loader.scss
│       └── main.scss
│
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
└── README.md
```
---

## 🧪 Funcionalidades implementadas

### ✅ **1. Galería Principal de Gatos**
- Carga inicial de 9 imágenes desde The Cat API
- Grid responsive con efecto hover
- Botón de favorito (❤️/🤍) en cada tarjeta
- Click en imagen para ver detalles en modal

### ✅ **2. Sistema de Favoritos**
- Guardado persistente en `localStorage`
- Panel lateral para visualizar favoritos
- Contador dinámico de favoritos
- Eliminación de favoritos con botón (✕)
- Sincronización automática entre galería y panel

### ✅ **3. Scroll Infinito (Paginación)**
- Implementación con `IntersectionObserver`
- Carga automática al acercarse al final de la página
- Prevención de cargas múltiples simultáneas
- Detección de fin de datos
- Mensaje "No hay más gatos disponibles"

### ✅ **4. Manejo de Errores y Estados**
- Spinner animado durante carga
- Mensajes de error claros y descriptivos
- Manejo de errores multi-nivel (API, red, datos inválidos)
- Estados visuales diferenciados (cargando/error/vacío)

### ✅ **5. Filtrado por Raza**
- Selector dropdown con todas las razas disponibles
- Opción "Todas las razas" por defecto
- Reseteo de galería al cambiar filtro
- Integración con API de razas de The Cat API

### ✅ **6. Modal de Información Detallada**
- Click en imagen abre modal con:
  - Imagen ampliada
  - Nombre de la raza
  - Origen
  - Temperamento
  - Descripción (si está disponible)
- Cierre múltiple: botón X, click en overlay, tecla `Escape`
- Prevención de scroll del body mientras está abierto

---

## 🎨 Diseño y UX

### **Características de Diseño:**
- Layout principal 70/30 (galería / favoritos)
- Panel lateral sticky con scroll independiente
- Grid responsive:
  - Desktop: 3 columnas
  - Tablet: 2 columnas
  - Mobile: 1 columna
- Esquema de colores oscuro profesional
- Transiciones y animaciones suaves
- Scrollbars personalizadas
- Efectos hover con elevación visual
- Estados de carga y error claramente diferenciados

### **Accesibilidad:**
- Texto alternativo en todas las imágenes
- Cierre de modal con teclado (Escape)
- Contraste de colores adecuado
- Feedback visual en todas las interacciones
- Mensajes descriptivos para estados vacíos

---

## 🛠 Tecnologías utilizadas

### **Frontend:**
- **HTML5** - Estructura semántica
- **CSS3 / SCSS** - Estilos modulares con preprocesador
- **JavaScript ES6+** - Módulos, async/await, arrow functions
- **The Cat API** - Fuente de datos e imágenes

### **APIs y Herramientas:**
- `fetch` - Peticiones HTTP
- `localStorage` - Persistencia de favoritos
- `IntersectionObserver` - Scroll infinito
- **SASS** - Preprocesador CSS
- **Git** - Control de versiones
- **GitHub Pages** - Despliegue

---

## 📋 Cumplimiento de requisitos

| Requisito | Estado | Implementación |
|-----------|--------|----------------|
| **Página principal con galería** | ✅ COMPLETO | Grid de 9 imágenes con botón de favorito |
| **Sistema de favoritos** | ✅ COMPLETO | localStorage + panel lateral + sincronización |
| **Paginación / Ver más** | ✅ COMPLETO | Scroll infinito con IntersectionObserver |
| **Manejo de errores** | ✅ COMPLETO | Spinner + mensajes + validaciones multi-nivel |
| **Filtrado (opcional)** | ✅ COMPLETO | Selector de razas con reseteo de galería |
| **Info extra (opcional)** | ✅ COMPLETO | Modal con 6+ campos de información |

### **Cumplimiento total: 100%** ✅

---

## ⭐ Características adicionales

El proyecto **supera los requisitos** de la consigna con:

### **1. Arquitectura Modular ES6**
- Separación clara de responsabilidades
- Módulos independientes y reutilizables
- Estado centralizado (`appState`)
- Código autodocumentado con comentarios JSDoc

### **2. Performance Optimizada**
- Lazy loading de imágenes
- Prevención de cargas simultáneas
- IntersectionObserver para detección eficiente
- Minimización de re-renders

### **3. UX Profesional**
- Layout 70/30 con scroll independiente
- Transiciones suaves en todas las interacciones
- Feedback visual inmediato
- Mensajes descriptivos para todos los estados
- Grid optimizado para favoritos (2×4)

### **4. Robustez**
- Validaciones exhaustivas en todos los niveles
- Fallbacks para casos extremos
- Manejo de imágenes rotas
- Logs descriptivos para debugging
- Prevención de errores comunes

### **5. Sincronización en Tiempo Real**
- Contador de favoritos actualizado automáticamente
- Cambio de ícono (❤️/🤍) sincronizado
- Actualización del panel sin recargar página
- Data attributes para tracking de estado

---

## 🚀 Instalación y uso local

### **1. Clonar el repositorio:**
```bash
git clone https://github.com/SilvanoPuccini/cat-gallery.git
cd cat-gallery
```

### **2. Abrir el proyecto:**
```bash
# Opción 1: Abrir directamente index.html en el navegador

# Opción 2: Usar un servidor local (recomendado)
npx serve .
# o
python -m http.server 8000
```

### **3. Acceder a la aplicación:**
```
http://localhost:8000
```

> **Nota:** No requiere instalación de dependencias npm para funcionar, solo para desarrollo con SASS.

---

## 🌐 Despliegue en GitHub Pages

El proyecto está desplegado y accesible públicamente en:

🔗 **[https://silvanopuccini.github.io/cat-gallery/](https://silvanopuccini.github.io/cat-gallery/)**

### **Pasos para desplegar:**
1. Push del código a rama `main`
2. Activar GitHub Pages en Settings → Pages
3. Seleccionar rama `main` y carpeta `/ (root)`
4. Esperar 2-3 minutos para el despliegue

---

## 📱 Responsive Design

La aplicación es completamente responsive y se adapta a:

- **Desktop (>1024px):** Grid de 3 columnas + panel lateral visible
- **Tablet (768px-1024px):** Grid de 2 columnas + panel lateral plegable
- **Mobile (<768px):** Grid de 1 columna + panel lateral de pantalla completa

---

## 🧠 Decisiones técnicas destacadas

### **¿Por qué Scroll Infinito en vez de botón "Ver más"?**
- Mejor experiencia de usuario (menos clicks)
- Navegación más fluida y natural
- Usa API moderna `IntersectionObserver`
- Previene cargas múltiples con flag de estado
- Detecta automáticamente el fin de datos

### **¿Por qué Panel Lateral para Favoritos?**
- Vista simultánea de galería y favoritos
- Layout 70/30 profesional
- No requiere cambio de página
- Sincronización visual inmediata
- Scroll independiente para mejor navegación

### **¿Por qué Modal para Información Detallada?**
- Mantiene el contexto de la galería
- Enfoca la atención en el contenido
- Múltiples formas de cerrar (UX)
- Previene scroll del body cuando está abierto
- Carga progresiva de información

---

## 📊 Estructura de datos

### **Objeto Cat (localStorage):**
```javascript
{
  id: "cat_id_123",
  url: "https://cdn2.thecatapi.com/images/...",
  breeds: [
    {
      name: "Siamese",
      origin: "Thailand",
      temperament: "Active, Playful",
      description: "...",
      life_span: "12-15",
      weight: { metric: "3-5" }
    }
  ],
  width: 1600,
  height: 1200,
  addedAt: 1706635200000
}
```

---

## ✅ Estado del proyecto

✔ **Funcional**  
✔ **Desplegado en GitHub Pages**  
✔ **Probado en múltiples navegadores**  
✔ **Responsive en todos los dispositivos**  
✔ **100% de requisitos cumplidos**  
✔ **Listo para evaluación**

---

## 📝 Licencia

Este proyecto es de carácter académico y ha sido desarrollado como parte del **Máster en Desarrollo Web Full Stack** de **Conquer Blocks**.

---

## 👨‍💻 Autor

**Silvano Puccini**  
Alumno del Máster en Desarrollo Web Full Stack  
**Academia:** Conquer Blocks  
**Año:** 2026

---

## 🙏 Agradecimientos

- **The Cat API** por proporcionar la API gratuita de gatos
- **Conquer Blocks** por la formación y guía durante el máster
  
---
