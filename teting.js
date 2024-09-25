// JavaScript to handle flipping on click
const flipCards = document.querySelectorAll('.timeline-item');

flipCards.forEach(card => {
    card.addEventListener('click', () => {
        const flipCardInner = card.querySelector('.flip-card-inner');
        flipCardInner.classList.toggle('flipped');
    });
});
