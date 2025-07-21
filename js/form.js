document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');
    const mensaje = document.getElementById('mensaje');
    const rooms = [
        { id: 'Sala A' },
        { id: 'Sala B' },
    ];

    const religions = [
        { id: 'cristianismo', label: 'Cristianismo', value: 'cristianismo' },
        { id: 'budismo', label: 'Budismo', value: 'budismo' },
        { id: 'judaismo', label: 'Judaísmo', value: 'judaismo' },
        { id: 'evangelismo', label: 'Evangelismo', value: 'evangelismo' },
        { id: 'umbandismo', label: 'Umbandismo', value: 'umbandismo' },
        { id: 'none', label: 'Ninguno', value: 'none' },
    ];

    const DESTINATIONS = [
        { label: 'Crematorio: Burzaco' },
        { label: 'Cementerio: Camposanto' },
        { label: 'Crematorio: Cementerio Libertad' },
        { label: 'Cementerio: Chacarita' },
        { label: 'Cementerio: Colonial' },
        { label: 'Cementerio: Flores' },
        { label: 'Cementerio: Jardin de Paz Pilar' },
        { label: 'Cementerio: Lar de Paz' },
        { label: 'Cementerio: Las Praderas' },
        { label: 'Cementerio: Libertad' },
        { label: 'Crematorio: Lomas de Zamora' },
        { label: 'Crematorio: Los Ceibos' },
        { label: 'Cementerio: Los Ceibos' },
        { label: 'Crematorio: Monte Paraiso' },
        { label: 'Cementerio: Moron' },
        { label: 'Crematorio: Moron' },
        { label: 'Cementerio: Olivos' },
        { label: 'Cementerio: Pablo Podesta' },
        { label: 'Cementerio: Paraguay' },
        { label: 'Cementerio: Parque Hurlingham' },
        { label: 'Cementerio: Parque Iraola' },
        { label: 'Cementerio: San Justo' },
        { label: 'Cementerio: San Martin' },
        { label: 'Crematorio: San Martin' },
        { label: 'Cementerio: Villegas' },
    ];

    // Elementos del DOM
    const selectElement = document.getElementById('destination-select');
    const otherContainer = document.getElementById('other-destination-container');
    const newDestinationInput = document.getElementById('newDestination');
    const addButton = document.getElementById('add-destination-btn');

    function createRadioButtons() {
        const container = document.getElementById('radio-container');

        // Verificar que el contenedor existe
        if (!container) {
            console.error('El elemento con ID "radio-container" no fue encontrado en el DOM');
            return;
        }

        // Limpiar el contenedor primero
        container.innerHTML = '';

        // Crear grupo de radio buttons
        const radioGroup = document.createElement('div');

        // Crear radio buttons
        rooms.forEach((room, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'form-check'; // Clase de Bootstrap para radios

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.id = `room-${index}`;
            radio.name = 'room';
            radio.value = room.id;
            radio.className = 'form-check-input'; // Clase de Bootstrap

            // Seleccionar el primero por defecto
            if (index === 0) {
                radio.checked = true;
            }

            const label = document.createElement('label');
            label.htmlFor = `room-${index}`;
            label.textContent = room.id;
            label.className = 'form-check-label'; // Clase de Bootstrap

            optionDiv.appendChild(radio);
            optionDiv.appendChild(label);
            radioGroup.appendChild(optionDiv);
        });

        container.appendChild(radioGroup);

        // Manejar cambios en la selección
        container.addEventListener('change', function (e) {
            if (e.target.name === 'room-selection' && e.target.checked) {
                console.log('Sala seleccionada:', e.target.value);
                // Aquí puedes agregar lógica adicional
            }
        });
    }
    createRadioButtons();

    function renderReligionRadios() {
        const container = document.getElementById('religion-radios');

        if (!container) {
            console.error('No se encontró el contenedor para los radios de religión');
            return;
        }

        container.innerHTML = ''; // Limpiar contenedor

        religions.forEach(religion => {
            const radioDiv = document.createElement('div');
            radioDiv.className = 'form-check form-check-inline';

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.id = religion.id;
            radioInput.name = 'religion';
            radioInput.value = religion.value;
            radioInput.className = 'form-check-input';

            // Seleccionar "cristianismo" por defecto
            if (religion.value === 'cristianismo') {
                radioInput.checked = true;
            }

            const label = document.createElement('label');
            label.htmlFor = religion.id;
            label.className = 'form-check-label';
            label.textContent = religion.label;

            radioDiv.appendChild(radioInput);
            radioDiv.appendChild(label);
            container.appendChild(radioDiv);
        });

        // Manejar cambios en la selección
        container.addEventListener('change', function (e) {
            if (e.target.name === 'religion') {
                console.log('Religión seleccionada:', e.target.value);
                // Aquí puedes agregar lógica adicional cuando cambia la selección
            }
        });
    }

    // Llamar a la función para renderizar los radios
    renderReligionRadios();


    // Llenar el select con las opciones
    function populateSelect() {
        // Limpiar select
        selectElement.innerHTML = '';

        // Agregar opciones predeterminadas
        DESTINATIONS.forEach(dest => {
            const option = document.createElement('option');
            option.value = dest.label;
            option.textContent = dest.label;
            selectElement.appendChild(option);
        });

        // Agregar opción "Otro..."
        const otherOption = document.createElement('option');
        otherOption.value = 'otro';
        otherOption.textContent = 'Otro...';
        selectElement.appendChild(otherOption);
    }

    // Manejar cambio de selección
    function handleDestinationChange() {
        if (selectElement.value === 'otro') {
            otherContainer.style.display = 'block';
            newDestinationInput.focus();
        } else {
            otherContainer.style.display = 'none';
            newDestinationInput.value = '';
        }
    }

    // Agregar nuevo destino
    function addNewDestination() {
        const newDest = newDestinationInput.value.trim();

        if (newDest) {
            // Agregar al array de destinos
            DESTINATIONS.push({ label: newDest });

            // Actualizar el select
            populateSelect();

            // Seleccionar el nuevo destino
            selectElement.value = newDest;

            // Ocultar el campo de nuevo destino
            otherContainer.style.display = 'none';
            newDestinationInput.value = '';
        } else {
            alert('Por favor ingrese un destino válido');
        }
    }

    // Event listeners
    selectElement.addEventListener('change', handleDestinationChange);
    addButton.addEventListener('click', addNewDestination);

    // Inicializar
    populateSelect();


    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const dateEntry = form.dateEntry.value;
        const timeEntry = form.timeEntry.value;
        const dateDeparture = form.dateDeparture.value;
        const timeDeparture = form.timeDeparture.value;
        const room = form.room.value;
        const religion = form.religion.value;
        const destinations = form.destinations.value;

        console.log("Intentando guardar...");
        // Guardar en Firestore
        db.collection('registros').add({
            firstName: firstName,
            lastName: lastName,
            dateEntry: dateEntry,
            timeEntry: timeEntry,
            dateDeparture: dateDeparture,
            timeDeparture: timeDeparture,
            room: room,
            religion: religion,
            destinations: destinations,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then(() => {
                // Mostrar mensaje de éxito
                mensaje.textContent = 'Registro guardado correctamente!';
                mensaje.className = 'mensaje success';

                // Limpiar el formulario
                form.reset();

                // Ocultar mensaje después de 3 segundos
                setTimeout(() => {
                    mensaje.className = 'mensaje';
                    mensaje.textContent = '';
                }, 3000);
            })
            .catch(error => {
                console.error('Error al guardar: ', error);
                mensaje.textContent = 'Error al guardar el registro: ' + error.message;
                mensaje.className = 'mensaje error';
            });
    });
});