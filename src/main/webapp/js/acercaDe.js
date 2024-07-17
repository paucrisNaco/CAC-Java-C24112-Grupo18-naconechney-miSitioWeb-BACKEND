// Script que maneja el acercaDe.json
fetch("data/acercaDe.json")
  .then(response => response.json())
  .then(data => {
    document.querySelector('.guiaDeUso h2').innerText = data.guiaDeUso.titulo;
    document.querySelector('.guiaDeUso h3').innerText = data.guiaDeUso.descripcion;

    const secciones = data.guiaDeUso.secciones;
    secciones.forEach((seccion, index) => {
      const guiaElement = document.createElement('div');
      guiaElement.classList.add('guia');
      guiaElement.setAttribute('data-aos', 'fade-down');
      guiaElement.setAttribute('data-aos-duration', '1000');
      guiaElement.setAttribute('data-aos-delay', '100');

      const tituloElement = document.createElement('h4');
      tituloElement.innerText = seccion.titulo;
      guiaElement.appendChild(tituloElement);

      if (seccion.subtitulo) {
        const subtituloElement = document.createElement('h5');
        subtituloElement.innerText = seccion.subtitulo;
        guiaElement.appendChild(subtituloElement);
      }

      const contenidoElement = document.createElement('p');
      contenidoElement.innerHTML = seccion.contenido;
      guiaElement.appendChild(contenidoElement);

      document.querySelector('.guiaDeUso').appendChild(guiaElement);
    });
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));


// Script que maneja el testimonios.json
fetch("data/testimonios.json")
  .then(response => response.json())
  .then(data => {
    document.querySelector('.testimonios h2').innerText = data.testimonios.titulo;

    const testimonios = data.testimonios.testimonio; // Array de testimonios
    const carousel = document.querySelector('.carousel');

    testimonios.forEach((testimonio) => {
      const testimonioElement = document.createElement('div');
      testimonioElement.classList.add('testimonio');
      testimonioElement.setAttribute('data-aos', 'fade-down');
      testimonioElement.setAttribute('data-aos-duration', '1000');
      testimonioElement.setAttribute('data-aos-delay', '100');

      const usuarioElement = document.createElement('h3');
      usuarioElement.innerText = testimonio.usuario;
      testimonioElement.appendChild(usuarioElement);

      const imgElement = document.createElement('img');
      imgElement.setAttribute('src', testimonio.img);
      imgElement.setAttribute('alt', 'foto de perfil');
      imgElement.classList.add('avatar');
      testimonioElement.appendChild(imgElement);

      const contenidoElement = document.createElement('p');
      contenidoElement.innerHTML = testimonio.contenido;
      testimonioElement.appendChild(contenidoElement);

      carousel.appendChild(testimonioElement);
    });
    

    startCarousel();
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));

// Función para manejar el carrusel de los testimonios
function startCarousel() {
  const carousel = document.querySelector('.carousel');
  const items = carousel.children;
  const totalItems = items.length;
  let index = 0;

  setInterval(() => {
    index++;
    if (index >= totalItems) {
      index = 0;
    }
    const offset = -(index * 12.5); // Mueve el carrusel un 25% hacia la izquierda
    carousel.style.transform = `translateX(${offset}%)`;
  }, 3000); // Cambia la imagen cada 3 segundos
}

// Primero seleccionamos el botón
const agregarTestimonio = document.getElementById('agregar-testimonio');

// También seleccionamos el contenedor para los mensajes y el popup
const mensaje1 = document.getElementById('mensaje1');
const mensaje = document.getElementById('mensaje');
const popup = document.getElementById('popup');
const enviar = document.getElementById('enviar');
const escribir = document.getElementById('escribir');
const mensaje2 = document.getElementById('mensaje2');
const closePopup = document.getElementById('close-popup');

// Definimos una función para obtener el tipo de usuario
function getUserType() {
    const user = JSON.parse(localStorage.getItem('user'));
    // Si no hay usuario, es un visitante
    if (!user) {
        return 'visitante';
    }
    // Retornar el rol del usuario ('lector' o 'publicador')
    return user.role;
}

// Aseguramos que el popup esté oculto al cargar la página
popup.style.display = 'none';

// Función para mostrar mensajes con duración limitada
function mostrarMensaje(mensajeElement, mensajeTexto, duracion) {
    mensajeElement.innerHTML = mensajeTexto;
    setTimeout(function() {
        mensajeElement.innerHTML = '';
    }, duracion);
}

// Agregamos un evento de clic al botón
agregarTestimonio.addEventListener('click', function() {
    // Dentro de la función del evento clic, obtenemos el tipo de usuario
    const userType = getUserType();

    // Realizamos acciones dependiendo del tipo de usuario detectado
    if (userType === 'visitante') {
        mostrarMensaje(mensaje1, 'Para agregar tu testimonio debes registrarte <a href="registrarme.html">aquí</a>.', 5000);
        popup.style.display = 'none'; // Asegúrate de que el popup no se muestre para visitantes
    } else if (userType === 'lector' || userType === 'publicador') {
        mostrarMensaje(mensaje, '', 0); // Limpia cualquier mensaje anterior
        popup.style.display = 'block'; // Muestra el popup
    }
});

// Agregamos un evento de clic al botón "Agregar" en el popup
enviar.addEventListener('click', function() {
    const textoTestimonio = escribir.value.trim();
    if (textoTestimonio === '') {
        mostrarMensaje(mensaje, 'Por favor, escribe tu testimonio antes de enviarlo.', 3000);
        return;
    }

    // Aquí puedes agregar la lógica para enviar el testimonio al servidor o agregarlo a la lista de testimonios
    mostrarMensaje(mensaje2, 'Testimonio agregado exitosamente', 5000);

    // Limpiamos el campo de texto y ocultamos el popup
    escribir.value = '';
    popup.style.display = 'none';
});

// Función para cerrar el popup al hacer clic en la cruz
closePopup.addEventListener('click', function() {
  popup.style.display = 'none';
});