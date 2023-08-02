import SortingOptions from "./SortingOptions.js";

export default class RecipeCard{
    constructor(recipe){
        this.recipe = recipe;
        this.card = document.createElement('div');
        this.card.setAttribute('class', 'card');
    }

    createIngredients() {
        let ingredientsHtml = '';
        this.recipe.ingredients.forEach(ingredient => {
            ingredientsHtml += `
                <div class="card-ingredients">
                    <span class="card-txt">${ingredient.ingredient}</span>
                    <span class="card-dose">${ingredient.quantity ? ingredient.quantity + (ingredient.unit || '') : ''}</span>
                </div>
            `;
        });
        return ingredientsHtml
    }

    createRecipeCard() {
        const recipeCard = `
            <div class="card-header">
                <img src="images/${this.recipe.image}" alt="photo de ${this.recipe.name}">
                <span class="prep-time">${this.recipe.time}min</span>
            </div>
            <div class="card-body">
                <h2 class="card-title">${this.recipe.name}</h2>
                <h3 class="card-subtitle">RECETTE</h3>
                <div class="card-recipe">
                    <span class="card-txt">
                        ${this.recipe.description}
                    </span>
                </div>
                <h3 class="card-subtitle">INGRÉDIENTS</h3>
                <div class="card-ingredients-container">
                    ${this.createIngredients()}
                </div>
            </div>
        `;

        this.card.innerHTML = recipeCard
        return  this.card
    }
}