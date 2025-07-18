document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');
    const mensaje = document.getElementById('mensaje');
    const rooms = [
        { id: 'Sala A' },
        { id: 'Sala B' },
    ];

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
        radioGroup.className = 'radio-group mb-3'; // Agregamos clase de Bootstrap

        // Crear título
        const title = document.createElement('h6'); // Cambiamos a h6 para mejor integración
        title.textContent = 'Seleccione una sala:';
        title.className = 'mb-3'; // Margen inferior
        radioGroup.appendChild(title);

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


    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const dateEntry = form.dateEntry.value;
        const timeEntry = form.timeEntry.value;
        const dateDeparture = form.dateDeparture.value;
        const timeDeparture = form.timeDeparture.value;
        const room = form.room.value;


        console.log("Intentando guardar...");
        // Guardar en Firestore
        db.collection('registros').add({
            firstName: firstName,
            lastName: lastName,
            dateEntry: dateEntry,
            timeEntry: timeEntry,
            dateDeparture: dateDeparture,
            timeDeparture: timeDeparture,
            room:room,
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