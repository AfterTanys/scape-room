document.addEventListener('DOMContentLoaded', (event) => {
    const hudHtml = `
        <div id="hud">
        <button id="optionsButton"></button>
            <button id="hintButton"></button>
            <button id="inventoryButton"></button>
        </div>
        <div id="dialogBox" class="hidden">
            <p id="dialogText">Texto del diálogo...</p>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', hudHtml);
});
function showDialog(text) {
    const dialogBox = document.getElementById('dialogBox');
    const dialogText = document.getElementById('dialogText');
    dialogText.textContent = text;
    dialogBox.classList.remove('hidden');
}

// Función para ocultar la caja de diálogo
function hideDialog() {
    const dialogBox = document.getElementById('dialogBox');
    dialogBox.classList.add('hidden');
}
document.getElementById('optionsButton').addEventListener('click', function() {
    showDialog("ESTO ES UNA PRUEBA");
    alert('Debug function...');
});