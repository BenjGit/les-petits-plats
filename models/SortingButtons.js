export default class SortingButtons{
    constructor(){
        this.sortingButtons = document.querySelectorAll('.sorting-button');
        this.sortingList = document.querySelector('.sorting-list');
        this.buttonsInteraction();
    }

    buttonsInteraction(){
        this.sortingButtons.forEach(button => {
            const sortingList = button.querySelector('.sorting-list');
            const currentArrow = button.querySelector('.fa-solid.fa-chevron-down');
            const searchBars = document.querySelectorAll('.filters-bar');
            button.addEventListener('click', () => {
                this.expanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', !this.expanded);
                sortingList.classList.toggle('sorting-list--visible');
                currentArrow.classList.toggle('fa-chevron-down');
                currentArrow.classList.toggle('fa-chevron-up');
                button.classList.toggle('active');
            });
            searchBars.forEach(searchBar => {
                searchBar.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
            });
        });
    }

}
