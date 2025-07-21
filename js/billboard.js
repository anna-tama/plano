document.addEventListener('DOMContentLoaded', function() {
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
    
    // console.log('Nombre recibido:', firstName, lastName);
    // Aquí puedes usar estos valores como necesites
});