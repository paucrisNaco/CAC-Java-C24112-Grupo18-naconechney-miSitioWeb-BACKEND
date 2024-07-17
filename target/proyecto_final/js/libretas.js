//Codigos para manejar el blog
// Cargar completamente el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Verificar el tipo de usuario
    const userType = getUserType(); // Función para obtener el tipo de usuario (visitante, lector, publicador)

    // Mostrar u ocultar elementos según el tipo de usuario
    handleUserPermissions(userType);

    // Cargar la entrada destacada
    cargarEntradaDestacada();

    // Cargar todas las entradas del blog
    cargarEntradas();
});

// Obtener la información del usuario desde localStorage
function getUserType() {
    const user = JSON.parse(localStorage.getItem('user'));
    // Si no hay usuario, es un visitante
    if (!user) {
        return 'visitante';
    }
    // Retornar el rol del usuario ('lector' o 'publicador')
    return user.role;
}

// Manejo de vistas por perfil
function handleUserPermissions(userType) {
    const newEntryLink = document.querySelector('.linkNuevaEntrada');
    const myEntriesLink = document.querySelector('.linkMisEntradas');
    const menuPerfil = document.querySelector(".menuPerfil");
    const entradaDestacada = document.querySelector(".entradaDestacada");

    if (userType === 'visitante') {
        // Visitante: ocultar enlaces de nueva entrada, mis entradas, notificaciones y menuPerfil
        if (newEntryLink) newEntryLink.style.display = 'none';
        if (myEntriesLink) myEntriesLink.style.display = 'none';
        if (menuPerfil) menuPerfil.style.display = "none";
        if (entradaDestacada) entradaDestacada.style.display = "block";
    } else if (userType === 'lector') {
        // Lector: ocultar enlace de nueva entrada, de mis entradas, archivos y seguidores
        if (newEntryLink) newEntryLink.style.display = 'block';
        if (myEntriesLink) myEntriesLink.style.display = "none";
        if (menuPerfil) menuPerfil.style.display = "block";
        if (entradaDestacada) entradaDestacada.style.display = "block";
    } else if (userType === 'publicador') {
        // Publicador: mostrar todos los enlaces
        if (newEntryLink) newEntryLink.style.display = 'block';
        if (myEntriesLink) myEntriesLink.style.display = 'block';
        if (menuPerfil) menuPerfil.style.display = "block";
        if (entradaDestacada) entradaDestacada.style.display = "block";
    }
}

// Carga de la entrada destacada
function cargarEntradaDestacada() {
    const entradaDestacada = obtenerEntradaDestacada();

    // Reemplazar la imagen destacada por el video de YouTube
    const videoIframe = document.getElementById('videoDestacado');
    if (videoIframe) {
        videoIframe.src = entradaDestacada.videoUrl;
        videoIframe.title = 'Video destacado';
        videoIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        videoIframe.allowfullscreen = true;
        videoIframe.frameborder = 0;
    } else {
        console.error('No se encontró el elemento iframe');
    }

    // Actualizar el resumen, la fecha de publicación, el autor, los likes y comentarios
    document.getElementById('resumenDestacado').textContent = entradaDestacada.resumen;
    document.getElementById('fechaPublicacionDestacada').textContent = entradaDestacada.fecha;
    document.getElementById('autorDestacado').textContent = entradaDestacada.autor;
    document.getElementById('likesDestacados').textContent = entradaDestacada.likes;
    document.getElementById('comentariosDestacados').textContent = entradaDestacada.comentarios;

    // Agregar evento al botón "Ver más"
    document.getElementById('leerMasDestacada').addEventListener('click', () => {
        window.location.href = entradaDestacada.url;
    });
}

// Ejemplo de datos de una entrada destacada (normalmente vendría del backend)
function obtenerEntradaDestacada() {
    return {
        resumen: 'Este es un resumen del video destacado...', // Resumen del video
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID', // URL del video de YouTube
        fecha: '6 de junio de 2024', // Fecha de publicación
        autor: 'Usuario123', // Autor del video
        likes: "100", // Cantidad de likes
        comentarios: "50" // Cantidad de comentarios
    };
}

// Carga de las entradas para la columna 2 de la tercer fila
function cargarEntradas() {
    // Simulación de datos de entradas con videos de YouTube
    const entradas = [
        {
            id: 1,
            titulo: 'Video Reciente 1',
            videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_1',
            fecha: '2024-05-30T10:00:00'
        },
        {
            id: 2,
            titulo: 'Video Reciente 2',
            videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2',
            fecha: '2024-05-29T10:00:00'
        },
        {
            id: 3,
            titulo: 'Video Reciente 3',
            videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3',
            fecha: '2024-05-28T10:00:00'
        }
    ];

    // Ordenar las entradas por fecha de publicación (más reciente primero)
    entradas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    const contenedorEntradas = document.getElementById('contenedorEntradas');

    // Limpiar el contenedor antes de insertar nuevas entradas
    contenedorEntradas.innerHTML = '';

    // Insertar las entradas en el contenedor
    entradas.forEach(entrada => {
        const entradaElemento = document.createElement('div');
        entradaElemento.classList.add('entrada');

        entradaElemento.innerHTML = `
            <h3>${entrada.titulo}</h3>
            <div class="video-container">
                <iframe src="${entrada.videoUrl}" 
                        title="Video" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
            </div>
            <button onclick="verVideo('${entrada.videoUrl}')">Ver Video</button>
        `;

        contenedorEntradas.appendChild(entradaElemento);
    });
}

function verEntrada(id) {
    // Redireccionar a la página de la entrada con el ID correspondiente
    window.location.href = `entrada.html?id=${id}`;
}

// Función para subrayar las distintas partes del submenú de la columna derecha
document.addEventListener('DOMContentLoaded', () => {
    // Obtener la URL de la página actual
    const currentPageUrl = window.location.href;

    // Obtener todos los enlaces del menú
    const menuLinks = document.querySelectorAll('.listaMenu .linkNav');

    // Iterar sobre cada enlace del menú
    menuLinks.forEach(link => {
        // Obtener la URL de cada enlace del menú
        const linkUrl = link.href;

        // Verificar si la URL del enlace coincide con la URL de la página actual
        if (currentPageUrl === linkUrl) {
            // Agregar una clase "active-link" al enlace del menú actual
            link.classList.add('active-link');
            // Remover el estilo text-decoration: none
            link.style.textDecoration = 'underline';
        } else {
            // Agregar el estilo text-decoration: none para los enlaces que no están activos
            link.style.textDecoration = 'none';
        }
    });
});

// Función de prueba para el serch de la barra de búsqueda
function buscarEnSitio() {
    // Obtener el valor ingresado en el campo de búsqueda
    const searchTerm = document.getElementById('campoBusqueda').value.toLowerCase();

    // Obtener todas las entradas del blog
    const entradas = document.querySelectorAll('.entrada');

    // Iterar sobre cada entrada y mostrar u ocultar según el término de búsqueda
    entradas.forEach(entrada => {
        const titulo = entrada.querySelector('h3').textContent.toLowerCase();
        const resumen = entrada.querySelector('p').textContent.toLowerCase();

        // Mostrar la entrada si el título o el resumen coinciden con el término de búsqueda
        if (titulo.includes(searchTerm) || resumen.includes(searchTerm)) {
            entrada.style.display = 'block';
        } else {
            entrada.style.display = 'none';
        }
    });
}

// Función para manejar el evento click del corazón de favoritos
document.querySelectorAll('.favorito-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const userType = getUserType(); // Obtener el tipo de usuario

        if (userType === 'visitante') {
            // Si el usuario es un visitante, redirigirlo a la página de registro
            window.location.href = 'registrarse.html';
        } else {
            // Si el usuario es lector o publicador, cambiar el estado del ícono
            if (this.classList.contains('far')) {
                this.classList.remove('far');
                this.classList.add('fas'); // Cambia el ícono a lleno
            } else {
                this.classList.remove('fas');
                this.classList.add('far'); // Cambia el ícono a vacío
            }
        }
    });
});


// Función para manejar la fecha de publicación y el nombre del autor de las entradas
document.querySelectorAll('.entrada').forEach(entrada => {
    // Obtener la fecha y el autor de los atributos de datos
    const fecha = entrada.getAttribute('data-fecha');
    const autor = entrada.getAttribute('data-autor');
    
    // Mostrar la fecha y el autor en los metadatos
    entrada.querySelector('.fecha-publicacion').textContent = fecha;
    entrada.querySelector('.autor').textContent = autor;
    
    // Manejar clics en el nombre del autor (simulado)
    entrada.querySelector('.autor').addEventListener('click', () => {
        // Aquí puedes dirigir al usuario a la página del autor o realizar otra acción
        console.log('Clic en el autor:', autor);
    });
});

document.querySelectorAll('.entradaDestacada').forEach(entradaDestacada => {
    // Manejar el párrafo y la imagen
    const paragraph = entradaDestacada.querySelector('p');
    let text = paragraph.innerText;
    const words = text.split(' ');
    
    if (words.length > 100) {
        text = words.slice(0, 100).join(' ') + '...'; // Limita a 100 palabras
    }
    
    paragraph.innerText = text; // Actualiza el texto del párrafo
    
    const wordCount = text.split(' ').length; // Cuenta las palabras después de truncar
    const img = entradaDestacada.querySelector('img');
    const baseSize = 15; // Base size in percentage

    img.style.width = (baseSize + wordCount * 0.1) + '%'; // Ajusta el tamaño según sea necesario

    // Manejar la fecha de publicación y el nombre del autor
    const fecha = entradaDestacada.getAttribute('data-fecha');
    const autor = entradaDestacada.getAttribute('data-autor');
    
    // Mostrar la fecha y el autor en los metadatos
    entradaDestacada.querySelector('.fecha-publicacion').textContent = fecha;
    entradaDestacada.querySelector('.autor').textContent = autor;
    
    // Manejar clics en el nombre del autor (simulado)
    entradaDestacada.querySelector('.autor').addEventListener('click', () => {
        // Aquí puedes dirigir al usuario a la página del autor o realizar otra acción
        console.log('Clic en el autor:', autor);
    });
});

document.querySelectorAll('.entrada').forEach(entrada => {
    // Manejar el párrafo y la imagen
    const paragraph = entrada.querySelector('p');
    let text = paragraph.innerText;
    const words = text.split(' ');
    
    if (words.length > 30) {
        text = words.slice(0, 30).join(' ') + '...'; // Limita a 100 palabras
    }
    
    paragraph.innerText = text; // Actualiza el texto del párrafo
    
    // const wordCount = text.split(' ').length; // Cuenta las palabras después de truncar
    // const img = entrada.querySelector('img');
    // const baseSize = 70; // Base size in percentage

    // img.style.width = (baseSize + wordCount * 0.1) + '%'; // Ajusta el tamaño según sea necesario

    // Manejar la fecha de publicación y el nombre del autor
    const fecha = entrada.getAttribute('data-fecha');
    const autor = entrada.getAttribute('data-autor');
    
    // Mostrar la fecha y el autor en los metadatos
    entrada.querySelector('.fecha-publicacion').textContent = fecha;
    entrada.querySelector('.autor').textContent = autor;
    
    // Manejar clics en el nombre del autor (simulado)
    entrada.querySelector('.autor').addEventListener('click', () => {
        // Aquí puedes dirigir al usuario a la página del autor o realizar otra acción
        console.log('Clic en el autor:', autor);
    });
});