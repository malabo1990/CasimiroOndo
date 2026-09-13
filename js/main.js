document.getElementById("anio").textContent = new Date().getFullYear();

const botonContraste = document.getElementById("botonContraste");
const raiz = document.documentElement;
const CLAVE = "contraste-preferido";

function aplicarContraste(activo) {
  if (activo) {
    raiz.setAttribute("data-contraste", "alto");
  } else {
    raiz.removeAttribute("data-contraste");
  }
  botonContraste.setAttribute("aria-pressed", String(activo));
}

let preferido = false;
try {
  preferido = localStorage.getItem(CLAVE) === "1";
} catch (e) {
  preferido = false;
}
aplicarContraste(preferido);

botonContraste.addEventListener("click", () => {
  const activo = botonContraste.getAttribute("aria-pressed") !== "true";
  aplicarContraste(activo);
  try {
    localStorage.setItem(CLAVE, activo ? "1" : "0");
  } catch (e) {
    /* almacenamiento no disponible, no pasa nada */
  }
});

/* Cabecera compacta al hacer scroll */
const cabecera = document.querySelector(".cabecera");
const alternarCabecera = () => {
  cabecera.classList.toggle("cabecera--comprimida", window.scrollY > 40);
};
alternarCabecera();
window.addEventListener("scroll", alternarCabecera, { passive: true });

/* Animación de aparición al hacer scroll */
const secciones = document.querySelectorAll(".seccion, .tarjeta-lateral");
if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  secciones.forEach((seccion) => observador.observe(seccion));
} else {
  secciones.forEach((seccion) => seccion.classList.add("visible"));
}

/* Resalta el enlace de navegación de la sección visible */
const enlacesNav = document.querySelectorAll(".cabecera__nav a");
const mapaEnlaces = new Map();
enlacesNav.forEach((enlace) => {
  const id = enlace.getAttribute("href").replace("#", "");
  mapaEnlaces.set(id, enlace);
});

if ("IntersectionObserver" in window) {
  const observadorNav = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        const enlace = mapaEnlaces.get(entrada.target.id);
        if (!enlace) return;
        if (entrada.isIntersecting) {
          enlacesNav.forEach((a) => a.classList.remove("activo"));
          enlace.classList.add("activo");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((seccion) => observadorNav.observe(seccion));
}
