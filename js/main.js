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
