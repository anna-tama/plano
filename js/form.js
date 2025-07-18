document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const mensaje = document.getElementById('mensaje');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fecha = form.fecha.value;
        const nombre = form.nombre.value;
        const apellido = form.apellido.value;
        
        // Guardar en Firestore
        db.collection('registros').add({
            fecha: fecha,
            nombre: nombre,
            apellido: apellido,
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