// VARIABLES

let idParrafo = 1;

// ADQUIRIENDO ELEMENTOS DEL DOM
let inputTex = document.querySelector("#textoUser");
let agregarList = document.querySelector("#agregar");
const divPadre = document.querySelector("#list-container");

// AGREGANDO LOS EVENTOS
agregarList.addEventListener('click', agregar);
divPadre.addEventListener("click", (event) => {
  if (event.target.nodeName == "INPUT") {
    contadorT();
  } else if (event.target.nodeName == "I") {
    let idEliminar = event.target.parentNode.id;
    borraTarea(idEliminar);
  }
});

inputTex.addEventListener('keypress', (ev) => {
  if (ev.keyCode === 13) {
    agregar();
  }
});

//Creacion de funciones
function agregar() {
    if (inputTex.value != "") {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        text: "Tarea agregada correctamente",
        showConfirmButton: false,
        timer: 600,
      });
    divPadre.innerHTML += `
        <div class="lista" id="${idParrafo}">
            <label>
            <input type="checkbox" >
            ${inputTex.value}
            </label>
            <i class="fa-solid fa-trash-can" id="borrar"></i>
        </div>`;
    idParrafo++;
    inputTex.value = "";
    contadorT();
  } else {
    Swal.fire({
      title: "Escribe alguna tarea primero!",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
}

function contadorT() {
  let tareasPendientes = divPadre.querySelectorAll("div");
  let tareasCompletadas = divPadre.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  let divStat = document.querySelector("#estadisticas");
  divStat.innerHTML = ` Tareas pendientes: ${tareasPendientes.length - tareasCompletadas.length} <br>       Tareas completadas: ${tareasCompletadas.length}`;
}

function borraTarea(id) {
    Swal.fire({
      title: "Seguro?",
      text: "Estas a punto de borrar esta tarea!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "Tarea borrada correctamente.", "success");
        document.getElementById(id).remove();
        contadorT();
      }
    });
}

