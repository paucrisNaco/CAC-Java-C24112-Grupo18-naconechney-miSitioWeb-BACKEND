document.addEventListener('DOMContentLoaded', function() {
    const perfilContainer = document.getElementById('mi-perfil');

    fetch('data/miPerfil.json')
        .then(response => response.json())
        .then(data => {
            const perfil = data['mi-perfil'];

            // Crear el contenedor para la imagen y el nombre de usuario
            const headerContainer = document.createElement('div');
            headerContainer.classList.add('perfil-header');

            const imagenPerfil = document.createElement('img');
            imagenPerfil.src = perfil.img;
            imagenPerfil.alt = `Foto de perfil de ${perfil.usuario}`;
            headerContainer.appendChild(imagenPerfil);

            const nombreUsuarioContainer = document.createElement('div');
            nombreUsuarioContainer.classList.add('nombre-usuario');

            const nombreUsuario = document.createElement('h2');
            nombreUsuario.innerText = perfil.usuario;
            nombreUsuarioContainer.appendChild(nombreUsuario);

            const tipoUsuario = document.createElement('p');
            tipoUsuario.classList.add('tipo-usuario');
            tipoUsuario.innerText = perfil.tipo_usuario;
            nombreUsuarioContainer.appendChild(tipoUsuario);

            headerContainer.appendChild(nombreUsuarioContainer);

            perfilContainer.appendChild(headerContainer);

            // Crear sección para la biografía
            const biografiaSection = document.createElement('div');
            biografiaSection.classList.add('biografia');

            const tituloBiografia = document.createElement('h3');
            tituloBiografia.innerText = 'Biografía:';
            biografiaSection.appendChild(tituloBiografia);

            const parrafoBiografia = document.createElement('p');
            parrafoBiografia.innerText = perfil.biografia;
            biografiaSection.appendChild(parrafoBiografia);

            perfilContainer.appendChild(biografiaSection);

            // Crear sección para los intereses
            const interesesSection = document.createElement('div');
            interesesSection.classList.add('intereses');

            const tituloIntereses = document.createElement('h3');
            tituloIntereses.innerText = 'Intereses:';
            interesesSection.appendChild(tituloIntereses);

            const listaIntereses = document.createElement('ul');
            perfil.intereses.forEach(interes => {
                const itemInteres = document.createElement('li');
                itemInteres.innerText = interes;
                listaIntereses.appendChild(itemInteres);
            });
            interesesSection.appendChild(listaIntereses);

            perfilContainer.appendChild(interesesSection);

// Crear sección para la actividad reciente y registro/actividad
            const actividadRegistroContainer = document.createElement('div');
            actividadRegistroContainer.classList.add('actividad-registro-container');

            // Actividad Reciente
            const actividadRecienteSection = document.createElement('div');
            actividadRecienteSection.classList.add('actividad-reciente');

            const tituloActividadReciente = document.createElement('h3');
            tituloActividadReciente.innerText = 'Mi Actividad:';
            actividadRecienteSection.appendChild(tituloActividadReciente);

            const ulActividadReciente = document.createElement('ul');
            perfil.actividad_reciente.forEach(actividad => {
                const liActividad = document.createElement('li');
                liActividad.innerText = actividad;
                ulActividadReciente.appendChild(liActividad);
            });
            actividadRecienteSection.appendChild(ulActividadReciente);

            actividadRegistroContainer.appendChild(actividadRecienteSection);

            // Registro y Actividad
            const registroActividadSection = document.createElement('div');
            registroActividadSection.classList.add('registro-actividad');

            const tituloRegistroActividad = document.createElement('h3');
            tituloRegistroActividad.innerText = 'Registro y Actividad:';
            registroActividadSection.appendChild(tituloRegistroActividad);

            const ulRegistroActividad = document.createElement('ul');
            
            const liUltimaActividad = document.createElement('li');
            liUltimaActividad.innerHTML = `<strong>Última actividad:</strong> ${perfil.ultima_actividad}`;
            ulRegistroActividad.appendChild(liUltimaActividad);
            
            const liFechaRegistro = document.createElement('li');
            liFechaRegistro.innerHTML = `<strong>Fecha de registro:</strong> ${perfil.fecha_registro}`;
            ulRegistroActividad.appendChild(liFechaRegistro);
            
            registroActividadSection.appendChild(ulRegistroActividad);

            actividadRegistroContainer.appendChild(registroActividadSection);

            perfilContainer.appendChild(actividadRegistroContainer);

            // Crear sección para las redes sociales
            const redesSocialesSection = document.createElement('div');
            redesSocialesSection.classList.add('redes-sociales');

            const tituloRedesSociales = document.createElement('h3');
            tituloRedesSociales.innerText = 'Redes Sociales:';
            redesSocialesSection.appendChild(tituloRedesSociales);

            const ulRedesSociales = document.createElement('ul');
            for (let red in perfil.redes_sociales) {
                const liRedSocial = document.createElement('li');
                const enlaceRedSocial = document.createElement('a');
                enlaceRedSocial.href = perfil.redes_sociales[red];
                enlaceRedSocial.target = '_blank';
                enlaceRedSocial.innerText = red.charAt(0).toUpperCase() + red.slice(1); // Capitalizar nombre
                liRedSocial.appendChild(enlaceRedSocial);
                ulRedesSociales.appendChild(liRedSocial);
            }
            redesSocialesSection.appendChild(ulRedesSociales);

            // Agregar redes sociales a la segunda columna (lado derecho)
            const registroActividadContainer = document.querySelector('.registro-actividad');
            registroActividadContainer.appendChild(redesSocialesSection);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
});
