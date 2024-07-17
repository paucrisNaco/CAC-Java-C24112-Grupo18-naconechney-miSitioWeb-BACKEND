document.addEventListener('DOMContentLoaded', function() {
    fetch('data/mis-entradas.json')
        .then(response => response.json())
        .then(data => {
            const entradas = data['mis-entradas'].entradas;

            // Ordenar las entradas por fecha de publicación (opcional)
            entradas.sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion));

            // Paso 3: Mostrar las entradas en el HTML
            const container = document.querySelector('.mis-entradas');

            const tituloGeneral = document.createElement('h2');
            tituloGeneral.innerText = data['mis-entradas'].titulo;
            container.appendChild(tituloGeneral);

            entradas.forEach(entrada => {
                const entradaElement = document.createElement('div');
                entradaElement.classList.add('entrada');

                const multimediaContainer = document.createElement('div');
                multimediaContainer.classList.add('multimedia-container');

                // Mostrar imágenes
                if (entrada.multimedia.imagenes.length > 0) {
                    entrada.multimedia.imagenes.forEach(imagen => {
                        const img = document.createElement('img');
                        img.src = imagen;
                        img.alt = entrada.titulo;
                        multimediaContainer.appendChild(img);
                    });
                }

                // Mostrar videos
                if (entrada.multimedia.videos.length > 0) {
                    entrada.multimedia.videos.forEach(video => {
                        const videoElement = document.createElement('video');
                        videoElement.src = video;
                        videoElement.controls = true;
                        multimediaContainer.appendChild(videoElement);
                    });
                }

                entradaElement.appendChild(multimediaContainer);

                const contentContainer = document.createElement('div');
                contentContainer.classList.add('content-container');

                const titulo = document.createElement('h3');
                titulo.innerText = entrada.titulo;
                contentContainer.appendChild(titulo);

                // Truncar el contenido si excede los 350 caracteres
                const contenido = document.createElement('p');
                contenido.innerText = entrada.contenido.length > 350 ? entrada.contenido.substring(0, 350) + '...' : entrada.contenido;
                contentContainer.appendChild(contenido);

                const leerMas = document.createElement('button');
                leerMas.innerText = 'Leer más';
                leerMas.classList.add('botonVerMas');
                contentContainer.appendChild(leerMas);

                entradaElement.appendChild(contentContainer);

                const metadatos = document.createElement('p');
                metadatos.classList.add('metadatos');
                metadatos.innerText = `Publicado el ${entrada.fechaPublicacion} por ${entrada.autor}`;
                entradaElement.appendChild(metadatos);

                const interacciones = document.createElement('div');
                interacciones.classList.add('interacciones');
                interacciones.innerHTML = `
                    <span>Me gusta: ${entrada.interacciones.meGusta}</span>
                    <span>Comentarios: ${entrada.interacciones.comentarios}</span>
                    <span>Favoritos: ${entrada.interacciones.favoritos}</span>
                `;
                entradaElement.appendChild(interacciones);

                // Sección de comentarios
                const comentariosSection = document.createElement('div');
                comentariosSection.classList.add('comentarios');
                entrada.interacciones.comentariosList.forEach(comentario => {
                    const comentarioElement = document.createElement('p');
                    comentarioElement.innerText = comentario.length > 100 ? comentario.substring(0, 100) + "..." : comentario;
                    comentariosSection.appendChild(comentarioElement);
                });

                entradaElement.appendChild(comentariosSection);

                container.appendChild(entradaElement);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});




