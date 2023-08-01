export default class SortingOptions {
    constructor(items) {
        this.items = items;
        this.sortingContainer = document.querySelector('.sorting-buttons');
        this.optionsContainer = document.createElement("ul");
        this.optionsContainer.setAttribute("class", "sorting-list");
        this.optionsContainer.setAttribute("role", "listbox");
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

    createSortingOptions(appareilsOptions, ustensilsOptions, ingredientsOptions){

      const sortingOptions = `
          <div class="sorting-btn">
          <button tabIndex="0" class="sorting-button" aria-haspopup="listbox" aria-expanded="false">
              <span class="sorting-title">Ingrédients</span>
              <i class="fa-solid fa-chevron-down"></i>
              ${ingredientsOptions.render().outerHTML}
          </button>
          
          </div>
          <div class="sorting-btn">
          <button tabIndex="0" class="sorting-button" aria-haspopup="listbox" aria-expanded="false">
              <span class="sorting-title">Ustensiles</span>
              <i class="fa-solid fa-chevron-down"></i>
              ${ustensilsOptions.render().outerHTML}
          </button>
          
          </div>
          <div class="sorting-btn">
          <button tabIndex="0" class="sorting-button" aria-haspopup="listbox" aria-expanded="false">
              <span class="sorting-title">Appareils</span>
              <i class="fa-solid fa-chevron-down"></i>
              ${appareilsOptions.render().outerHTML}
          </button>
          
          </div>
      `;
      this.sortingContainer.innerHTML = sortingOptions 
      return this.sortingContainer
    }
    

}