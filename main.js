//variables
const formulario = document.querySelector("#formulario");
const respuesta = document.querySelector(".respuesta");
const alertaSMS = document.querySelector("#alertaSMS");

//eventos
eventos();
function eventos() {
  formulario.addEventListener("submit", validarForm);
}

//funciones
function validarForm(e) {
  e.preventDefault();
  //llamando valores del input
  const artista = document.querySelector("#artista").value;
  const cancion = document.querySelector("#cancion").value;
  if (artista == "" && cancion == "") {
    mostrarError(
      "<strong>Error!..</strong>Llene todos los campos del formulario"
    );
    return;
  }
  API(artista, cancion);
  formulario.reset();
}

//alerta mostar error
function mostrarError(mensaje) {
  const alertaError = document.createElement("div");
  alertaError.classList.add("alert", "alert-danger", "m-1", "p-3");
  alertaError.innerHTML = mensaje;
  alertaSMS.appendChild(alertaError);
  setTimeout(() => {
    alertaError.remove();
  }, 2000);
}

//hacer una peticion
function API(artista, cancion) {
  //haciendo peticion por medio de fetch
  const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data.lyrics)
      if (data.lyrics) {
        mostrarHTML(data,artista,cancion);
      }else {
        mostrarError("Cancion no encontrada!..");
      }
    });
}

//mostrar en el HTML
function mostrarHTML(data,artista,cancion) {
  respuesta.innerHTML = /*html*/ `
    <div class="card text-white bg-dark mb-3 border border-info" style="max-width: 18rem;">
    <div class="card-header text-info">${artista.toLocaleUpperCase()} - ${cancion.toLocaleUpperCase()}</div>
    <div class="card-body">
        <p class="card-text">${data.lyrics}</p>
    </div>
    </div>
    `;
    console.log(data.lyrics)
}
