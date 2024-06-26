//Codigo para abrir la ventana modal
const modal_small_box = document.getElementById("modal-puzzle-small-box");

//Cuando haces click en el elemento abre la ventana modal
document.getElementById("small-box-glow").addEventListener("click", ()=>{
    console.log("Abriendo modal crystalariumPuzzle");
    let crystalariumSound = new Audio("../audio/crystalarium/Retro HiTech 08.wav");
    crystalariumSound.volume=0.3;
    crystalariumSound.play();
    showDialog(
        "This is Tara's crystalarium; she uses it to synthesize various compounds and minerals. When we escaped from Phobos, it took more hits than it could handle, and most of its functions went offline. Vex helped design a new interface that even I could understand. Tara is a very kind person. Maybe if I restore all its functions, I could make a new white crystal for my flashlight...",
        `SILA (${JSON.parse(localStorage.getItem("username"))})`,
        "../resources/sprites/Sila/Sila_Neutra.png"
      );
    openModal(modal_small_box);
});


// Array para rastrear los colores combinados con éxito en cada fase
let coloresCombinadosFase1 = [];
let coloresCombinadosFase2 = [];
let fase1Crystal = true;
let fase2Crystal = false;
let fase3Crystak = false;
const tituloCrystal = document.querySelector('#h1-crystal');
const objetivoCrystal = document.getElementById('objetivo-crystal');
document.addEventListener('DOMContentLoaded', function() {
    nuevaFase1Crystal();  // Inicia la primera fase del juego
});

// Combina colores según las reglas aditivas de luz
function combinarCrystal(col1, col2, colorObjetivo) {
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
function actualizarBotonesCrystal(colores) {
    const screenDiv = document.getElementById('screen-crystal'); // Referencia al contenedor de la pantalla.
    const botonesDiv = document.getElementById('botones-crystal'); // Div donde se colocarán los botones.
    botonesDiv.innerHTML = '';  // Limpiar los botones existentes.
    let coloresSeleccionados = [];

    colores.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.classList.add('color-btn-crystal');
        colorBtn.classList.add('button-crystal')
        colorBtn.style.backgroundColor = color;  // Traduce el color al nombre reconocido por CSS.
        colorBtn.onclick = () => {
            let crystalariumSound = new Audio("../audio/crystalarium/crystalarium-sound.mp3");
            crystalariumSound.play();
            seleccionarColorCrystal(color, colorBtn, coloresSeleccionados);
        };
        botonesDiv.appendChild(colorBtn);
    });

    // Asegurarse de que botonesDiv esté dentro de screenDiv.
    if (!screenDiv.contains(botonesDiv)) {
        screenDiv.appendChild(botonesDiv);
    }

    let checkBtn = screenDiv.querySelector('button#checkBtn');
    let closeBtn = screenDiv.querySelector('button#closeBtn');
if (!checkBtn) {
    checkBtn = document.createElement('button');
    checkBtn.id = 'checkBtn';
    checkBtn.classList.add('button-crystal');
    checkBtn.textContent = 'COMMIT';
    screenDiv.appendChild(checkBtn);
}
if (!closeBtn) {
    closeBtn = document.createElement('button');
    closeBtn.id = 'closeBtn';
    closeBtn.classList.add('button-crystal');
    closeBtn.textContent = 'CLOSE';
    screenDiv.appendChild(closeBtn);
}

closeBtn.onclick = () =>{
    let crystalariumSound = new Audio("../audio/crystalarium/crystalarium-sound.mp3");
    crystalariumSound.play();
    console.log("Cerrando modal crystalariumPuzzle");
    closeModal(modal_small_box);
}

checkBtn.onclick = () => {
        let crystalariumSound = new Audio("../audio/crystalarium/crystalarium-sound.mp3");
        crystalariumSound.play();
        if (coloresSeleccionados.length === 2) {
            if(fase1Crystal){
                comprobarCombinacionFase1Crystal(coloresSeleccionados);
            } else if(fase2Crystal){
                comprobarCombinacionFase2Crystal(coloresSeleccionados);
            } 
            coloresSeleccionados = [];  // Restablece la selección de colores.
        } else {
            tituloCrystal.textContent = 'ERROR: NEED 2 COLORS';
            tituloCrystal.classList.remove('text-crystal');
        tituloCrystal.classList.add('warning-text-crystal');
        }
    };
    screenDiv.appendChild(checkBtn); // Asegúrate de que el botón de comprobar esté dentro de screenDiv.
}
function actualizarBotonesFase2Crystal() {
    const botonesDiv = document.getElementById('botones-crystal');
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
        colorBtn.classList.add('color-btn-crystal');
        colorBtn.classList.add('button-crystal');
        colorBtn.style.backgroundColor = color;
        botonesDiv.appendChild(colorBtn);
        colorBtn.onclick = () => {
            let crystalariumSound = new Audio("../audio/crystalarium/crystalarium-sound.mp3");
            crystalariumSound.play();
            seleccionarColorCrystal(color, colorBtn, coloresSeleccionados);
        };
    });

    // Añadir los botones de la segunda fila
    fila2.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.classList.add('color-btn-crystal');
        colorBtn.classList.add('button-crystal');
        colorBtn.style.backgroundColor = color;
        botonesDiv.appendChild(colorBtn);
        colorBtn.onclick = () => {
            let crystalariumSound = new Audio("../audio/crystalarium/crystalarium-sound.mp3");
            crystalariumSound.play();
            seleccionarColorCrystal(color, colorBtn, coloresSeleccionados);
        };
    });
    checkBtn.onclick = () => {
        let crystalariumSound = new Audio("../audio/crystalarium/crystalarium-sound.mp3");
        crystalariumSound.play();
        if (coloresSeleccionados.length === 2) {
            if(fase1Crystal){
                comprobarCombinacionFase1Crystal(coloresSeleccionados);
            } else if(fase2Crystal){
                comprobarCombinacionFase2Crystal(coloresSeleccionados);
            } 
            coloresSeleccionados = [];  // Restablece la selección de colores.
        } else {
            tituloCrystal.textContent = 'ERROR: NEED 2 COLORS';
            tituloCrystal.classList.remove('text-crystal');
        tituloCrystal.classList.add('warning-text-crystal');
        }
    };
}

function seleccionarColorCrystal(color, btn, seleccionados) {
    const index = seleccionados.indexOf(color);
    if (index !== -1) {
        seleccionados.splice(index, 1);  // Deselecciona el color
        btn.style.border = 'none';  // Quita el borde
    } else if (seleccionados.length < 2) {
        seleccionados.push(color);  // Agrega el color si no hay más de dos ya seleccionados
        btn.style.border = '4px solid #42d142';  // Pone un borde al seleccionar
    } else {
        tituloCrystal.textContent = 'OVERLOAD, ONLY 2 COLORS';
        tituloCrystal.classList.remove('text-crystal');
        tituloCrystal.classList.add('warning-text-crystal');
    }
}
function seleccionarColor3Crystal(cuadro, seleccionados) {
    const cuadroIndex = Array.from(cuadro.parentNode.children).indexOf(cuadro);
    // Comprobar si el cuadro ya está en la lista de seleccionados
    if (seleccionados.some(sel => sel.index === cuadroIndex)) {
        // Deseleccionar si ya fue seleccionado
        cuadro.style.border = 'none';
        const selectedIndex = seleccionados.findIndex(sel => sel.index === cuadroIndex);
        seleccionados.splice(selectedIndex, 1);
    } else if (seleccionados.length < 3) {
        // esto era para que el borde se viera invertido pero queda como el culo.
        //const currentBorderColor = getComputedStyle(cuadro).backgroundColor;
        cuadro.style.border = `1px solid #42d142`;
        seleccionados.push({ cuadro, index: cuadroIndex });
    } else {
        tituloCrystal.textContent = 'WARNING: DO NOT SYNTHESIZE WITH MORE THAN 3';
        tituloCrystal.classList.remove('text-crystal');
        tituloCrystal.classList.add('warning-text-crystal');
    }
}
function comprobarCombinacionFase1Crystal(seleccionados) {
    const colorObjetivo = objetivoCrystal.textContent.split(':')[1].trim();
    const resultado = combinarCrystal(seleccionados[0], seleccionados[1], colorObjetivo);
    if (resultado) {
        tituloCrystal.textContent = 'RESTORED SECONDARY COLOR';
        tituloCrystal.classList.remove('warning-text-crystal');
        tituloCrystal.classList.add('text-crystal');
        if (coloresCombinadosFase1.includes(colorObjetivo)) {
            tituloCrystal.textContent = 'COLOR FUNCTION ALREADY RESTORED';
        } else {
            coloresCombinadosFase1.push(colorObjetivo); // Agrega el color al registro de la fase 1
            resetearBotonesCrystal();
            if (coloresCombinadosFase1.length === 3) {
                tituloCrystal.textContent = 'INTEGRATING NEW FUNCTIONS';
                fase1Crystal = false;
                nuevaFase2Crystal(); // Función que inicia la fase 2
            } else {
                nuevaFase1Crystal();  // Verifica si es tiempo de avanzar a la siguiente fase
            }
        }
    } else {
        tituloCrystal.textContent = 'ERROR';
        tituloCrystal.classList.remove('text-crystal');
        tituloCrystal.classList.add('warning-text-crystal');
        resetearBotonesCrystal();
    }
}
function comprobarCombinacionFase2Crystal(seleccionados) {
    const colorObjetivo = objetivoCrystal.textContent.split(':')[1].trim();
    const resultado = combinarCrystal(seleccionados[0], seleccionados[1], colorObjetivo);
    if (resultado) {
        tituloCrystal.textContent = 'RESTORED TERTIARY COLOR';
        tituloCrystal.classList.remove('warning-text-crystal');
        tituloCrystal.classList.add('text-crystal');
        if (coloresCombinadosFase2.includes(colorObjetivo)) {
            tituloCrystal.textContent = 'COLOR FUNCTION ALREADY RESTORED';
        } else {
            coloresCombinadosFase2.push(colorObjetivo); // Agrega el color al registro de la fase 1
            resetearBotonesCrystal();
            if (coloresCombinadosFase2.length === 2) {
                tituloCrystal.textContent = 'CRYSTALARIUM';
                fase1Crystal = false;
                nuevaFase3Crystal(); 
            } else {
                nuevaFase2Crystal();  
            }
        }
    } else {
        tituloCrystal.textContent = 'ERROR';
        tituloCrystal.classList.remove('text-crystal');
        tituloCrystal.classList.add('warning-text-crystal');
        resetearBotonesCrystal();
    }
}
function resetearBotonesCrystal() {
    const botones = document.querySelectorAll('.color-btn-crystal');
    botones.forEach(btn => {
        btn.style.border = 'none'; // Asumiendo que 'none' es el estado deseleccionado.
    });
}
function nuevaFase1Crystal() {
    const coloresFase1 = ['magenta', 'cyan', 'yellow'];
    // Filtra los colores que ya han sido combinados con éxito
    const coloresDisponibles = coloresFase1.filter(color => !coloresCombinadosFase1.includes(color));
    const colorObjetivo = coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
    objetivoCrystal.innerHTML = `<p class='text-crystal' >color not found: ${colorObjetivo}</p>`;
    actualizarBotonesCrystal(['red', 'green', 'blue']);
}

function nuevaFase2Crystal() {
    fase2Crystal = true;
    const coloresFase2 = ['orange', 'purple'];
    const coloresDisponibles = coloresFase2.filter(color => !coloresCombinadosFase2.includes(color));
    const colorObjetivo = coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
    objetivoCrystal.innerHTML = `<p class='text-crystal'>Color Not found: ${colorObjetivo}</p>`;
    actualizarBotonesFase2Crystal();
}

function nuevaFase3Crystal() {
    fase1Crystal = false;
    fase2Crystal = false;
    Crystak = true;

    // Actualizar instrucciones para la fase 3
    objetivoCrystal.innerHTML = `<p class='text-crystal'>Choose a max of 3 colors.</p>`;
    objetivoCrystal.style.display = 'block';

    const botonesDiv = document.getElementById('botones-crystal');
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
        colorCuadro.style.backgroundColor = i === posicionBlanco ? 'white' : generarHexAleatorioCrystal();
        colorCuadro.onclick = function() {
            let crystalariumSound = new Audio("../audio/crystalarium/crystalarium-sound.mp3");
            crystalariumSound.play();
            seleccionarColor3Crystal(this, coloresSeleccionados);
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
        let crystalariumSound = new Audio("../audio/crystalarium/crystalarium-sound.mp3");
        crystalariumSound.play();
        comprobarCombinacionFase3Crystal(coloresSeleccionados, posicionBlanco);
        coloresSeleccionados = []; // Limpiar selecciones después de comprobar
    };
}

function comprobarCombinacionFase3Crystal(seleccionados, posicionBlanco) {
    
    if (seleccionados.length === 1 && seleccionados[0].index === posicionBlanco) {
        //Si te pasas el cristalario salta texto

        showDialog("This quartz will work for the flashlight. Look, it seems Kai carved the Ceres rune into the side of the crystalarium with his knife. Lena might not appreciate her toys being scratched, but given the circumstances we were in...", `SILA (${JSON.parse(localStorage.getItem("username"))})`, "../resources/sprites/Sila/Sila_sorprendida.png");

        //Se pone el cristal y se actualiza

        crystalariumLanternItem = 1;
        localStorage.setItem("crystalariumLantern",JSON.stringify(crystalariumLanternItem));
        updateCrystalariumLanternItemItem(document.getElementsByClassName("inventory-item")[1]);

       tituloCrystal.textContent = 'SYNTHESIZED WHITE CRYSTAL ';
       objetivoCrystal.textContent = '[SiO2] \n WARNING, ENERGY SUPPLY LOW. HYBERNATION MODE ACTIVATED.';
       objetivoCrystal.classList.add('text-crystal');
       tituloCrystal.classList.remove('warning-text-crystal');
        tituloCrystal.classList.add('text-crystal');
        const botonesDiv = document.getElementById('botones-crystal');
        botonesDiv.innerHTML = '';
        const imagen = document.createElement('img');
        const image_sol = document.createElement('img');

        //Imagen de solucion

        image_sol.src = '../resources/img/pistaCristalario.png';
        image_sol.alt = 'Crystalarium Clue';

        image_sol.classList.add("crystal-solved-img");

        // Añadir la imagen al div
        botonesDiv.appendChild(image_sol);
        const checkBtn = document.getElementById('checkBtn'); 
        if (checkBtn) {
        checkBtn.remove(); // Esto elimina el botón del DOM.
        }

    } else {
        tituloCrystal.textContent = 'ERROR: EXTREMELY VOLATILE CRYSTAL';
        tituloCrystal.classList.remove('text-crystal');
        tituloCrystal.classList.add('warning-text-crystal');
        
    }
    // Restablecer el grid sin borrarlo completamente, solo resetear los bordes
    let cuadros = document.querySelectorAll('.color-cuadro');
    cuadros.forEach(cuadro => {
        cuadro.style.border = 'none';
    });
}

function generarHexAleatorioCrystal() {
    // Establece el valor mínimo y máximo para cada componente
    const minComponent = 0x00; // Permite la completa gama desde el punto más oscuro
    const maxComponent = 0xDF; // Límite superior para evitar blancura

    // Genera cada componente dentro del rango permitido
    let red = Math.floor(Math.random() * (maxComponent - minComponent + 1)) + minComponent;
    let green = Math.floor(Math.random() * (maxComponent - minComponent + 1)) + minComponent;
    let blue = Math.floor(Math.random() * (maxComponent - minComponent + 1)) + minComponent;

    // Verifica si alguno de los componentes supera 150
    if (red > 150 || green > 150 || blue > 150) {
        // Elige aleatoriamente uno de los dos otros componentes para ser ajustado a 0
        let toZero = Math.floor(Math.random() * 3); // Genera un número entre 0 y 2
        if (toZero === 0) { // Ajusta el verde o azul
            if (red > 150) {
                green = 0;
                blue = Math.random() > 0.5 ? 0 : blue; // 50% de probabilidad de también poner azul a 0
            }
        } else if (toZero === 1) { // Ajusta el rojo o azul
            if (green > 150) {
                red = 0;
                blue = Math.random() > 0.5 ? 0 : blue; // 50% de probabilidad de también poner azul a 0
            }
        } else { // Ajusta el rojo o verde
            if (blue > 150) {
                red = 0;
                green = Math.random() > 0.5 ? 0 : green; // 50% de probabilidad de también poner verde a 0
            }
        }
    }

    // Convierte los valores a hexadecimal
    let hexRed = red.toString(16);
    let hexGreen = green.toString(16);
    let hexBlue = blue.toString(16);

    // Retorna el color en formato hexadecimal
    return '#' + hexRed.padStart(2, '0') + hexGreen.padStart(2, '0') + hexBlue.padStart(2, '0');
}



function invertColorCrystal(rgb) {
    // Extraer los valores de rojo, verde y azul del formato RGB
    const rgbParts = rgb.match(/\d+/g);

    // Invertir cada componente
    const r = 255 - parseInt(rgbParts[0], 10);
    const g = 255 - parseInt(rgbParts[1], 10);
    const b = 255 - parseInt(rgbParts[2], 10);

    // Volver a formar el color en formato RGB
    return `rgb(${r}, ${g}, ${b})`;
}

