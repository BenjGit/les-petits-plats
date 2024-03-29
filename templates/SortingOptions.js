export default class SortingOptions {
    constructor(items,label) {
        this.items = items;
        this.label = label;
        this.sortingContainer = document.querySelector('.sorting-buttons');
        this.optionsContainer = document.createElement("ul");
        this.optionsContainer.setAttribute("class", "sorting-list");
        this.optionsContainer.setAttribute("role", "listbox");
        this.createSortingOptions();
    }

    createOptions() {
      let optionsHtml = '';
      this.items.forEach((item) => {
        optionsHtml += `
          <li tabIndex="0" role="option">${item}</li>
        `;
      });
      return optionsHtml;
    }

    render() {
      this.optionsContainer.innerHTML = this.createOptions();
      return this.optionsContainer;
    }

    createSortingOptions(){

      const sortingOptions = `
          <div class="sorting-btn">
            <button tabIndex="0" class="sorting-button" aria-haspopup="listbox" aria-expanded="false">
                <span class="sorting-title">${this.label}</span>
                <i class="fa-solid fa-chevron-down"></i>
                ${this.render().outerHTML}
            </button>
          </div>`;

      this.sortingContainer.innerHTML += sortingOptions 
      return this.sortingContainer
    }
    

}