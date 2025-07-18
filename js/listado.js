
document.addEventListener('DOMContentLoaded', function () {
    const listaRegistros = document.getElementById('listaRegistros');
    const busqueda = document.getElementById('busqueda');

    // Función para renderizar registros
    function renderRegistros(registros) {
        listaRegistros.innerHTML = '';

        if (registros.length === 0) {
            listaRegistros.innerHTML = '<p class="no-registros">No hay registros para mostrar.</p>';
            return;
        }

        registros.forEach(doc => {
            const registro = doc.data();
            const registroItem = document.createElement('div');
            registroItem.className = 'registro-item';

            registroItem.innerHTML = `
                <div class="registro-info">
                    <div class="registro-nombre">${registro.firstName} ${registro.lastName}</div>
                    <div class="registro-fecha">${formatFecha(registro.fecha)}</div>
                </div>
            `;

            listaRegistros.appendChild(registroItem);
        });
    }

    // Formatear fecha
    function formatFecha(fechaStr) {
        if (!fechaStr) return 'Sin fecha';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fechaStr).toLocaleDateString('es-ES', options);
    }

    // Cargar registros iniciales
    db.collection('registros')
        .orderBy('timestamp', 'desc')
        .get()
        .then(querySnapshot => {
            renderRegistros(querySnapshot.docs);
        })
        .catch(error => {
            console.error('Error al cargar registros: ', error);
        });

    // Busqueda en tiempo real
    busqueda.addEventListener('input', function () {
        const textoBusqueda = this.value.toLowerCase();

        db.collection('registros')
            .orderBy('firstName')
            .startAt(textoBusqueda)
            .endAt(textoBusqueda + '\uf8ff')
            .get()
            .then(querySnapshot => {
                renderRegistros(querySnapshot.docs);
            })
            .catch(error => {
                console.error('Error al buscar: ', error);
            });
    });

});