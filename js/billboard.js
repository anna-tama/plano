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
    if (religion && religion !== 'none') {
        // Aquí puedes agregar lógica para mostrar la imagen de la religión
        console.log('Religión:', religion);

        if (religion && religion.toLowerCase() === 'cristianismo') {
            religionContainer.style.display = 'block';
            religionImage.src = 'assets/img/religion/cristianismo.svg';
            religionImage.alt = 'Símbolo Cristiano';
        } else if (religion && religion.toLowerCase() === 'evangelismo') {
            religionContainer.style.display = 'block';
            religionImage.src = 'assets/img/religion/evangelismo.svg';
            religionImage.alt = 'Símbolo Evangélico';
        } else if (religion && religion.toLowerCase() === 'judaismo') {
            religionContainer.style.display = 'block';
            religionImage.src = 'assets/img/religion/judaísmo.svg';
            religionImage.alt = 'Símbolo Juído';
        } else if (religion && religion.toLowerCase() === 'umbandismo') {
            religionContainer.style.display = 'block';
            religionImage.src = 'assets/img/religion/umbandismo.svg';
            religionImage.alt = 'Símbolo Umbanda';
        } else if (religion && religion.toLowerCase() === 'budismo') {
            religionContainer.style.display = 'block';
            religionImage.src = 'assets/img/religion/budismo.svg';
            religionImage.alt = 'Símbolo Budista';
        }
    }
});


