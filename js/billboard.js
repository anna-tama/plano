document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = decodeURIComponent(urlParams.get('firstName') || '');
    const lastName = decodeURIComponent(urlParams.get('lastName') || '');
    const dateEntry = decodeURIComponent(urlParams.get('dateEntry') || '');
    const timeEntry = decodeURIComponent(urlParams.get('timeEntry') || '');
    const dateDeparture = decodeURIComponent(urlParams.get('dateDeparture') || '');
    const timeDeparture = decodeURIComponent(urlParams.get('timeDeparture') || '');
    const room = decodeURIComponent(urlParams.get('room') || '');
    const religion = decodeURIComponent(urlParams.get('religion') || '');
    const destinations = decodeURIComponent(urlParams.get('destinations') || '');

    function formatDate(dateString) {
        const parts = dateString.split('-');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    // Asignar valores a los elementos HTML
    document.getElementById('firstName').textContent = firstName;
    document.getElementById('lastName').textContent = lastName;
    document.getElementById('room').textContent = room;
    document.getElementById('entryDateTime').textContent = `${formatDate(dateEntry)} ${timeEntry}h`;
    document.getElementById('departureDateTime').textContent = `${formatDate(dateDeparture)} ${timeDeparture}h`;
    document.getElementById('destination').textContent = destinations;

    // Si necesitas manejar la religión para mostrar una imagen
    if (religion && religion.toLowerCase() !== 'ninguna') {
        // Mostrar el contenedor y establecer la imagen según la religión
        religionContainer.style.display = 'block';
        console.log('religion',religion)
        
        switch(religion.toLowerCase()) {
            case 'cristianismo':
                religionImage.src = 'assets/img/religion/cristianismo.svg';
                religionImage.alt = 'Símbolo Cristiano';
                break;
            case 'evangelismo':
                religionImage.src = 'assets/img/religion/evangelismo.svg';
                religionImage.alt = 'Símbolo Evangélico';
                break;
            case 'judaismo':
                religionImage.src = 'assets/img/religion/judaísmo.svg';
                religionImage.alt = 'Símbolo Judío';
                break;
            case 'umbandismo':
                religionImage.src = 'assets/img/religion/umbandismo.svg';
                religionImage.alt = 'Símbolo Umbanda';
                break;
            case 'budismo':
                religionImage.src = 'assets/img/religion/budismo.svg';
                religionImage.alt = 'Símbolo Budista';
                break;
            default:
                // Ocultar si no es una religión reconocida
                religionContainer.style.display = 'none';
        }
    } else {
        // Ocultar el contenedor si la religión es "ninguna" o no está definida
        religionContainer.style.display = 'none';
    }
});


