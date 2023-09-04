class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.modalContent = document.createElement('div');
        this.modalContent.className = 'modal-content';
        this.modal.appendChild(this.modalContent);
    }

    initializeEventListeners() {
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
    showModal(image) {
        this.modalContent.innerHTML = `
            <span class="close">&times;</span>
            <img src="${image.url}" alt="${image.title}">
            <div class="image-info">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            </div>
        `;

        this.modal.style.display = 'block';

        // Initialize event listeners after content is added to the DOM
        this.initializeEventListeners();
    }
}

export default Modal;
