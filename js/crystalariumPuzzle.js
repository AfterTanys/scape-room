// Array para rastrear los colores combinados con éxito en cada fase
let coloresCombinadosFase1 = [];
let coloresCombinadosFase2 = [];
let fase1 = true;
let fase2 = false;
let fase3 = false;
const titulo = document.querySelector('h1');
const objetivo = document.getElementById('objetivo');
document.addEventListener('DOMContentLoaded', function() {
    nuevaFase1();  // Inicia la primera fase del juego
});

// Combina colores según las reglas aditivas de luz
function combinar(col1, col2, colorObjetivo) {
    switch (colorObjetivo) {
        case 'yellow':
            return (col1 === 'red' && col2 === 'green') || (col1 === 'green' && col2 === 'red');
        case 'magenta':
            return (col1 === 'red' && col2 === 'blue') || (col1 === 'blue' && col2 === 'red');
        case 'cyan':
            return (col1 === 'green' && col2 === 'blue') || (col1 === 'blue' && col2 === 'green');
        case 'orange':
            return (col1 === 'red' && col2 === 'yellow') || (col1 === 'yellow' && col2 === 'red');
        case 'purple':
            return (col1 === 'red' && col2 === 'magenta') || (col1 === 'magenta' && col2 === 'red');
        default:
            return false;
    }
}

// Actualiza la interfaz con botones según los colores disponibles
function actualizarBotones(colores) {
    const screenDiv = document.getElementById('screen'); // Referencia al contenedor de la pantalla.
    const botonesDiv = document.getElementById('botones'); // Div donde se colocarán los botones.
    botonesDiv.innerHTML = '';  // Limpiar los botones existentes.
    let coloresSeleccionados = [];

    colores.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.classList.add('color-btn');
        colorBtn.style.backgroundColor = color;  // Traduce el color al nombre reconocido por CSS.
        colorBtn.onclick = () => {
            seleccionarColor(color, colorBtn, coloresSeleccionados);
        };
        botonesDiv.appendChild(colorBtn);
    });

    // Asegurarse de que botonesDiv esté dentro de screenDiv.
    if (!screenDiv.contains(botonesDiv)) {
        screenDiv.appendChild(botonesDiv);
    }

    let checkBtn = screenDiv.querySelector('button#checkBtn');
if (!checkBtn) {
    checkBtn = document.createElement('button');
    checkBtn.id = 'checkBtn';
    checkBtn.textContent = 'COMMIT';
    screenDiv.appendChild(checkBtn);
}

checkBtn.onclick = () => {
        if (coloresSeleccionados.length === 2) {
            if(fase1){
                comprobarCombinacionFase1(coloresSeleccionados);
            } else if(fase2){
                comprobarCombinacionFase2(coloresSeleccionados);
            } 
            coloresSeleccionados = [];  // Restablece la selección de colores.
        } else {
            titulo.textContent = 'ERROR: NEED 2 COLORS';
            titulo.classList.remove('text');
        titulo.classList.add('warning-text');
        }
    };
    screenDiv.appendChild(checkBtn); // Asegúrate de que el botón de comprobar esté dentro de screenDiv.
}
function actualizarBotonesFase2() {
    const botonesDiv = document.getElementById('botones');
    botonesDiv.innerHTML = '';  // Limpiar el contenedor de botones
    let coloresSeleccionados = [];
    // Configurar el grid dentro del div botones para la fase 2
    botonesDiv.style.display = 'grid';
    botonesDiv.style.gridTemplateColumns = 'repeat(3, 50px)';  // Tres columnas
    botonesDiv.style.gridTemplateRows = 'repeat(2, 50px)';  // Dos filas
    botonesDiv.style.gridGap = '10px';  // Espacio entre botones
    botonesDiv.style.justifyContent = 'center';  // Centra los botones horizontalmente

    // Colores para la fase 2
    const fila1 = ['red', 'blue', 'green'];
    const fila2 = ['cyan', 'magenta', 'yellow'];

    // Añadir los botones de la primera fila
    fila1.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.classList.add('color-btn');
        colorBtn.style.backgroundColor = color;
        botonesDiv.appendChild(colorBtn);
        colorBtn.onclick = () => {
            seleccionarColor(color, colorBtn, coloresSeleccionados);
        };
    });

    // Añadir los botones de la segunda fila
    fila2.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.classList.add('color-btn');
        colorBtn.style.backgroundColor = color;
        botonesDiv.appendChild(colorBtn);
        colorBtn.onclick = () => {
            seleccionarColor(color, colorBtn, coloresSeleccionados);
        };
    });
    checkBtn.onclick = () => {
        if (coloresSeleccionados.length === 2) {
            if(fase1){
                comprobarCombinacionFase1(coloresSeleccionados);
            } else if(fase2){
                comprobarCombinacionFase2(coloresSeleccionados);
            } 
            coloresSeleccionados = [];  // Restablece la selección de colores.
        } else {
            titulo.textContent = 'ERROR: NEED 2 COLORS';
            titulo.classList.remove('text');
        titulo.classList.add('warning-text');
        }
    };
}

function seleccionarColor(color, btn, seleccionados) {
    const index = seleccionados.indexOf(color);
    if (index !== -1) {
        seleccionados.splice(index, 1);  // Deselecciona el color
        btn.style.border = 'none';  // Quita el borde
    } else if (seleccionados.length < 2) {
        seleccionados.push(color);  // Agrega el color si no hay más de dos ya seleccionados
        btn.style.border = '4px solid #42d142';  // Pone un borde al seleccionar
    } else {
        titulo.textContent = 'OVERLOAD, ONLY 2 COLORS';
        titulo.classList.remove('text');
        titulo.classList.add('warning-text');
    }
}
function seleccionarColor3(cuadro, seleccionados) {
    const cuadroIndex = Array.from(cuadro.parentNode.children).indexOf(cuadro);
    // Comprobar si el cuadro ya está en la lista de seleccionados
    if (seleccionados.some(sel => sel.index === cuadroIndex)) {
        // Deseleccionar si ya fue seleccionado
        cuadro.style.border = 'none';
        const selectedIndex = seleccionados.findIndex(sel => sel.index === cuadroIndex);
        seleccionados.splice(selectedIndex, 1);
    } else if (seleccionados.length < 3) {
        // Seleccionar si hay menos de tres cuadros ya seleccionados
        const currentBorderColor = getComputedStyle(cuadro).backgroundColor;
        cuadro.style.border = `1px solid ${invertColor(currentBorderColor)}`;
        seleccionados.push({ cuadro, index: cuadroIndex });
    } else {
        titulo.textContent = 'WARNING: DO NOT SYNTHESIZE WITH MORE THAN 3';
        titulo.classList.remove('text');
        titulo.classList.add('warning-text');
    }
}
function comprobarCombinacionFase1(seleccionados) {
    const colorObjetivo = objetivo.textContent.split(':')[1].trim();
    const resultado = combinar(seleccionados[0], seleccionados[1], colorObjetivo);
    if (resultado) {
        titulo.textContent = 'RESTORED SECONDARY COLOR';
        titulo.classList.remove('warning-text');
        titulo.classList.add('text');
        if (coloresCombinadosFase1.includes(colorObjetivo)) {
            titulo.textContent = 'COLOR FUNCTION ALREADY RESTORED';
        } else {
            coloresCombinadosFase1.push(colorObjetivo); // Agrega el color al registro de la fase 1
            resetearBotones();
            if (coloresCombinadosFase1.length === 3) {
                titulo.textContent = 'INTEGRATING NEW FUNCTIONS';
                fase1 = false;
                nuevaFase2(); // Función que inicia la fase 2
            } else {
                nuevaFase1();  // Verifica si es tiempo de avanzar a la siguiente fase
            }
        }
    } else {
        titulo.textContent = 'ERROR';
        titulo.classList.remove('text');
        titulo.classList.add('warning-text');
        resetearBotones();
    }
}
function comprobarCombinacionFase2(seleccionados) {
    const colorObjetivo = objetivo.textContent.split(':')[1].trim();
    const resultado = combinar(seleccionados[0], seleccionados[1], colorObjetivo);
    if (resultado) {
        titulo.textContent = 'RESTORED TERTIARY COLOR';
        titulo.classList.remove('warning-text');
        titulo.classList.add('text');
        if (coloresCombinadosFase2.includes(colorObjetivo)) {
            titulo.textContent = 'COLOR FUNCTION ALREADY RESTORED';
        } else {
            coloresCombinadosFase2.push(colorObjetivo); // Agrega el color al registro de la fase 1
            resetearBotones();
            if (coloresCombinadosFase2.length === 2) {
                titulo.textContent = 'CRYSTALARIUM';
                fase1 = false;
                nuevaFase3(); 
            } else {
                nuevaFase2();  
            }
        }
    } else {
        titulo.textContent = 'ERROR';
        titulo.classList.remove('text');
        titulo.classList.add('warning-text');
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
    const coloresFase1 = ['magenta', 'cyan', 'yellow'];
    // Filtra los colores que ya han sido combinados con éxito
    const coloresDisponibles = coloresFase1.filter(color => !coloresCombinadosFase1.includes(color));
    const colorObjetivo = coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
    objetivo.innerHTML = `<p>color not found: ${colorObjetivo}</p>`;
    actualizarBotones(['red', 'green', 'blue']);
}

function nuevaFase2() {
    fase2 = true;
    const coloresFase2 = ['orange', 'purple'];
    const coloresDisponibles = coloresFase2.filter(color => !coloresCombinadosFase2.includes(color));
    const colorObjetivo = coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
    objetivo.innerHTML = `<p>Color Not found: ${colorObjetivo}</p>`;
    actualizarBotonesFase2();
}

function nuevaFase3() {
    fase1 = false;
    fase2 = false;
    fase3 = true;

    // Actualizar instrucciones para la fase 3
    objetivo.innerHTML = `<p>Choose a max of 3 colors.</p>`;
    objetivo.style.display = 'block';

    const botonesDiv = document.getElementById('botones');
    botonesDiv.innerHTML = ''; // Limpiar el div para la nueva fase
    botonesDiv.style.gridTemplateRows = 'none';
    let coloresSeleccionados = [];
    let posicionBlanco = Math.floor(Math.random() * 400); // Posición aleatoria para el cuadrado blanco

    // Configurar el grid dentro del div botones
    botonesDiv.style.display = 'grid';
    botonesDiv.style.gridTemplateColumns = 'repeat(20, 15px)';
    botonesDiv.style.gridGap = '5px';

    for (let i = 0; i < 400; i++) {
        const colorCuadro = document.createElement('div');
        colorCuadro.classList.add('color-cuadro');
        colorCuadro.style.width = '15px';
        colorCuadro.style.height = '15px';
        colorCuadro.style.boxSizing = 'border-box';
        colorCuadro.style.backgroundColor = i === posicionBlanco ? 'white' : generarHexAleatorio();
        colorCuadro.onclick = function() {
            seleccionarColor3(this, coloresSeleccionados);
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
       titulo.textContent = 'SYNTHESIZED WHITE CRYSTAL ';
       objetivo.textContent = '[SiO2]';
    } else {
        titulo.textContent = 'ERROR: EXTREMELY VOLATILE CRYSTAL';
        titulo.classList.remove('text');
        titulo.classList.add('warning-text');
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


function invertColor(rgb) {
    // Extraer los valores de rojo, verde y azul del formato RGB
    const rgbParts = rgb.match(/\d+/g);

    // Invertir cada componente
    const r = 255 - parseInt(rgbParts[0], 10);
    const g = 255 - parseInt(rgbParts[1], 10);
    const b = 255 - parseInt(rgbParts[2], 10);

    // Volver a formar el color en formato RGB
    return `rgb(${r}, ${g}, ${b})`;
}

