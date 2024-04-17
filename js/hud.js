document.addEventListener('DOMContentLoaded', (event) => {
    // Inyecta el HTML del HUD y la caja de diálogo en el cuerpo del documento
    const hudHtml = `
    <div id="hud">
    <div id="optionsButton" class="hud-button"></div>
    <div id="hintButton" class="hud-button"></div>
    <div id="inventoryButton" class="hud-button"></div>
</div>
<div id="dialogBox" class="hidden">
    <div id="speakerSprite" class="hidden"></div>
    <div id="speakerContainer">
        <div id="speakerName">Nombre...</div>
    </div>
    <div id="dialogTextContainer">
        <p id="dialogText">Texto del diálogo...</p>
    </div>
</div
    `;
    document.body.insertAdjacentHTML('afterbegin', hudHtml);

    // Ahora que el HTML está inyectado, los elementos están disponibles para interactuar
    // Función para mostrar la caja de diálogo
    function showDialog(text, speakerName, speakerSpritePath) {
        const dialogBox = document.getElementById('dialogBox');
        const dialogText = document.getElementById('dialogText');
        const speakerNameElement = document.getElementById('speakerName');
        const speakerSprite = document.getElementById('speakerSprite');
    
        dialogText.textContent = text;
        speakerNameElement.textContent = speakerName;
        
        // Verifica si se ha proporcionado una ruta de imagen y actualiza el src del sprite
        if (speakerSpritePath) {
            speakerSprite.style.backgroundImage = `url('${speakerSpritePath}')`;
            speakerSprite.classList.remove('hidden');
        } else {
            speakerSprite.classList.add('hidden');
        }
    
        dialogBox.classList.remove('hidden');
    }
    

    // Función para ocultar la caja de diálogo
    function hideDialog() {
        const dialogBox = document.getElementById('dialogBox');
        dialogBox.classList.add('hidden');
    }

    // Añadir un controlador de eventos al botón de opciones
    document.getElementById('optionsButton').addEventListener('click', function() {
        showDialog("Escucha. La muerte es la parte final de la vida y la vida es aprender a morir. La canción es lo mismo que el cantar. La última verdad me ordena devorar toda la luz en el cielo. Seré eterno. Comprenderé.", "Horacio, Rey de los Montacargas Certificados","../resources/sprites/Horacio.png");
       
    });

    // Aquí puedes añadir otros controladores de eventos y lógica adicional
});