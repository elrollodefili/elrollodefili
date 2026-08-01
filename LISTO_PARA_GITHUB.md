# Tu sitio está listo — cómo publicarlo en GitHub Pages

Ya no hay que inventar nada: **todas las fotos que subiste (83 en total) ya están puestas
en el sitio real**, optimizadas para que carguen rápido. Solo falta subir la carpeta completa
a GitHub, tal como está.

## Lo que contiene la carpeta que te entrego
```
index.html          → la página
style.css            → el diseño
script.js            → hace que las cosas se muevan (galería, video, filtros)
js/                   → aquí están los "textos editables" separados del código:
   portfolio-data.js   → las ~65 fotos de "La Otra Colombia" con su título y texto
   videos-data.js       → los 8 videos de YouTube
   books-data.js         → los 7 libros
   press-data.js          → los artículos de prensa
   alliances-data.js       → las 6 instituciones aliadas
   ruta-data.js              → las fotos de "Tras la Ruta"
images/               → las 83 fotos ya optimizadas
```

**Importante: sube TODO tal cual está, respetando las carpetas `js` e `images`.**
Si subes los archivos sueltos sin las carpetas, el sitio no va a funcionar.

## Cómo subirlo (mismo procedimiento de siempre)
1. Entra a tu repositorio en GitHub (el que ya tenías, `elrollodefili` o como se llame)
2. Borra los archivos viejos `index.html` y `style.css` (Add file → Upload files reemplaza,
   pero si tenías una carpeta `images` vieja con nombres distintos, bórrala primero para
   evitar fotos duplicadas o rotas)
3. Arrastra **toda la carpeta** que te entregué — o si tu navegador no permite arrastrar
   carpetas completas, entra a cada carpeta (`js`, `images`) y sube los archivos de adentro
   uno por uno, manteniendo esos mismos nombres de carpeta
4. Commit changes
5. Espera 1-2 minutos y recarga tu página

## Lo único que falta (no bloquea la publicación)
- **Favicon** (el iconito de la pestaña del navegador): sube tu logo a
  https://realfavicongenerator.net, descarga los 4 archivos que te da, y súbelos a la
  raíz del repositorio (junto a `index.html`)
- **Fotos de las 6 alianzas** (San Mateo, Jardín Botánico del Quindío, etc.): mientras no
  las tengas, el sitio muestra una tarjeta elegante con la inicial del nombre — no se ve
  mal, pero si me pasas esas fotos las puedo poner

## Cómo agregar o cambiar contenido después (sin tocar el diseño)
Para añadir una foto nueva al portafolio, una foto de "Tras la Ruta", un video nuevo o un
libro nuevo, **no hay que tocar `index.html` ni `style.css`** — solo abres el archivo
correspondiente dentro de la carpeta `js/` y copias/pegas un bloque como los que ya están,
cambiando el nombre del archivo de imagen y el texto. Así de simple.
