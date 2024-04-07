document.addEventListener('DOMContentLoaded', function() {
    const slides = [
        { image: "../resources/img/intro1.webp", text: "loreipsumloreipsumloreipsumloreipsumloreipsumloreipsumloreipsumloreipsum" },
        { image: "../resources/img/intro2.webp", text: "Texto de introducción 2." },
        { image: "../resources/img/intro3.webp", text: "Texto de introducción 3." },
        { image: "../resources/img/intro4.webp", text: "Texto de introducción 4." },
    ];

    let currentSlide = 0;
    let textIndex = 0;
    let timeoutId = null;

    function updateBackgroundImage() {
        const backgroundImage = document.getElementById('backgroundImage');
        backgroundImage.src = slides[currentSlide].image;
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
            if (currentSlide >= slides.length) {
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

    
    