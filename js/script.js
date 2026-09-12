// Seleccionar el formulario y los inputs
const inputTarea = document.getElementById('tarea');
const inputFecha = document.getElementById('date');
const btnAgregar = document.querySelector('.BotonAgregarTarea');
const marcadorTotal = document.querySelector('.ContenedorTotalTareas .CantidadTareas');
const marcadorPendientes = document.querySelector('.ContenedorTareasPendientes .CantidadTareas');
const marcadorCompletadas = document.querySelector('.ContenedorTareasCompletadas .CantidadTareas');
const inputBusqueda = document.getElementById('buscar-tareas');
const botonesFiltro = document.querySelectorAll('.BotonFiltroTareas');
const formularioTarea = document.querySelector('.ContenedorDefinirTarea');
const tituloFormulario = document.querySelector('.ContenedorAgregarTarea h2');
const textoBotonTarea = document.querySelector('.TextoBotonTarea');
const btnCancelarEdicion = document.querySelector('.BotonCancelarEdicion');

// Seleccionar el contenedor donde se pintaran las tareas
const contenedorTareas = document.querySelector('.ContenedorTareas');

// Arreglo principal que almacenara objetos
let tareas = [];
let filtroActual = 'todos';
let idTareaEnEdicion = null;

// El mismo formulario permite agregar tareas o guardar una edición
btnAgregar.addEventListener('click', guardarTarea);
formularioTarea.addEventListener('submit', evento => {
    evento.preventDefault();
    guardarTarea();
});
btnCancelarEdicion.addEventListener('click', finalizarEdicion);

function guardarTarea() {
    const titulo = inputTarea.value.trim();
    const fecha = inputFecha.value;

    if (titulo !== ''){
        if (idTareaEnEdicion !== null) {
            const tarea = tareas.find(tarea => tarea.id === idTareaEnEdicion);
            if (!tarea) return;

            tarea.titulo = titulo;
            tarea.fecha = fecha;
        } else {
            //1. Crear el objeto de la nueva tarea
            const nuevaTarea = {
                id: Date.now(), // Genera un ID unico rapido
                titulo: titulo,
                fecha: fecha,
                completada: false
            };

            //2. Agregarlo al arreglo
            tareas.push(nuevaTarea);
        }

        //3. Limpiar los inputs
        finalizarEdicion();

        //4. Actualizar la vista
        renderizarTareas();
    } else {
        inputTarea.focus();
    }
}

function editarTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (!tarea) return;

    idTareaEnEdicion = id;
    inputTarea.value = tarea.titulo;
    inputFecha.value = tarea.fecha;
    tituloFormulario.textContent = 'Editar tarea';
    textoBotonTarea.textContent = 'Guardar cambios';
    btnCancelarEdicion.hidden = false;
    inputTarea.focus();
}

function finalizarEdicion() {
    idTareaEnEdicion = null;
    inputTarea.value = '';
    inputFecha.value = '';
    tituloFormulario.textContent = 'Nueva Tarea';
    textoBotonTarea.textContent = 'Agregar tarea';
    btnCancelarEdicion.hidden = true;
}

// Cambiar el filtro y destacar el botón seleccionado
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        filtroActual = boton.dataset.filtro;

        botonesFiltro.forEach(botonFiltro => {
            const seleccionado = botonFiltro.dataset.filtro === filtroActual;
            botonFiltro.classList.toggle('BotonSeleccionado', seleccionado);
            botonFiltro.setAttribute('aria-pressed', String(seleccionado));
        });

        renderizarTareas();
    });
});

// Actualizar la lista mientras se escribe o se limpia la búsqueda
inputBusqueda.addEventListener('input', renderizarTareas);

// Función para renderizar las tareas en el contenedor
function renderizarTareas(){
    //1. Vaciamos el HTML del contenedor para no duplicar la lista al volver a pintar
    contenedorTareas.innerHTML = '';

    //2. Combinar el estado seleccionado y la búsqueda por título
    const busqueda = inputBusqueda.value.trim().toLowerCase();
    const tareasVisibles = tareas.filter(tarea => {
        const coincideEstado =
            filtroActual === 'todos' ||
            (filtroActual === 'pendientes' && !tarea.completada) ||
            (filtroActual === 'completadas' && tarea.completada);
        const coincideBusqueda = tarea.titulo.toLowerCase().includes(busqueda);

        return coincideEstado && coincideBusqueda;
    });

    // Dibujar solo las coincidencias, conservando el arreglo completo
    // Usar la fecha local evita desplazamientos de día por la zona horaria UTC
    const ahora = new Date();
    const hoy = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;
    tareasVisibles.forEach(tarea => {
        //Si la tarea esta completada, guardamos la palabra 'checked', si no, lo dejamos vacio
        const estadoChecked = tarea.completada ? 'checked' : '';
        const venceHoy = tarea.fecha === hoy;

        // 3. Creamos la estructura HTML usando las "comillas invertidas" (Template Literals)
        // Esto nos permite inyectar variables de JavaScript dentro del texto usando ${variable}
        const htmlTarea = `
            <li class="Tarea">
                <div class="TareaCheckboxDescripcion">
                    <!-- Usamos el ID único de la tarea para enlazar el input con el label -->
                    <input type="checkbox" id="tarea-${tarea.id}" ${estadoChecked} onchange="cambiarEstadoTarea(${tarea.id})">
                    <label for="tarea-${tarea.id}">${tarea.titulo}</label>
                </div>
                <div class="TareaFechaLimite">
                    <!-- Si no hay fecha, mostramos un texto por defecto -->
                    <p class="FechaLimite${venceHoy ? ' FechaHoy' : ''}">${venceHoy ? 'HOY' : tarea.fecha || 'Sin fecha límite'}</p>
                </div>
                <div class="TareaAcciones">
                    <button type="button" class="Boton BotonIcono" aria-label="Editar tarea" onclick="editarTarea(${tarea.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                            <path d="m15 5 4 4"/>
                        </svg>
                    </button>
                    <button type="button" class="Boton BotonIcono BotonEliminar" aria-label="Eliminar tarea" onclick="eliminarTarea(${tarea.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash">
                            <path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </li>
        `;

        //4. Agregamos este bloque de HTML al final del contenedor (ul.ContenedorTareas)
        contenedorTareas.innerHTML += htmlTarea;
    });

    actualizarResumen();
}

// Funcion para eliminar tareas
function eliminarTarea(id) {
    //1. Buscamos la tarea especifica en el arreglo para leer su estado
    const tareaSeleccionada = tareas.find(tarea => tarea.id === id);

    if(!tareaSeleccionada) return;

    if(!tareaSeleccionada.completada){
        const estaSeguro = confirm(
            "Esta tarea no está completada. ¿Estás seguro de que deseas eliminarla?"
        );

        if(!estaSeguro){
            return;
        }
    }

    tareas = tareas.filter(tarea => tarea.id !== id);
    if (idTareaEnEdicion === id) finalizarEdicion();
    renderizarTareas();
}

function cambiarEstadoTarea(id){


    //1. Buscamos la tarea en el arreglo
    const tareaSeleccionada = tareas.find(tarea => tarea.id === id);

    if(tareaSeleccionada){
        //2. Invertimos su estado actual (si era false pasa a true, y viceversa)
        tareaSeleccionada.completada = !tareaSeleccionada.completada;

        //3. Volvemos a renderizar para que los cambiios visuales (como tachar el texto) se apliquen si los tienes en CSS
        renderizarTareas();
    }
}

function actualizarResumen(){
    const total = tareas.length;
    const completadas = tareas.filter(tarea => tarea.completada).length;
    const pendientes = total - completadas;

    marcadorTotal.textContent = total;
    marcadorPendientes.textContent = pendientes;
    marcadorCompletadas.textContent = completadas;
}

renderizarTareas();
