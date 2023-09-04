class Filter {
  constructor(modal) {
    this.filterButtons = document.querySelectorAll(".filter-button");
    this.modal = modal;

    this.filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filterValue = button.getAttribute("data-filter");
        this.applyFilter(filterValue);
      });
    });
  }

  applyFilter(filter) {
    // Validate that filterValue is a valid option (e.g., one of the predefined tags)
    const validFilters = ["all", "realistic", "items", "cars", "ai"];

    if (!validFilters.includes(filter)) {
      // Display an error message or provide feedback to the user
      alert("Invalid filter option. Please select a valid filter.");
      return;
    }

    const gallery = document.querySelector(".row");
    gallery.innerHTML = "";

    imageData.forEach((image) => {
      if (filter === "all" || image.tags.includes(filter)) {
        const col = document.createElement("div");
        col.className = "col-md-4 image-item " + image.tags.join(" ");
        col.innerHTML = `
                    <img src="${image.url}" alt="${image.title}">
                    <div class="image-info">
                        <h3>${image.title}</h3>
                        <p>${image.description}</p>
                    </div>
                `;

        col.addEventListener("click", () => {
          this.modal.showModal(image);
        });

        gallery.appendChild(col);
      }
    });
  }
}

export default Filter;
