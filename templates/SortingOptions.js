export default class SortingOptions {
    constructor(items,label) {
        this.items = items;
        this.label = label;
        this.sortingContainer = document.querySelector('.sorting-buttons');
        this.optionsContainer = document.createElement("ul");
        this.optionsContainer.setAttribute("class", "sorting-list");
        this.optionsContainer.setAttribute("role", "listbox");
        this.createSortingOptions();
        this.addOptionClickHandlers();
    }

    createOptions() {
      let optionsHtml = '';
      optionsHtml+= `<div class="filters-bar-container"><input type="text" class="filters-bar">
      <i class="filters-search-btn fa-solid fa-magnifying-glass"></i></div>`
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

    addOptionClickHandlers() {
      const options = document.querySelectorAll("li[role='option']");
      
      options.forEach((option) => {
        option.addEventListener('click', () => {
          const selectedText = option.textContent;
          this.addTag(selectedText);
        });
      });
    }
  
    addTag(text) {
      const tagList = document.querySelector('.tag-list');
      console.log(`Tag ajouté : ${text}`);

      const existingTags = Array.from(tagList.querySelectorAll('.tag'));
      const isDuplicate = existingTags.some((tag) => tag.textContent === text);

      if (isDuplicate) {
        console.log(`Le tag "${text}" existe déjà.`);
        return;
      }

      const tag = document.createElement('div');
      const tagText = document.createElement('span');
      const closeBtn = document.createElement('span');
      const closeIcon = document.createElement('i');

      tagText.setAttribute('class', 'tag-text');
      tag.setAttribute('class', 'tag');
      closeBtn.setAttribute('class', 'close-btn');
      closeIcon.classList.add('fa-solid', 'fa-xmark');
      
      tagText.textContent = text;

      closeBtn.appendChild(closeIcon);
      tag.appendChild(tagText);
      tag.appendChild(closeBtn);
      tagList.appendChild(tag);
    }

}