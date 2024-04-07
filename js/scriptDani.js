document.addEventListener('DOMContentLoaded', function() {
    const flashlight = document.getElementById('flashlight');
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    const text3 = document.getElementById('text3');
    const checkmark = document.getElementById('checkmark');
  
    const texts = [text1, text2, text3];
  
    texts.forEach(text => text.addEventListener('click', function() {
      checkmark.classList.remove('hidden');
    }));
  
    document.addEventListener('mousemove', function(event) {
      const x = event.clientX;
      const y = event.clientY;
  
      flashlight.style.left = `${x}px`;
      flashlight.style.top = `${y}px`;
  
      texts.forEach(text => {
        const textRect = text.getBoundingClientRect();
        const flashlightRect = flashlight.getBoundingClientRect();
  
        const relativeX = textRect.left - flashlightRect.left + textRect.width / 2;
        const relativeY = textRect.top - flashlightRect.top + textRect.height / 2;
  
        const dx = relativeX - flashlightRect.width / 2;
        const dy = relativeY - flashlightRect.height / 2;
  
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        const radius = Math.min(flashlightRect.width, flashlightRect.height) / 2;
  
        if (distance <= radius) {
          const clipRadius = radius - distance;
          text.style.clipPath = `circle(${clipRadius}px at ${relativeX}px ${relativeY}px)`;
          text.classList.remove('hidden');
        } else {
          text.classList.add('hidden');
        }
      });
    });
  });
  