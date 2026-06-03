# Hotel Cielo — tu página web 🌊

Hola. Esta carpeta **es tu página web completa**. No necesitas instalar nada ni saber programar.
Aquí te explico, paso a pasito, todo lo que puedes hacer.

> 💡 Regla general: si cambias algo y no se ve en la página, abre la web y pulsa
> **Ctrl + F5** (en Windows) o **Cmd + Shift + R** (en Mac). Eso la “refresca” a la fuerza.

---

## 1. Ver tu página en tu computadora

Haz **doble clic** en el archivo **`index.html`**. Se abrirá en tu navegador (Chrome, Edge, etc.).
Así la ves tú, sin internet. Para que la vea todo el mundo, hay que subirla (paso 3).

---

## 2. Editar los textos, el teléfono y las fotos

Casi todo lo editable está en **UN solo archivo**:

```
lib/manifest.js
```

Ábrelo con el **Bloc de notas** (clic derecho → Abrir con → Bloc de notas).
Verás bloques de texto entre comillas. **Cambia solo lo que está dentro de las comillas.**

### Cambiar el número de WhatsApp
Busca estas dos líneas y cámbialas:

```
whatsapp: "527661128423",
whatsappPretty: "+52 766 112 8423",
```

- `whatsapp` → **solo números**, sin espacios ni el signo +. Empieza con **52** (México). Ejemplo: `527661128423`.
- `whatsappPretty` → como quieres que se **vea escrito** en la página (este sí lleva espacios y +).

### Cambiar dirección, horario, nombre, etc.
Están todos en el bloque `brand: { ... }`. Cambia el texto entre comillas y guarda.

### Cambiar las habitaciones
En el bloque `rooms: [ ... ]`. Cada habitación es un bloque entre llaves `{ ... }`.
Puedes cambiar nombre, capacidad, camas y descripción. Para **añadir** otra habitación,
copia un bloque completo (desde `{` hasta `},`) y pégalo debajo.

### Cambiar los servicios
En el bloque `services: [ ... ]`. Igual que las habitaciones.

> ⚠️ **Cuidado al editar:** no borres las comillas `" "` ni las comas `,` del final de cada línea.
> Son las que mantienen todo en su sitio. Si algo se rompe, deshaz el cambio (Ctrl + Z) y guarda.

---

## 3. Cambiar las fotos

Todas las fotos están en la carpeta:

```
assets/img/
```

La forma **más fácil y segura** de cambiar una foto:

1. Entra a `assets/img/`.
2. Fíjate en el nombre de la foto que quieres reemplazar (por ejemplo `hero.jpg`, `room-sencilla.jpg`).
3. Borra la vieja y pon **tu** foto **con el mismo nombre exacto** (incluyendo `.jpg`).

¡Listo! La página usará tu foto automáticamente.

Fotos principales y para qué sirven:
- `hero.jpg` → la foto grande de portada (lo primero que se ve).
- `hotel-1.jpg`, `hotel-2.jpg`, `hotel-3.jpg` → el collage de “El hotel”.
- `room-sencilla.jpg`, `room-doble.jpg` → las habitaciones.
- `location.jpg` → la foto de “¿Dónde estamos?”.
- `g1.jpg` … `g16.jpg` → la galería que se mueve.

> 📸 Consejo: usa fotos horizontales y de buena calidad (mínimo 1200 px de ancho).
> Si tu celular las guarda como `.HEIC`, conviértelas a `.JPG` antes (cualquier app gratis lo hace).

### El logo
Tu logo aparece en el menú, en la pantalla de carga, en el pie de página y en la pestaña del navegador.
- El logo recortado (con fondo transparente) está en `assets/img/logo.png` y `assets/img/favicon.png`.
- El original que mandaste se guarda en `assets/photos/source/logo.jpg`.
- Si algún día cambias de logo, lo más fácil es pasármelo y yo lo recorto y lo coloco. Si quieres
  hacerlo tú, reemplaza `assets/img/logo.png` por tu nuevo logo **en PNG con fondo transparente**
  (mismo nombre), para que se vea bien sobre la foto del mar.

---

## 4. Subir tu página a Hostinger

1. Entra a tu panel de **Hostinger** → **Administrador de archivos** (File Manager).
2. Abre la carpeta **`public_html`**.
3. **Arrastra TODO el contenido de esta carpeta** (todos los archivos y carpetas:
   `index.html`, `styles.css`, `main.js`, `.htaccess`, las carpetas `lib/` y `assets/`) dentro de `public_html`.
4. Espera a que termine de subir. ¡Tu página ya está en línea! 🎉

> El archivo **`.htaccess`** es importante: hace que tus cambios se vean rápido cuando actualizas.
> Si no lo ves en tu computadora, está oculto; en Hostinger actívalo con “Mostrar archivos ocultos”.

---

## 5. “Cambié algo y no se ve” — solución rápida

1. Abre tu página y pulsa **Ctrl + F5** (Windows) o **Cmd + Shift + R** (Mac).
2. ¿Sigue igual? Abre el archivo `index.html` con el Bloc de notas y busca, **al final**, líneas como:
   ```
   <script defer src="main.js?v=20260602"></script>
   ```
   Cambia el número `20260602` por la **fecha de hoy** (formato AÑOMESDÍA, ej: `20260815`)
   en **todas** las líneas que tengan `?v=`. Guarda y vuelve a subir el `index.html`.
   Eso obliga al navegador a cargar la versión nueva.

---

## 6. ¿Qué es cada archivo? (por curiosidad)

| Archivo / carpeta | Qué es |
|---|---|
| `index.html` | La página en sí. |
| `styles.css` | Los colores, tipografías y diseño. |
| `main.js` | Las animaciones y el envío por WhatsApp. |
| `lib/manifest.js` | **Tus datos editables** (lo que tocas tú). |
| `lib/` (lo demás) | Librerías de animación. No las toques. |
| `assets/img/` | Tus fotos. |
| `assets/credits.json` | Créditos de las fotos de ejemplo. |
| `.htaccess` | Ajuste técnico para que se actualice rápido. |
| `tools/` | Vacío / técnico. Puedes ignorarla. |

---

¿Dudas? Cualquier cosa que toques, si guardas una copia de la carpeta antes, siempre puedes volver atrás.
Disfruta tu nueva página. 🌅
