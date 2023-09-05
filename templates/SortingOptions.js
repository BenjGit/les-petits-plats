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
        this.searchButtons = document.querySelectorAll('.filters-search-btn');
        this.createSortingOptions();
    }

    createFilterBar() {
      const filterBarHtml = `
        <div class="filters-bar-container">
          <input type="text" class="filters-bar" id="${this.filterBarId}"><i class="clear-filter-button fa-solid fa-xmark" data-id="${this.filterBarId}"></i>
          <i class="filters-search-btn fa-solid fa-magnifying-glass" data-id="${this.filterBarId}"></i>
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
      const inputValue = normalize(inputSearchBar.value);
      
      const userInput = inputValue;
      const regex = /^[a-zA-Z\s]+$/; // Expression régulière pour vérifier les lettres et espaces
      
        if (!regex.test(userInput)) {
          console.log("L'entrée contient des caractères non autorisés.");
          return;
        }
          
        if (inputValue.length >= 3) {
          const newItems = this.items.filter((item) => normalize(item).includes(inputValue));
          this.updateOptions(newItems);
        } 
        else {
          this.updateOptions(this.items);
        }
    }
  
    updateOptions (newItems){
      // Supprimer les options existantes
      const optionsContainer = document.querySelector(`ul[data-id="${this.filterBarId}"]`);
      const options = optionsContainer.querySelectorAll("li[role='option']");
      
      options.forEach((option) => {
        option.remove();
      });

      // Ajouter les nouvelles options
      const newOptionsHTML = this.createOptions(newItems);
      optionsContainer.insertAdjacentHTML('beforeend', newOptionsHTML);
      new TagManager();
    };

    buttonsEventListeneners(){
      const inputSearchBar = document.getElementById(this.filterBarId);
      const searchButton = document.querySelector(`.filters-search-btn[data-id="${this.filterBarId}"]`);;
      const clearFilterButton = document.querySelector(`.clear-filter-button[data-id="${this.filterBarId}"]`)
      
      clearFilterButton.style.visibility = 'hidden';
      searchButton.addEventListener('click', () => {
          this.searchInFilters();
        });

      inputSearchBar.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          this.searchInFilters();
        }
      })

      inputSearchBar.addEventListener('input', () => {
        if ( inputSearchBar.value.length > 0) {
          clearFilterButton.style.visibility = 'visible';
        }
        else {
          clearFilterButton.style.visibility = 'hidden';
          this.updateOptions(this.items);
        }
      });

      clearFilterButton.addEventListener('click', () => {
        inputSearchBar.value = '';
        clearFilterButton.style.visibility = 'hidden';
        this.updateOptions(this.items);
      });

    }
   

}