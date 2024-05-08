document.addEventListener('DOMContentLoaded', function() {
    // You might want to add some interactivity after the credits finish
    const credits = document.querySelector('.credits-container');
    credits.addEventListener('animationend', () => {
        window.location.href = '../index.html';
    });
});
