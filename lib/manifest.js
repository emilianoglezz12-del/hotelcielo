/* =============================================================================
   HOTEL CIELO — DATOS EDITABLES
   -----------------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas tocar para cambiar textos, teléfono,
   habitaciones, servicios y fotos. Ábrelo con el Bloc de notas.

   REGLAS DE ORO (para que nada se rompa):
   1. NO borres las comillas " " que rodean cada texto.
   2. NO borres las comas , que hay al final de cada línea.
   3. Para el WhatsApp usa SOLO números, sin espacios ni signo + (ej: 527661128423).
   4. Las fotos van en la carpeta  assets/img/  y aquí escribes su nombre.
   5. Si cambias algo y no se ve, abre la web y pulsa Ctrl + F5 (recarga fuerte).
   ============================================================================= */

(function () {
  "use strict";

  window.__CIELO__ = {

    /* ---------- MARCA ---------- */
    brand: {
      name: "Hotel Cielo",
      tagline: "Ven a descansar sin prisa.",
      kicker: "Hotel familiar · Playa",
      place: "Tecolutla · Veracruz",
      address: "Bugambilias s/n, Tecolutla, Veracruz, México",
      addressShort: "Bugambilias s/n",
      reference: "A una calle de la playa, en el corazón de Tecolutla.",
      rooms: "10 habitaciones",
      since: "EST. 2024 · VER",
      hours: "Recepción abierta todos los días",

      // WhatsApp: SOLO números, sin + ni espacios.
      whatsapp: "527661128423",
      // Cómo se ve el teléfono escrito en la web (este sí lleva formato bonito):
      whatsappPretty: "+52 766 112 8423",

      facebook: "https://www.facebook.com/profile.php?id=61574235566373",

      // Enlace de "Cómo llegar" (Google Maps). Puedes dejarlo así.
      maps: "https://www.google.com/maps/search/?api=1&query=Bugambilias+s%2Fn%2C+Tecolutla%2C+Veracruz%2C+M%C3%A9xico"
    },

    /* ---------- HABITACIONES ----------
       Puedes añadir o quitar habitaciones copiando un bloque { ... } entero.
       accent = color de acento (déjalo como está o usa otro color #xxxxxx).
    */
    rooms: [
      {
        id: "sencilla",
        name: "Habitación Sencilla",
        capacity: "1–2 personas",
        beds: "1 cama matrimonial",
        desc: "Cómoda, fresca y lista para descansar. Todo lo que necesitas para disfrutar Tecolutla.",
        photo: "assets/img/room-sencilla.jpg",
        accent: "#1A6B8A"
      },
      {
        id: "doble",
        name: "Habitación Doble",
        capacity: "2–4 personas",
        beds: "2 camas matrimoniales",
        desc: "Perfecta para familia o grupo de amigos. Más espacio, mismo descanso frente al mar.",
        photo: "assets/img/room-doble.jpg",
        accent: "#3DD6C8"
      }
    ],

    /* ---------- SERVICIOS ----------
       icon puede ser: "waves", "flame", "umbrella", "key".
    */
    services: [
      { icon: "waves",    name: "Alberca & chapoteadero",  line: "Para grandes y chicos, todo el día.", accent: "#3DD6C8" },
      { icon: "flame",    name: "Asador con pérgola",      line: "Enciende el asador, la noche es tuya.", accent: "#E8A838" },
      { icon: "umbrella", name: "Playa cercana",           line: "A una calle de la playa.",          accent: "#1A6B8A" },
      { icon: "key",      name: "Atención todos los días", line: "Siempre hay alguien para recibirte.", accent: "#E8A838" }
    ],

    /* ---------- GALERÍA ----------
       Lista de fotos que se mueven en los carriles. Añade o quita libremente.
    */
    gallery: [
      "assets/img/g1.jpg",  "assets/img/g2.jpg",  "assets/img/g3.jpg",  "assets/img/g4.jpg",
      "assets/img/g5.jpg",  "assets/img/g6.jpg",  "assets/img/g7.jpg",  "assets/img/g8.jpg",
      "assets/img/g9.jpg",  "assets/img/g10.jpg", "assets/img/g11.jpg", "assets/img/g12.jpg",
      "assets/img/g13.jpg", "assets/img/g14.jpg", "assets/img/g15.jpg", "assets/img/g16.jpg"
    ]
  };
})();
