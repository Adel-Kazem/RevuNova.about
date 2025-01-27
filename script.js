function initializeCards() {
    const cards = document.querySelectorAll('.falling-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: Array.from({length: 101}, (_, i) => i / 100)
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const ratio = entry.intersectionRatio; // Visibility ratio
            if (ratio > 0) {
                // Element is in view, move to original position
                entry.target.style.transform = `translateZ(0) translateY(${(1 - ratio) * -200}px)`;
                entry.target.style.opacity = `${ratio}`;
            } else {
                // Element is out of view, move upwards and fade out
                entry.target.style.transform = `translateZ(300px) translateY(-200px)`;
                entry.target.style.opacity = '0';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
}

window.addEventListener('load', () => {
    initializeCards();
});
