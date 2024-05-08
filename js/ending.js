document.addEventListener('DOMContentLoaded', function() {
    
    const slides = [
        { 
            text: "When the dust settled, I was dazzled by an eerie, whitish light.\nAs my eyes adjusted to the new lighting, I felt an unnatural chill emanating from inside the chamber.\nContained within a glass cylinder, there was an indescribable, twisted figure."
        },
        { 
            text: "at first, its outstretched wings and rigid posture reminded me of an angel, but its true features struck my mind and turned my stomach.\nNo living being was ready to meet God, and before I could wonder if we had erred, I heard its voice in my head: 'Fear not.'\nIt was already too late for us all, the glass of the container shattered,"
        }, 
        {
            text: "AND WITH IT, MY SANITY."
        }
        
    ];
    let currentSlide = 0;
    let textIndex = 0;
    let timeoutId = null;
    let isTypingComplete = false; // Nuevo indicador para completar la animación

    const blurryBackground = document.getElementById('blurryBackground');
    const centerImage = document.getElementById('centerImage');
    const cinematicDialogBox = document.getElementById('cinematicDialogBox');
    const cinematicdialogText = document.getElementById('cinematicdialogText');
    const nextArrow = document.getElementById('cinematicNextArrow');

   
    function updateSlide() {
        cinematicDialogBox.classList.remove('hidden');
        cinematicdialogText.textContent = '';
        centerImage.style.backgroundImage = `url(../resources/img/Ending.png)`;
        blurryBackground.style.backgroundImage = `url(../resources/img/Ending.png)`;
        textIndex = 0;
        isTypingComplete = false; // Restablecer la bandera cuando se actualiza el slide
        typeWriter();
    }

    function typeWriter() {
        if (textIndex < slides[currentSlide].text.length) {
            cinematicdialogText.textContent += slides[currentSlide].text.charAt(textIndex);
            textIndex++;
            timeoutId = setTimeout(typeWriter, 50);
        } else {
            isTypingComplete = true; // Marcar la animación como completa
        }
    }

    nextArrow.addEventListener('click', function() {
        if (!isTypingComplete) {
            // Si la animación aún no está completa, la terminamos inmediatamente
            clearTimeout(timeoutId);
            cinematicdialogText.textContent = slides[currentSlide].text;
            isTypingComplete = true; // Actualizar la bandera
            timeoutId = null;
        } else {
            // Si la animación está completa, avanzamos al siguiente slide
            currentSlide++;
            if (currentSlide < slides.length-1) {
                updateSlide();
            }else if(currentSlide == 2){
                updateSlide();
                finalText();
            } else {
                //window.location.href = "../index.html";
                window.location.href = "Credits.html"; // Redirige si es la última diapositiva
            }
        }
    });
   function finalText(){
    centerImage.style.backgroundImage = '';
    blurryBackground.style.backgroundImage = '';
    document.body.style.textAlign = "center";       
    document.body.style.fontSize = "2rem";        
    document.body.style.fontWeight = "bold";  
    cinematicDialogBox.style.backgroundImage= 'url(../resources/dialogBox/CardX4.png)';
    cinematicDialogBox.style.bottom= '50%';
    cinematicDialogBox.style.left= '61%';
    nextArrow.style.bottom='53.1%';
    nextArrow.style.right='38%';
   }
        
    updateSlide(); 
});