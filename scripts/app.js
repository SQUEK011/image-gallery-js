//Centralized Codes here
// Get references to important elements
const filterButtons = document.querySelectorAll('.filter-button');
const modal = document.getElementById('modal');
const modalContent = document.createElement('div');
modalContent.className = 'modal-content';
modal.appendChild(modalContent);

// Sample image data (you can replace this with your actual data)
const imageData = [
    {
      title: "Image 1",
      description: "Description for Image 1.",
      tags: ["ai", "realistic"],
      url: "../assets/ai-image1.png",
    },
    // Add more image objects here...
    {
      title: "Image 2",
      description: "Description for Image 2.",
      tags: ["ai", "realistic"],
      url: "../assets/real-image1.png",
    },
    {
      title: "Image 3",
      description: "Description for Image 3.",
      tags: ["ai", "items"],
      url: "../assets/items-image1.png",
    },
    {
      title: "Image 4",
      description: "Description for Image 4.",
      tags: ["ai", "cars"],
      url: "../assets/cars-image1.png",
    },
  ];

// Function to populate the image gallery
function populateGallery(filter) {
    const gallery = document.querySelector('.row');
    gallery.innerHTML = '';

    imageData.forEach((image) => {
        if (filter === 'all' || image.tags.includes(filter)) {
            const col = document.createElement('div');
            col.className = 'col-md-4 image-item ' + image.tags.join(' ');
            col.innerHTML = `
                <img src="${image.url}" alt="${image.title}">
                <div class="image-info">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                </div>
            `;
            
            // Add click event to open modal
            col.addEventListener('click', () => {
                showModal(image);
            });

            gallery.appendChild(col);
        }
    });
}

// Function to show the modal with image details
function showModal(image) {
    modalContent.innerHTML = `
    <span class="close">&times;</span>
    <div class="image-container">
        <img src="${image.url}" alt="${image.title}" class="modal-image">
    </div>
    <div class="image-info">
        <h3>${image.title}</h3>
        <p>${image.description}</p>
    </div>
    `;

    modal.style.display = 'block';

    // Close the modal when the 'x' is clicked
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Event listeners for filter buttons
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        populateGallery(filter);
    });
});

// Initial gallery population
populateGallery('all');