document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-contacto");

    form.addEventListener("submit", function(evento) {
        let esValido = true; // Asumimos que todo está bien al principio

        // 1. Limpiamos errores previos en cada intento
        document.querySelectorAll('.error-msg').forEach(span => {
            span.textContent = '';
            span.classList.remove('activo');
        });
        document.querySelectorAll('.grupo-form input, .grupo-form textarea').forEach(input => {
            input.classList.remove('input-error');
        });

        // 2. Validar Nombre (Mínimo 3 caracteres)
        const nombre = document.getElementById("nombre");
        if (nombre.value.trim().length < 3) {
            mostrarError(nombre, "Por favor, ingresa un nombre válido (mínimo 3 caracteres).");
            esValido = false;
        }

        // 3. Validar Correo (Formato correcto de email)
        const correo = document.getElementById("correo");
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(correo.value.trim())) {
            mostrarError(correo, "Ingresa un correo válido. Sugerencia: usuario@empresa.cl");
            esValido = false;
        }

        // 4. Validar Teléfono (Solo números y opcionalmente el signo +)
        const telefono = document.getElementById("telefono");
        const regexTelefono = /^\+?[0-9\s]{8,15}$/;
        // Si escribió algo, revisamos que sea un teléfono válido
        if (telefono.value.trim() !== "" && !regexTelefono.test(telefono.value.trim())) {
            mostrarError(telefono, "Formato inválido. Sugerencia: +56 9 1234 5678");
            esValido = false;
        }

        // 5. Validar Mensaje (Mínimo 10 caracteres)
        const mensaje = document.getElementById("mensaje");
        if (mensaje.value.trim().length < 10) {
            mostrarError(mensaje, "Detalla un poco más tu requerimiento (mínimo 10 caracteres).");
            esValido = false;
        }

        // 6. Si algo falló, detenemos el envío del formulario
        if (!esValido) {
            evento.preventDefault(); // Esta línea es la que bloquea el envío a FormSubmit
        }
    });

    // Función auxiliar para pintar los errores en pantalla
    function mostrarError(input, mensajeDeError) {
        input.classList.add("input-error");
        const spanError = input.parentElement.querySelector(".error-msg");
        spanError.textContent = mensajeDeError;
        spanError.classList.add("activo");
    }
});