export default class SortingButtons{
    constructor(){
        this.sortingButton = document.querySelector('.sorting-button');
        this.sortingList = document.querySelector('.sorting-list');

        const sortingButtons = document.querySelectorAll('.sorting-button');

        // Ajouter un gestionnaire d'événements à chaque bouton
        sortingButtons.forEach(button => {
            const sortingList = button.querySelector('.sorting-list');
            button.addEventListener('click', () => {
                this.expanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', !this.expanded);
                sortingList.classList.toggle('sorting-list--visible');
            });
        });
    }
}