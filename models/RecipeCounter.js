export default class RecipeCounter{
    constructor(){
       this.recipes = document.querySelector('.sorting-total');
       this.nbRecipes = document.querySelectorAll('.card').length;
    
       this.recipes.innerHTML = this.nbRecipes + " recettes";
    }
}