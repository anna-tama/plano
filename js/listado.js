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
            nombreElement.addEventListener('click', function() {
                verRegistroCompleto(registro);
            });

            // Evento para botón editar
            const btnEditar = registroItem.querySelector('.btn-editar');
            btnEditar.addEventListener('click', function(e) {
                e.stopPropagation();
                editarRegistro(registroId, registro);
            });

            // Evento para botón eliminar
            const btnEliminar = registroItem.querySelector('.btn-eliminar');
            btnEliminar.addEventListener('click', function(e) {
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
        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            db.collection('registros').doc(id).delete()
                .then(() => {
                    alert('Registro eliminado correctamente');
                    // Recargar los registros
                    cargarRegistros();
                })
                .catch(error => {
                    console.error('Error al eliminar registro: ', error);
                    alert('Error al eliminar el registro');
                });
        }
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
});