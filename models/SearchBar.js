import { recipes } from "../Recipe.js";
import RecipeCard from "../templates/RecipeCard.js";
import SortingOptions from "../templates/SortingOptions.js";
import SortingButtons from "./SortingButtons.js";
import RecipeCounter from "./RecipeCounter.js";
import TagManager from "../templates/TagManager.js";
import normalize from "./Normalize.js";
import updateAllFilters from "../templates/UpdateAllFilters.js";

export default class SearchBar {
    constructor() {
        this.inputValue = document.getElementById('search-bar').value;
        this.input = document.getElementById('search-bar');
        this.button = document.querySelector('.search-button');
        this.clearButton = document.querySelector('.clear-button');
        this.clearButton.style.visibility = 'hidden';
        this.originalRecipes = [...recipes];
        this.buttonsEventListeners();
    }

    search() {
        this.inputValue = normalize(this.input.value);
        const userInput = this.inputValue;
        const regex = /^[a-zA-Z\s]+$/; // Expression régulière pour vérifier les lettres et espaces
      
        if (!regex.test(userInput)) {
          console.log("L'entrée contient des caractères non autorisés.");
          return;
        }
        
        if (this.inputValue.length >= 3) {
            const matchingRecipeIds = [];
            for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const cardDescription = normalize(recipe.description);
            const cardTitle = normalize(recipe.name);
            const cardIngredients = recipe.ingredients.map(ingredient => normalize(ingredient.ingredient));
            const cardContent = cardTitle + ',' + cardDescription + ',' + cardIngredients;

            const hasMatchingItems = cardContent.includes(normalize(this.inputValue));

            if (hasMatchingItems) {
                matchingRecipeIds.push(recipe.id);
            } else {
                console.log("Aucun élément trouvé");
            }
            }
            this.updateCards(matchingRecipeIds);

            console.log(matchingRecipeIds);
        } 
        else {
            console.log("Veuillez entrer plus de 3 caractères");
        }
    }

    updateCards(matchingRecipeIds) {
        const recipesContainer = document.querySelector('.card-container');
        recipesContainer.innerHTML = '';

        for (let i = 0; i < this.originalRecipes.length; i++) {
            const recipe = this.originalRecipes[i];
            if (matchingRecipeIds.includes(recipe.id)) {
                const recipeTemplate = new RecipeCard(recipe);
                const recipeCardHtml = recipeTemplate.createRecipeCard();
                recipesContainer.appendChild(recipeCardHtml);
            }
        }

        this.updateFilters(matchingRecipeIds);
    }

    updateFilters(matchingRecipeIds) {
        const sortingButtons = document.querySelector('.sorting-buttons');
        sortingButtons.innerHTML = '';

        const matchingRecipes = [];
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            if (matchingRecipeIds.includes(recipe.id)) {
                matchingRecipes.push(recipe);
            }
        }

        updateAllFilters(matchingRecipes);
        new TagManager();
    }

    buttonsEventListeners() {
        this.button.addEventListener('click', () => {
            this.search();
        });

        this.input.addEventListener('keydown', (event) => {
            if (event.keyCode === 13) {
            this.search();
            }
        });

        this.input.addEventListener('input', () => {
            if (this.input.value.length > 0) {
            this.clearButton.style.visibility = 'visible';
            } else {
            this.clearButton.style.visibility = 'hidden';
            this.updateCards(recipes.map(recipe => recipe.id));
            }
        });

        this.clearButton.addEventListener('click', () => {
            this.input.value = '';
            this.clearButton.style.visibility = 'hidden';
            this.updateCards(recipes.map(recipe => recipe.id));
        });
    }
}