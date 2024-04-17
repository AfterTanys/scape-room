document.addEventListener('DOMContentLoaded', function() {
    const slides = [
        { 
            image: "../resources/img/intro1.webp", 
            text: "As the cataclysm claimed more lives, the need for salvation grew ever more desperate.\nWithout guidance from the savior of humanity, the Beacon Bearers found themselves compelled to seek answers on their own."
        },
        { 
            image: "../resources/img/intro2.webp", 
            text: "The last city of mankind decided it was time for an all-or-nothing gambit; they formed a group of their finest to gather fragments of the past that could save the future.\nTen were chosen to comprise the Final Squadron."
        },
        { 
            image: "../resources/img/intro3.webp", 
            text: "After years of relentless search, they pieced the puzzle together.\nAll clues led to one place: a sealed door in the depths of the ruins of a ship that once belonged to their God."
        },
        { 
            image: "../resources/img/intro4.webp", 
            text: "Their actions had not gone unnoticed.\nTime was of the essence, and the threat that nearly extinguished all life in the solar system, the Hostage, had pinpointed their location and deciphered their intentions.\nNow, the Final Squadron races against time to achieve their goal before the darkness looms over all once again."
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

    function updateBackground(imageSrc) {
       
        blurryBackground.style.backgroundImage = `url(${imageSrc})`;
        centerImage.style.backgroundImage = `url(${imageSrc})`;
       
    }

    function updateSlide() {
        updateBackground(slides[currentSlide].image);
        cinematicDialogBox.classList.remove('hidden');
        cinematicdialogText.textContent = '';
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
            if (currentSlide < slides.length) {
                updateSlide();
            } else {
                window.location.href = "room1.html"; // Redirige si es la última diapositiva
            }
        }
    });
   
        
    updateSlide(); // Inicializar con la primera diapositiva
});