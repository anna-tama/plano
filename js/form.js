

// form.js
document.addEventListener('DOMContentLoaded', function () {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const registroId = urlParams.get('id');

    // Si estamos editando (hay ID en la URL)
    if (registroId) {
        cargarRegistroParaEdicion(registroId);
    } else {
        // Inicializar formulario para nuevo registro
        inicializarFormulario();
    }

    // Configurar listeners y lógica del formulario
    configurarFormulario();
});

function cargarRegistroParaEdicion(registroId) {
    inicializarFormulario();

    db.collection('registros').doc(registroId).get()
        .then(doc => {
            if (doc.exists) {
                const registro = doc.data();

                // Llenar campos básicos
                document.getElementById('firstName').value = registro.firstName || '';
                document.getElementById('lastName').value = registro.lastName || '';
                document.getElementById('dateEntry').value = registro.dateEntry || '';
                document.getElementById('timeEntry').value = registro.timeEntry || '';
                document.getElementById('dateDeparture').value = registro.dateDeparture || '';
                document.getElementById('timeDeparture').value = registro.timeDeparture || '';

                // Configurar radio buttons de religión
                if (registro.religion) {
                    const religionRadio = document.querySelector(`input[name="religion"][value="${registro.religion.toLowerCase()}"]`);
                    if (religionRadio) {
                        religionRadio.checked = true;
                    }
                }

                // Configurar radio buttons de sala
                if (registro.room) {
                    const roomRadio = document.querySelector(`input[name="room"][value="${registro.room}"]`);
                    if (roomRadio) {
                        roomRadio.checked = true;
                    }
                }

                // Configurar select de destino
                if (registro.destinations) {
                    const destinationSelect = document.getElementById('destination-select');
                    const option = Array.from(destinationSelect.options)
                        .find(opt => opt.value === registro.destinations);

                    if (option) {
                        option.selected = true;
                    } else {
                        // Si el destino no está en las opciones, agregarlo
                        const newOption = new Option(registro.destinations, registro.destinations);
                        destinationSelect.add(newOption);
                        newOption.selected = true;
                    }
                }

            } else {
                console.error("No se encontró el registro");
                alert("Registro no encontrado");
                window.location.href = 'listado.html';
            }
        })
        .catch(error => {
            console.error("Error al cargar registro:", error);
            alert("Error al cargar el registro");
        });
}

function inicializarFormulario() {
    // Configurar radios de religión
    const religions = ['cristianismo', 'judaísmo', 'islam', 'budismo', 'hinduismo', 'ninguna'];
    const religionContainer = document.getElementById('religion-radios');

    religions.forEach(religion => {
        const div = document.createElement('div');
        div.className = 'form-check form-check-inline';

        // Marcar "cristianismo" como checked por defecto
        const isChecked = religion === 'cristianismo' ? 'checked' : '';

        div.innerHTML = `
            <input class="form-check-input" type="radio" name="religion" 
                   id="religion-${religion}" value="${religion}" ${isChecked}>
            <label class="form-check-label" for="religion-${religion}">
                ${religion.charAt(0).toUpperCase() + religion.slice(1)}
            </label>
        `;

        religionContainer.appendChild(div);
    });

    // Configurar radios de sala
    const rooms = ['Sala: A', 'Sala: B'];
    const radioContainer = document.getElementById('radio-container');

    rooms.forEach(room => {
        const div = document.createElement('div');
        div.className = 'form-check form-check-inline';

        div.innerHTML = `
            <input class="form-check-input" type="radio" name="room" id="room-${room.replace(' ', '-')}" value="${room}"
                   ${room === 'Sala: A' ? 'checked' : ''}>
            <label class="form-check-label" for="room-${room.replace(' ', '-')}">${room}</label>
        `;

        radioContainer.appendChild(div);
    });

    // Configurar select de destinos
    const destinations = [
        'Crematorio: Burzaco',
        'Cementerio: Camposanto',
        'Crematorio: Cementerio Libertad',
        'Cementerio: Chacarita',
        'Cementerio: Colonial',
        'Cementerio: Flores',
        'Cementerio: Jardin de Paz Pilar',
        'Cementerio: Lar de Paz',
        'Cementerio: Las Praderas',
        'Cementerio: Libertad',
        'Crematorio: Lomas de Zamora',
        'Crematorio: Los Ceibos',
        'Cementerio: Los Ceibos',
        'Crematorio: Monte Paraiso',
        'Cementerio: Moron',
        'Crematorio: Moron',
        'Cementerio: Olivos',
        'Cementerio: Pablo Podesta',
        'Cementerio: Paraguay',
        'Cementerio: Parque Hurlingham',
        'Cementerio: Parque Iraola',
        'Cementerio: San Justo',
        'Cementerio: San Martin',
        'Crematorio: San Martin',
        'Cementerio: Villegas',
        'Otro'
    ];

    const destinationSelect = document.getElementById('destination-select');

    destinations.forEach(dest => {
        const option = document.createElement('option');
        option.value = dest;
        option.textContent = dest;
        destinationSelect.appendChild(option);
    });

    // Configurar valores por defecto solo para nuevo registro (no edición)
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.get('id')) {
        // Establecer fecha y hora actual
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        const time = now.toTimeString().substring(0, 5); // Formato HH:mm

        // Establecer valores por defecto
        document.getElementById('dateEntry').value = today;
        document.getElementById('timeEntry').value = time;
        document.getElementById('dateDeparture').value = today;
        document.getElementById('timeDeparture').value = time;

        // Sala A ya está seleccionada por defecto en el radio button
    }

    // Configurar evento para mostrar campo "Otro destino"
    destinationSelect.addEventListener('change', function () {
        const otherContainer = document.getElementById('other-destination-container');
        otherContainer.style.display = this.value === 'Otro' ? 'block' : 'none';
    });

    // Configurar botón para agregar nuevo destino
    document.getElementById('add-destination-btn').addEventListener('click', function () {
        const newDest = document.getElementById('newDestination').value.trim();
        if (newDest) {
            const select = document.getElementById('destination-select');
            const option = new Option(newDest, newDest);
            select.add(option);
            option.selected = true;
            document.getElementById('newDestination').value = '';
            document.getElementById('other-destination-container').style.display = 'none';
        }
    });
}
function configurarFormulario() {
    const form = document.getElementById('registroForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener valores del formulario
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            dateEntry: document.getElementById('dateEntry').value,
            timeEntry: document.getElementById('timeEntry').value,
            dateDeparture: document.getElementById('dateDeparture').value,
            timeDeparture: document.getElementById('timeDeparture').value,
            religion: document.querySelector('input[name="religion"]:checked')?.value || '',
            room: document.querySelector('input[name="room"]:checked')?.value || '',
            destinations: document.getElementById('destination-select').value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Obtener ID si estamos editando
        const urlParams = new URLSearchParams(window.location.search);
        const registroId = urlParams.get('id');

        // Guardar en Firestore
        if (registroId) {
            // Actualizar registro existente
            db.collection('registros').doc(registroId).update(formData)
                .then(() => {
                    mensaje.textContent = 'Registro actualizado correctamente';
                    mensaje.className = 'mensaje success';
                    form.reset();

                    setTimeout(() => {
                        window.location.href = 'listado.html';
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error al guardar: ', error);
                    mensaje.textContent = 'Error al guardar el registro: ' + error.message;
                    mensaje.className = 'mensaje error';
                });
        } else {
            // Crear nuevo registro
            db.collection('registros').add(formData)
                .then(() => {
                    mensaje.textContent = 'Registro guardado correctamente';
                    mensaje.className = 'mensaje success';
                    form.reset();

                    setTimeout(() => {
                        window.location.href = 'listado.html';
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error al guardar: ', error);
                    mensaje.textContent = 'Error al guardar el registro: ' + error.message;
                    mensaje.className = 'mensaje error';
                });
        }
    });
}