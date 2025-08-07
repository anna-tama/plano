document.addEventListener('DOMContentLoaded', function () {
    const listaRegistros = document.getElementById('listaRegistros');

    // Función para renderizar registros
    function renderRegistros(registros) {
        listaRegistros.innerHTML = '';

        if (registros.length === 0) {
            listaRegistros.innerHTML = '<p class="no-registros">No hay registros para mostrar.</p>';
            return;
        }

        registros.forEach(doc => {
            const registro = doc.data();
            const registroId = doc.id; // ID del documento en Firestore
            const registroItem = document.createElement('div');
            registroItem.className = 'registro-item';

            registroItem.innerHTML = `
                <div class="registro-info">
                    <div class="registro-nombre">${registro.firstName} ${registro.lastName}</div>
                    <div class="registro-fecha">Ingreso: ${formatFecha(registro.dateEntry)} ${registro.timeEntry}h</div>
                    <div class="registro-acciones">
                        <button class="btn-editar">Editar</button>
                        <button class="btn-eliminar">Eliminar</button>
                    </div>
                </div>
            `;

            // Evento click para ver el registro completo
            const nombreElement = registroItem.querySelector('.registro-nombre');
            nombreElement.style.cursor = 'pointer';
            nombreElement.addEventListener('click', function () {
                verRegistroCompleto(registro);
            });

            // Evento para botón editar
            const btnEditar = registroItem.querySelector('.btn-editar');
            btnEditar.addEventListener('click', function (e) {
                e.stopPropagation();
                editarRegistro(registroId, registro);
            });

            // Evento para botón eliminar
            const btnEliminar = registroItem.querySelector('.btn-eliminar');
            btnEliminar.addEventListener('click', function (e) {
                e.stopPropagation();
                eliminarRegistro(registroId);
            });

            listaRegistros.appendChild(registroItem);
        });
    }

    // Función para ver registro completo (similar a tu código original)
    function verRegistroCompleto(registro) {
        const params = new URLSearchParams();
        params.append('firstName', encodeURIComponent(registro.firstName));
        params.append('lastName', encodeURIComponent(registro.lastName));
        params.append('dateEntry', encodeURIComponent(registro.dateEntry));
        params.append('timeEntry', encodeURIComponent(registro.timeEntry));
        params.append('dateDeparture', encodeURIComponent(registro.dateDeparture));
        params.append('timeDeparture', encodeURIComponent(registro.timeDeparture));
        params.append('room', encodeURIComponent(registro.room));
        params.append('religion', encodeURIComponent(registro.religion));
        params.append('destinations', encodeURIComponent(registro.destinations));

        window.location.href = `billboard.html?${params.toString()}`;
    }

    // Función para editar registro
    function editarRegistro(id, registro) {
        const params = new URLSearchParams();
        params.append('id', id);
        params.append('firstName', encodeURIComponent(registro.firstName));
        params.append('lastName', encodeURIComponent(registro.lastName));
        params.append('dateEntry', encodeURIComponent(registro.dateEntry));
        params.append('timeEntry', encodeURIComponent(registro.timeEntry));
        params.append('dateDeparture', encodeURIComponent(registro.dateDeparture));
        params.append('timeDeparture', encodeURIComponent(registro.timeDeparture));
        params.append('room', encodeURIComponent(registro.room));
        params.append('religion', encodeURIComponent(registro.religion));
        params.append('destinations', encodeURIComponent(registro.destinations));

        window.location.href = `editar.html?${params.toString()}`;
    }

    // Función para eliminar registro
    function eliminarRegistro(id) {
        db.collection('registros').doc(id).delete()
            .then(() => {
                mensaje.textContent = 'Registro eliminado correctamente';
                mensaje.className = 'mensaje success';
                // Recargar los registros
                cargarRegistros();
                setTimeout(() => {
                    mensaje.textContent = '';
                    mensaje.className = '';
                }, 3000)
            })
            .catch(error => {
                console.error('Error al eliminar registro: ', error);
                mensaje.textContent = 'Error al eliminar el registro: ' + error.message;
                mensaje.className = 'mensaje error';
                setTimeout(() => {
                    mensaje.textContent = '';
                    mensaje.className = '';
                }, 3000)
            });

    }

    // Función para cargar registros
    function cargarRegistros() {
        db.collection('registros')
            .orderBy('timestamp', 'desc')
            .get()
            .then(querySnapshot => {
                renderRegistros(querySnapshot.docs);
            })
            .catch(error => {
                console.error('Error al cargar registros: ', error);
            });
    }

    // Formatear fecha
    function formatFecha(fechaStr) {
        if (!fechaStr) return 'Sin fecha';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fechaStr).toLocaleDateString('es-ES', options);
    }

    // Cargar registros iniciales
    cargarRegistros();

    const btn = document.getElementById('dividirBtn');
    const salasContainer = document.getElementById('salasContainer');

    // Datos para los desplegables (puedes modificarlos según necesites)
    const datosSala = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5'];

    btn.addEventListener('click', function () {
        // Limpiar el contenedor si ya hay contenido
        salasContainer.innerHTML = '';

        // Crear elementos para Sala A
        const containerA = document.createElement('div');
        containerA.className = 'sala-container';

        const labelA = document.createElement('label');
        labelA.textContent = 'Sala A';

        const selectA = document.createElement('select');
        datosSala.forEach(function (opcion) {
            const option = document.createElement('option');
            option.value = opcion;
            option.textContent = opcion;
            selectA.appendChild(option);
        });

        containerA.appendChild(labelA);
        containerA.appendChild(selectA);
        salasContainer.appendChild(containerA);

        // Crear elementos para Sala B
        const containerB = document.createElement('div');
        containerB.className = 'sala-container';

        const labelB = document.createElement('label');
        labelB.textContent = 'Sala B';

        const selectB = document.createElement('select');
        datosSala.forEach(function (opcion) {
            const option = document.createElement('option');
            option.value = opcion;
            option.textContent = opcion;
            selectB.appendChild(option);
        });

        containerB.appendChild(labelB);
        containerB.appendChild(selectB);
        salasContainer.appendChild(containerB);
    });

});