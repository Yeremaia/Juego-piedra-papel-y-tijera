// Función para regresar al inicio
function Retroceder() {
    window.location.href = 'index.html';
}

// REGISTRO DE USUARIO
document.addEventListener('DOMContentLoaded', () => {
    const registroFormulario = document.getElementById('formulario');
    if (registroFormulario) {
        registroFormulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const nombre = document.getElementById('nombre').value.trim();
            const usuario = document.getElementById('usuario').value.trim();
            const pwd = document.getElementById('pwd').value.trim();

            if (!nombre || !usuario || !pwd) {
                alert("Todos los campos son obligatorios.");
                return;
            }

            // Obtener usuarios guardados o inicializar un array vacío
            let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

            // Verificar si el usuario ya existe
            const usuarioExiste = usuarios.some(u => u.usuario === usuario);
            if (usuarioExiste) {
                alert("Este usuario ya está registrado. Intenta con otro nombre de usuario.");
                return;
            }

            // Agregar nuevo usuario al array
            usuarios.push({ nombre, usuario, pwd });

            // Guardar en localStorage
            localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));

            alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
            window.location.href = 'index.html';
        });
    }

    // INICIO DE SESIÓN
    const inicioFormulario = document.getElementById('formulario-index');
    if (inicioFormulario) {
        inicioFormulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const usuarioIniciado = document.getElementById('usuario').value.trim();
            const pwdIniciado = document.getElementById('pwd').value.trim();

            // Obtener usuarios guardados
            let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

            if (usuarios.length === 0) {
                alert("No hay cuentas registradas.");
                return;
            }

            // Buscar usuario en la lista
            const usuarioEncontrado = usuarios.find(u => u.usuario === usuarioIniciado && u.pwd === pwdIniciado);

            if (usuarioEncontrado) {
                // Guardar usuario en localStorage
                localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));

                alert(`¡Bienvenido ${usuarioEncontrado.nombre}!`);
                window.location.href = 'juego.html'; // Redirigir al juego
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        });
    }
});

function generarNombreAleatorio() {
    const adjetivos = ["Valiente", "Rápido", "Feroz", "Misterioso", "Brillante"];
    const sustantivos = ["Tigre", "Lobo", "Halcón", "Dragón", "Guerrero"];
    const numero = Math.floor(Math.random() * 100); // Agrega un número aleatorio para mayor variedad

    const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
    const sustantivo = sustantivos[Math.floor(Math.random() * sustantivos.length)];

    return `${adjetivo}${sustantivo}${numero}`;
}

const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

document.addEventListener('DOMContentLoaded', () => {

    if (usuarioActual) {
        const nombrePC = document.getElementById('nombre-usuario');
        const nombreIA = document.getElementById('nombre-pc')
        if (nombrePC && nombreIA) {
            nombrePC.textContent = `Jugador: ${usuarioActual.nombre}`;
            nombreIA.textContent = `PC: ${generarNombreAleatorio()}`;

            return usuarioActual;
        }
    }
});


// Función para generar un número aleatorio entre 1 y 3
function numeroAleatorioPC() {
    return Math.floor(Math.random() * 3) + 1;
}

let puntosJugador = 0;
let puntosPC = 0;

// Función para recargar la página
function reiniciar() {
    let resultado = document.getElementById("cuadro");
    puntosJugador = 0;
    puntosPC = 0;
    resultado.textContent = 'Click al botón';
    coloresCasilla(); // Para resetear colores
}

// Función para cambiar imagen y determinar el resultado
function jugar(eleccionJugador) {
    let imagenes = {
        1: "img/piedra-rojo.png",
        2: "img/papel-rojo.png",
        3: "img/tijera-rojo.png",
        4: "img/piedra-azul.png",
        5: "img/papel-azul.png",
        6: "img/tijera-azul.png"
    };

    let resultado = document.getElementById("cuadro");
    let numeroPC = numeroAleatorioPC(); // Número aleatorio para la PC

    // Iniciar el contador visual
    let segundos = 3;
    resultado.textContent = `${segundos}`;

    resultado.style.color = "black";
    let intervalo = setInterval(() => {
        // Restar 3 para que los valores de la PC y el jugador sean los mismos
        segundos--;

        if (segundos > 0) {
            resultado.textContent = ` ${segundos}`;
        } else {
            // Cambiar imágenes
            document.getElementById("piedra-derecho").src = imagenes[eleccionJugador];
            document.getElementById("piedra-izquierdo").src = imagenes[numeroPC];

            // Normalizar valores (4,5,6 → 1,2,3)
            let opcionJugador = eleccionJugador - 3;
            let opcionPC = numeroPC;

            clearInterval(intervalo);
            resultado.textContent = ""; // Borra el contador cuando termina
            mostrarResultado(opcionJugador, opcionPC);
        }
    }, 1000);
}


// Función para determinar el resultado después de 3 segundos
function mostrarResultado(opcionJugador, opcionPC) {
    let resultado = document.getElementById("cuadro");

    if (opcionJugador === opcionPC) {
        resultado.textContent = `Empate`;
        resultado.style.color = "black";
        return;
    } else if (
        (opcionJugador === 1 && opcionPC === 3) || // Piedra gana a Tijera
        (opcionJugador === 2 && opcionPC === 1) || // Papel gana a Piedra
        (opcionJugador === 3 && opcionPC === 2)    // Tijera gana a Papel
    ) {
        resultado.textContent = `Azul Ganó`;
        resultado.style.color = "blue";
        if (puntosJugador < 5) puntosJugador++;
    } else {
        resultado.textContent = `Rojo Ganó`;
        resultado.style.color = "red"
        if (puntosPC < 5) puntosPC++;
    }

    coloresCasilla(); // Actualizar casillas después de cambiar puntos
}

// Función para colorear las casillas
function coloresCasilla() {
    // Resetear colores
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`casilla-azul-${i}`).style.backgroundColor = "#EFC56B";
        document.getElementById(`casilla-roja-${i}`).style.backgroundColor = "#EFC56B";
    }

    for (let i = 1; i <= puntosPC; i++) {  
        document.getElementById(`casilla-azul-${i}`).style.backgroundColor = "red";
    }
    for (let i = 1; i <= puntosJugador; i++) {
        document.getElementById(`casilla-roja-${i}`).style.backgroundColor = "blue";
    }
}

// Asignar eventos a los botones
document.getElementById("boton-piedra").addEventListener("click", () => jugar(4));
document.getElementById("boton-papel").addEventListener("click", () => jugar(5));
document.getElementById("boton-tijeras").addEventListener("click", () => jugar(6));