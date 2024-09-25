// Get the lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

// Add click event listener to all gallery images
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'flex'; // Show the lightbox
        lightboxImg.src = item.src; // Set the clicked image as the lightbox image
    });
});

// Close the lightbox when the close button is clicked
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close the lightbox when clicking outside the image
lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
