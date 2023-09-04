class Image {
    constructor(title, description, tags, url, modal) {
        this.url = url;
        this.tags = tags;
        this.title = title;
        this.description = description;
        this.modal = modal;
        this.element = null;

        this.createElement();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'col-md-4 image-item ' + this.tags.join(' ');
        this.element.innerHTML = `
            <img src="${this.url}" alt="${this.title}">
            <div class="image-info">
                <h3>${this.title}</h3>
                <p>${this.description}</p>
            </div>
        `;

        this.element.addEventListener('click', () => {
            // Call the modal's show method
            // This could be replaced by a callback to a modal instance if needed
            // Example: this.showCallback(image);
            showModal();
        });
    }

    getElement() {
        return this.element;
    }

    showModal() {
        this.modal.showModal(this); // Use the injected modal instance
    }
}

export default Image;
