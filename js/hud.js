document.addEventListener('DOMContentLoaded', (event) => {
    // Crear el contenedor HUD y sus botones
const hud = document.createElement('div');
hud.id = 'hud';

const optionsButton = document.createElement('div');
optionsButton.id = 'optionsButton';
optionsButton.className = 'hud-button';

const hintButton = document.createElement('div');
hintButton.id = 'hintButton';
hintButton.className = 'hud-button';

const inventoryButton = document.createElement('div');
inventoryButton.id = 'inventoryButton';
inventoryButton.className = 'hud-button';

// Añadir los botones al HUD
hud.appendChild(optionsButton);
hud.appendChild(hintButton);
hud.appendChild(inventoryButton);

// Crear el cuadro de diálogo
const dialogBox = document.createElement('div');
dialogBox.id = 'dialogBox';
dialogBox.className = 'hidden';

const speakerSprite = document.createElement('div');
speakerSprite.id = 'speakerSprite';
speakerSprite.className = 'hidden';

const speakerContainer = document.createElement('div');
speakerContainer.id = 'speakerContainer';

const speakerName = document.createElement('div');
speakerName.id = 'speakerName';
speakerName.textContent = 'Nombre...';

const dialogTextContainer = document.createElement('div');
dialogTextContainer.id = 'dialogTextContainer';

const dialogText = document.createElement('p');
dialogText.id = 'dialogText';
dialogText.textContent = 'Texto del diálogo...';

// Añadir elementos al cuadro de diálogo
speakerContainer.appendChild(speakerName);
dialogTextContainer.appendChild(dialogText);

dialogBox.appendChild(speakerSprite);
dialogBox.appendChild(speakerContainer);
dialogBox.appendChild(dialogTextContainer);

// Añadir HUD y cuadro de diálogo al cuerpo del documento
document.body.appendChild(hud);
document.body.appendChild(dialogBox);

    let activeDialog = false;

    function dialog(text, speakerName, speakerSpritePath){
        if(activeDialog == false){
            showDialog(text,speakerName,speakerSpritePath);
            overlay.classList.add('active');
        } else {
            hideDialog();
            overlay.classList.remove('active');
        }
    }
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
        activeDialog =true;
    }
    

    // Función para ocultar la caja de diálogo
    function hideDialog() {
        document.getElementById('dialogBox').classList.add('hidden');
        activeDialog =false;
    }
     
    // Ejemplo de dialogo (como se utiliza)
    // dialog("DIALOG", "NAME","../resources/sprites/ejemplo.jpg");

    // Añadir un controlador de eventos al botón de opciones
    document.getElementById('optionsButton').addEventListener('click', function() {
        
            dialog("DIALOG", "NAME","../resources/sprites/ejemplo.jpg");
        
       
       
    });

    // Aquí puedes añadir otros controladores de eventos y lógica adicional
    let activeInventory=false
    inventoryButton.addEventListener("click", ()=>{
        if(activeInventory==false){
            openInventory();
            activeInventory=true;
        }else{
            closeInventory();
            activeInventory=false;
        }
    });


    //Metodo provisional para borrar el inventario
    hintButton.addEventListener("click", ()=>{
        resetInventory();
    });

});
