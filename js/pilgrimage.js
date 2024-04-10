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

    function updateBlurredBackground(imageSrc) {
        const blurryBackground = document.getElementById('blurryBackground');
        
        blurryBackground.style.backgroundImage = `url(${imageSrc})`;
        blurryBackground.style.backgroundSize = 'cover';
        blurryBackground.style.backgroundPosition = 'center center';
      }
      
     
      
      function updateBackgroundImage() {
        const backgroundImage = document.getElementById('backgroundImage');
        backgroundImage.src = slides[currentSlide].image;
        updateBlurredBackground(slides[currentSlide].image); // Actualiza el fondo borroso
        document.getElementById('dialogBox').style.display = 'block';
        document.getElementById('dialogText').textContent = '';
        textIndex = 0;
      }

    function typeWriter() {
        if (textIndex < slides[currentSlide].text.length) {
            document.getElementById('dialogText').textContent += slides[currentSlide].text.charAt(textIndex);
            textIndex++;
            timeoutId = setTimeout(typeWriter, 50);
        }
    }

    document.getElementById('nextArrow').addEventListener('click', function() {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            document.getElementById('dialogText').textContent = slides[currentSlide].text;
            timeoutId = null;
            textIndex = 0;
            currentSlide++;
            if (currentSlide >= slides.length+1) {
                window.location.href = "room1.html";
            }
            return;
        }

        if (currentSlide < slides.length) {
            updateBackgroundImage();
            typeWriter();
        } else {
            window.location.href = "room1.html";
        }
    });

    // Inicializar con la primera imagen
    updateBackgroundImage();
});

document.getElementById('startButton').addEventListener('click', function() {
    window.location.href = 'cinematic.html'; // Redirige a cinematic.html
});
