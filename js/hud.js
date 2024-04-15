document.addEventListener('DOMContentLoaded', (event) => {
    const hudHtml = `
        <div id="hud">
            <button id="hintButton"></button>
            <button id="inventoryButton"></button>
        </div>
        <div id="dialogBox" class="hidden">
            <p id="dialogText">Texto del diálogo...</p>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', hudHtml);
   