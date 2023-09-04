import normalize from "../models/Normalize.js";
import SortingButtons from "../models/SortingButtons.js";
import TagManager from "./TagManager.js";

export default class SortingOptions {
    constructor(items,label,filterBarId) {
        this.items = items
        this.label = label;
        this.filterBarId = filterBarId;
        this.sortingContainer = document.querySelector('.sorting-buttons');
        this.optionsContainer = document.createElement("ul");
        this.optionsContainer.setAttribute("class", "sorting-list");
        this.optionsContainer.setAttribute("role", "listbox");
        this.optionsContainer.setAttribute("data-filter-bar-id", this.filterBarId);
        this.createSortingOptions();
        this.searchInFilters();
    }

    createFilterBar() {
      const filterBarHtml = `
        <div class="filters-bar-container">
          <input type="text" class="filters-bar" id="${this.filterBarId}">
          <i class="filters-search-btn fa-solid fa-magnifying-glass"></i>
        </div>
      `;
      return filterBarHtml;
    }
    
    createOptions(items) {
      let optionsHtml = ''
      items.forEach((item) => {
        optionsHtml += `
          <li tabIndex="0" role="option">${item}</li>
        `;
      });
      return optionsHtml;
    }

    createSortingOptions(){
      const sortingOptions = `
          <div class="sorting-btn">
            <button tabIndex="0" class="sorting-button" aria-haspopup="listbox" aria-expanded="false">
                <span class="sorting-title">${this.label}</span>
                <i class="fa-solid fa-chevron-down"></i>
                
                <ul class="sorting-list" data-id="${this.filterBarId}">
                ${this.createFilterBar()}
                ${this.createOptions(this.items)}
                </ul>
            </button>
          </div>`;

      this.sortingContainer.innerHTML += sortingOptions
      return this.sortingContainer
    }

    searchInFilters() {
      const inputSearchBar = document.getElementById(this.filterBarId);
      const optionsContainer = document.querySelector(`ul[data-id="${this.filterBarId}"]`);

      const updateOptions = (newItems) => {
        // Supprimer les options existantes
        const options = optionsContainer.querySelectorAll("li[role='option']");
        options.forEach((option) => {
          option.remove();
        });

        // Ajouter les nouvelles options
        const newOptionsHTML = this.createOptions(newItems);
        optionsContainer.insertAdjacentHTML('beforeend', newOptionsHTML);
      };

      inputSearchBar.addEventListener('input', () => {
        const inputValue = normalize(inputSearchBar.value);
        if (inputValue.length >= 3) {
          const newItems = this.items.filter((item) => normalize(item).includes(inputValue));
          updateOptions(newItems);
        } else {
          updateOptions(this.items);
        }
      });
}

   

}