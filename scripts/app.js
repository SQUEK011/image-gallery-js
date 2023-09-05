class ImageGallery {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-button');
        this.modal = document.getElementById('modal');
        this.modalContent = document.createElement('div');
        this.modalContent.className = 'modal-content';
        this.modal.appendChild(this.modalContent);

        // Import the imageData from the JSON file
        fetch('../data/data.json')
            .then((response) => response.json())
            .then((data) => {
                this.imageData = data;
                this.initialize();
            })
            .catch((error) => {
                console.error('Error loading imageData:', error);
            });
    }

    initialize() {
        // Event listeners for filter buttons
        this.filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.populateGallery(filter);
            });
        });

        // Initial gallery population
        this.populateGallery('all');
    }

    populateGallery(filter) {
        const gallery = document.querySelector('#image-gallery');
        gallery.innerHTML = '';

        this.imageData.forEach((image) => {
            if (filter === 'all' || image.tags.includes(filter)) {
                const col = this.createImageElement(image);
                gallery.appendChild(col);
            }
        });

        // Remove the "active" class from all filter buttons
        this.filterButtons.forEach((button) => {
            button.classList.remove('active');
        });

        // Add the "active" class to the clicked filter button
        const activeButton = document.querySelector(`[data-filter="${filter}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
            activeButton.classList.add('btn-primary');
        }
    }

    createImageElement(image) {
        const col = document.createElement('div');
        col.className = 'col image-item mt-3 ' + image.tags.join(' ');

        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.title;

        img.addEventListener('click', () => {
            this.showModal(image);
        });

        col.appendChild(img);

        return col;
    }

    showModal(image) {
        this.modalContent.innerHTML = `
            <span class="close">&times;</span>
            <div class="image-container">
                <img src="${image.url}" alt="${image.title}" class="modal-image">
            </div>
            <div class="image-info text-center">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            </div>
        `;

        this.modal.style.display = 'block';

        // Close the modal when the 'x' is clicked
        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        // Close the modal when clicking outside the modal content
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });
    }
}

// Initialize the ImageGallery class when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ImageGallery();
});