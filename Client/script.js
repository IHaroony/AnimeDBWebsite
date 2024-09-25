// Fetch data from the backend and hide all character cards initially
fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(data => {
        const characterContainer = document.getElementById('character-container');

        // Create and hide each character card
        data.forEach(character => {
            const characterCard = `
                <div class="character-card" style="display: none;">
                    <div class="character-info">
                        <h2>${character.name}</h2>
                    </div>
                    <div class="character-content" style="display: none;">
                        <p><strong>Abilities:</strong> ${character.abilities}</p>
                        <p><strong>Rivalries:</strong> ${character.rivalries}</p>
                        <p><strong>Friends:</strong> ${character.friends}</p>
                    </div>
                </div>
            `;
            characterContainer.innerHTML += characterCard;
        });

        // Add click event listener to each character card for expanding/collapsing
        const characterCards = document.querySelectorAll('.character-card');
        characterCards.forEach(card => {
            card.addEventListener('click', () => {
                const content = card.querySelector('.character-content');
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    card.classList.add('expanded');
                    card.animate([
                        { transform: 'scale(1)', opacity: 1 },
                        { transform: 'scale(1.05)', opacity: 0.9 },
                        { transform: 'scale(1)' }
                    ], {
                        duration: 500,
                        easing: 'ease-in-out',
                    });
                } else {
                    content.style.display = 'none';
                    card.classList.remove('expanded');
                }
            });
        });
    })
    .catch(error => {
        console.error('Error fetching characters:', error);
    });

// Search functionality for real-time filtering with "pop-in" animation
document.getElementById('search-bar').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const characterCards = document.querySelectorAll('.character-card');

    if (searchTerm.length >= 3) {
        let delay = 0;

        // Hide or show character cards based on search input
        characterCards.forEach(card => {
            const characterName = card.querySelector('h2').textContent.toLowerCase();

            if (characterName.includes(searchTerm)) {
                card.style.display = 'block';

                // Add staggered delay to each card
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, delay);

                delay += 150; // Increase delay for the next card
            } else {
                card.style.display = 'none';
                card.classList.remove('animate-in'); // Reset animation
            }
        });
    } else {
        characterCards.forEach(card => {
            card.style.display = 'none';
        });
    }
});
