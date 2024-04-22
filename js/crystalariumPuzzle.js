// Array para rastrear los colores combinados con éxito en cada fase
let coloresCombinadosFase1 = [];
let coloresCombinadosFase2 = [];
let fase1 = true;
let fase2 = false;
let fase3 = false;
document.addEventListener('DOMContentLoaded', function() {
    nuevaFase1();  // Inicia la primera fase del juego
});

// Combina colores según las reglas aditivas de luz
function combinar(col1, col2, colorObjetivo) {
    switch (colorObjetivo) {
        case 'amarillo':
            return (col1 === 'rojo' && col2 === 'verde') || (col1 === 'verde' && col2 === 'rojo');
        case 'magenta':
            return (col1 === 'rojo' && col2 === 'azul') || (col1 === 'azul' && col2 === 'rojo');
        case 'cian':
            return (col1 === 'verde' && col2 === 'azul') || (col1 === 'azul' && col2 === 'verde');
        case 'naranja':
            return (col1 === 'rojo' && col2 === 'amarillo') || (col1 === 'amarillo' && col2 === 'rojo');
        case 'morado':
            return (col1 === 'rojo' && col2 === 'magenta') || (col1 === 'magenta' && col2 === 'rojo');
        default:
            return false;
    }
}

// Actualiza la interfaz con botones según los colores disponibles
function actualizarBotones(colores) {
    const botonesDiv = document.getElementById('botones');
    botonesDiv.innerHTML = '';  // Limpiar los botones existentes
    let coloresSeleccionados = [];

    colores.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.classList.add('color-btn');
        colorBtn.style.backgroundColor = traducirColor(color);  // Traduce el color al inglés para CSS
        colorBtn.onclick = () => {
            seleccionarColor(color, colorBtn, coloresSeleccionados);
        };
        botonesDiv.appendChild(colorBtn);
    });

    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'Comprobar';
    checkBtn.onclick = () => {
        if (coloresSeleccionados.length === 2) {
            if(fase1){
                comprobarCombinacionFase1(coloresSeleccionados);
            }
            else if(fase2){
                comprobarCombinacionFase2(coloresSeleccionados);
            }
            coloresSeleccionados = [];
        } else {
            alert('Debes seleccionar dos colores antes de comprobar');
        }
    };
    botonesDiv.appendChild(checkBtn);
}

// Función para traducir nombres de colores al inglés
function traducirColor(color) {
    switch (color) {
        case 'rojo': return 'red';
        case 'verde': return 'green';
        case 'azul': return 'blue';
        case 'amarillo': return 'yellow';
        case 'cian': return 'cyan';
        case 'magenta': return 'magenta';  // Magenta es igual en inglés
        case 'naranja' : return 'orange';
        case 'morado' : return 'purple';
    }
}

function seleccionarColor(color, btn, seleccionados) {
    const index = seleccionados.indexOf(color);
    if (index !== -1) {
        seleccionados.splice(index, 1);  // Deselecciona el color
        btn.style.border = 'none';  // Quita el borde
    } else if (seleccionados.length < 2) {
        seleccionados.push(color);  // Agrega el color si no hay más de dos ya seleccionados
        btn.style.border = '2px solid black';  // Pone un borde al seleccionar
    } else {
        alert('Ya has seleccionado dos colores');
    }
}

function comprobarCombinacionFase1(seleccionados) {
    const colorObjetivo = document.getElementById('objetivo').textContent.split(':')[1].trim();
    const resultado = combinar(seleccionados[0], seleccionados[1], colorObjetivo);
    if (resultado) {
        alert('¡Has ganado!');
        if (coloresCombinadosFase1.includes(colorObjetivo)) {
            alert('Ya has formado este color. Intenta con otro.');
        } else {
            coloresCombinadosFase1.push(colorObjetivo); // Agrega el color al registro de la fase 1
            resetearBotones();
            if (coloresCombinadosFase1.length === 3) {
                alert('¡Felicidades! Ahora pasarás a la fase 2.');
                fase1 = false;
                nuevaFase2(); // Función que inicia la fase 2
            } else {
                nuevaFase1();  // Verifica si es tiempo de avanzar a la siguiente fase
            }
        }
    } else {
        alert('Intenta de nuevo');
        resetearBotones();
    }
}
function comprobarCombinacionFase2(seleccionados) {
    const colorObjetivo = document.getElementById('objetivo').textContent.split(':')[1].trim();
    const resultado = combinar(seleccionados[0], seleccionados[1], colorObjetivo);
    if (resultado) {
        alert('¡Has ganado!');
        if (coloresCombinadosFase2.includes(colorObjetivo)) {
            alert('Ya has formado este color. Intenta con otro.');
        } else {
            coloresCombinadosFase2.push(colorObjetivo); // Agrega el color al registro de la fase 1
            resetearBotones();
            if (coloresCombinadosFase2.length === 2) {
                alert('¡Felicidades! Ahora pasarás a la fase 3.');
                fase1 = false;
                nuevaFase3(); // Función que inicia la fase 2
            } else {
                nuevaFase2();  // Verifica si es tiempo de avanzar a la siguiente fase
            }
        }
    } else {
        alert('Intenta de nuevo');
        resetearBotones();
    }
}
function resetearBotones() {
    const botones = document.querySelectorAll('.color-btn');
    botones.forEach(btn => {
        btn.style.border = 'none'; // Asumiendo que 'none' es el estado deseleccionado.
    });
}
function nuevaFase1() {
    const coloresFase1 = ['magenta', 'cian', 'amarillo'];
    // Filtra los colores que ya han sido combinados con éxito
    const coloresDisponibles = coloresFase1.filter(color => !coloresCombinadosFase1.includes(color));
    const colorObjetivo = coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
    document.getElementById('objetivo').innerHTML = `<p>Color objetivo: ${colorObjetivo}</p>`;
    actualizarBotones(['rojo', 'verde', 'azul']);
}

function nuevaFase2() {
    fase2 = true;
    const coloresFase2 = ['naranja', 'morado'];
    const coloresDisponibles = coloresFase2.filter(color => !coloresCombinadosFase2.includes(color));
    const colorObjetivo = coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
    document.getElementById('objetivo').innerHTML = `<p>Color objetivo: ${colorObjetivo}</p>`;
    actualizarBotones(['rojo', 'verde', 'azul', 'amarillo', 'cian', 'magenta']);
}

function nuevaFase3() {
    fase1 = false;
    fase2 = false;
    fase3 = true;

    // Actualizar instrucciones para la fase 3
    const objetivo = document.getElementById('objetivo');
    objetivo.innerHTML = `<p>Crea el blanco seleccionando hasta tres cuadros.</p>`;
    objetivo.style.display = 'block';

    const botonesDiv = document.getElementById('botones');
    botonesDiv.innerHTML = ''; // Limpiar el div para la nueva fase

    let coloresSeleccionados = [];
    let posicionBlanco = Math.floor(Math.random() * 400); // Posición aleatoria para el cuadrado blanco

    // Configurar el grid dentro del div botones
    botonesDiv.style.display = 'grid';
    botonesDiv.style.gridTemplateColumns = 'repeat(20, 20px)';
    botonesDiv.style.gridGap = '2px';

    for (let i = 0; i < 400; i++) {
        const colorCuadro = document.createElement('div');
        colorCuadro.classList.add('color-cuadro');
        colorCuadro.style.width = '20px';
        colorCuadro.style.height = '20px';
        colorCuadro.style.backgroundColor = i === posicionBlanco ? 'white' : generarHexAleatorio();
        colorCuadro.onclick = function() {
            if (coloresSeleccionados.length < 3) {
                this.style.border = '2px solid black';
                coloresSeleccionados.push({ index: i, color: this.style.backgroundColor });
            } else {
                alert('Ya has seleccionado tres colores, presiona comprobar para ver si ganaste.');
            }
        };
        botonesDiv.appendChild(colorCuadro);
    }

    // Crear o reutilizar el botón de comprobación
    let checkBtn = document.getElementById('checkBtn');
    if (!checkBtn) {
        checkBtn = document.createElement('button');
        checkBtn.id = 'checkBtn';
        checkBtn.textContent = 'Comprobar';
        document.body.appendChild(checkBtn); // Asegurar que el botón se añade fuera del grid
    }

    checkBtn.onclick = () => {
        comprobarSeleccionFase3(coloresSeleccionados, posicionBlanco);
        coloresSeleccionados = []; // Limpiar selecciones después de comprobar
    };
}

function comprobarSeleccionFase3(seleccionados, posicionBlanco) {
    if (seleccionados.length === 1 && seleccionados[0].index === posicionBlanco) {
        alert('¡Has ganado! Has creado el blanco.');
    } else {
        alert('¡Has fallado!');
    }
    // Restablecer el grid sin borrarlo completamente, solo resetear los bordes
    let cuadros = document.querySelectorAll('.color-cuadro');
    cuadros.forEach(cuadro => {
        cuadro.style.border = 'none';
    });
}

function generarHexAleatorio() {
    const hexMax = 0xFFFFFF; // 16777215 en decimal
    const randomNumber = Math.floor(Math.random() * hexMax);
    const randomColor = randomNumber.toString(16);
    return '#' + randomColor.padStart(6, '0');
}


