// todo se ejecuta cuando el DOM se carga completamente
document.addEventListener('DOMContentLoaded', () => {
    // selecciona el formulario del dom
    const formulario = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // --------------------------------------------------------------
    // funcion mostrar error
    const mostrarError = (input, mensaje) => {
        // Acceder al div contenedor más cercano
        const divPadre = input.closest('div');
        // Encontrar o crear el elemento error-text
        let errorText = divPadre.querySelector('.error-text');
        if (!errorText) {
            errorText = document.createElement('div');
            errorText.className = 'error-text';
            divPadre.appendChild(errorText);
        }
        // Agregar la clase de error al elemento padre
        divPadre.classList.add('error');
        // Agregar mensaje de error
        errorText.textContent = mensaje;
    }

    // --------------------------------------------------------------
    //eliminar mensaje de error
    const eliminarError = input => {
        // acceder al la etiqueta contenedora
        const divPadre = input.parentNode;
        // eliminar la clase de error del elemento padre/contenedor
        divPadre.classList.remove('error');
        // encontramos el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        // eliminamos el elemento error-text si existe
        if (errorText) {
            divPadre.removeChild(errorText);
        }
    }

    // ----------------------------------------------------------------
    // Función para validar un correo electrónico utilizando una expresión regular
    function isEmail(email) {
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email);//devuelve true si la cadena coincide con el patrón de la expresión regular
    }
    // funcion para validar el campo de email
    function validarEmail(campoId, mensaje) {
        // obtenemos elemento mediante id
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();
        // si el campo esta vacio
        if (email === '') {
            //establecemos mensaje de error
            mostrarError(campo, 'El correo electrónico es obligatorio');
            // indicamos que la validacion ha fallado
            return false
        } else if (!isEmail(email)) {
            //establecemos mensaje de error 
            mostrarError(campo, mensaje);
            // indicamos que la validacion ha fallado
            return false
        } else {
            // si es valido eliminamos cualquier error
            eliminarError(campo);
            // indicamos que la validacion es exitosa
            return true
        }
    }

    // ----------------------------------------------------------------
    function isContraseña(contraseña) {
        const expresionRegular = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d-_@$!%*?&]{8,}$/;
        return expresionRegular.test(contraseña);
    }   

    function validarContraseña(campoId, mensaje) {
        // Obtenemos el elemento mediante su id
        const campo = document.getElementById(campoId);
        const contraseña = campo.value.trim();

        // Verificamos si la contraseña cumple con las reglas
        if (contraseña === '') {
            // Si la contraseña está vacía, mostramos un mensaje de error
            mostrarError(campo, 'La contraseña es obligatoria');
            return false; // Indicamos que la validación ha fallado
        } else if (contraseña.length < 8) {
            // Si la contraseña tiene menos de 8 caracteres, mostramos un mensaje de error
            mostrarError(campo, 'La contraseña debe tener al menos 8 caracteres');
            return false; // Indicamos que la validación ha fallado
        } else if (!isContraseña(contraseña)) {
            // Si la contraseña no cumple con los criterios de complejidad, mostramos un mensaje de error
            mostrarError(campo, mensaje);
            return false; // Indicamos que la validación ha fallado
        } else {
            // Si la contraseña es válida, eliminamos cualquier error y la validación tiene éxito
            eliminarError(campo);
            return true;
        }
    }

    // ---------------------------------------------------------------------
    //funcion para corroborar si los campos estan completos para quitar error
    formulario.querySelectorAll('input').forEach(input => {
        // se activa cuando el valor de un elemento del formulario cambia y se sale del elemento 
        input.addEventListener('change', () => {
            // obtenemos el valor del campo seleccionado
            const valor = input.value.trim();//elimina cualquier espacio en blanco al principio y al final del valor obtenido.
            // condicion para evaluar
            if (valor !== '') {
                eliminarError(input);
            }
        })
    });

    // --------------------------------------------------------------------------------
    // funcion para validar el formulario
    const validarFormulario = () => {
        let validar = true;
        // validar campo email
        validar = validarEmail('email', 'El correo electrónico no es válido') && validar;
        // validar contraseña
        validar = validarContraseña('password', 'La contraseña debe tener al menos una mayúscula, una minúscula, un caracter especial y un número.') && validar;
        return validar;
    }

    // -------------------------------------------------------------------------------------
    // Agrega un evento de escucha para el enlace "Olvidé mi contraseña"
    document.getElementById('forgotPassword').addEventListener('click', function(event) {
        event.preventDefault(); // Evita que el enlace redireccione

        // Muestra el mensaje de recuperación
        document.getElementById('mensajeRecuperacion').style.display = 'block';

        // Opcional: Oculta el mensaje después de unos segundos (por ejemplo, 5 segundos)
        setTimeout(function() {
            document.getElementById('mensajeRecuperacion').style.display = 'none';
        }, 5000); // 5000 milisegundos = 5 segundos
    });

    // -------------------------------------------------------------------------------------
    // Agregar un evento de escucha para cuando se envía el formulario
    formulario.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(formulario);
        formData.append('email', emailInput.value);
        formData.append('password', passwordInput.value);
        // formData.append('rememberMe', rememberMeCheckbox.checked);

        fetch('/login', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log("Inicio de sesión exitoso");
                window.location.href = "blog.html";
            } else {
                console.error("Error al iniciar sesión");
                window.location.href = "registrarse.html";

            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            // Manejo del error, por ejemplo, mostrar un mensaje al usuario
        });
    });
});
