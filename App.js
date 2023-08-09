import RecipeCard from "./templates/RecipeCard.js";
import { recipes } from "./recipe.js";
import SortingOptions from "./templates/SortingOptions.js";
import SortingButtons from "./utils/SortingButtons.js";
import SearchBar from "./utils/SearchBar.js";

const recipesContainer = document.querySelector('.card-container')

let allIngredients = [];
let allUstensils = [];
let allAppliances = [];

recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
        allIngredients.push(ingredient.ingredient.toLowerCase());
    });
    allUstensils = allUstensils.concat(recipe.ustensils.flat());
    allAppliances.push(recipe.appliance); 

    const recipeTemplate = new RecipeCard(recipe);
    const recipeCardHtml = recipeTemplate.createRecipeCard();
    recipesContainer.appendChild(recipeCardHtml);
});

allUstensils = [...new Set(allUstensils)];
allIngredients = [...new Set(allIngredients)];
allAppliances = [...new Set (allAppliances)];

new SearchBar();

new SortingOptions(allIngredients,"Ingrédients");
new SortingOptions(allUstensils,"Ustensiles");
new SortingOptions(allAppliances,"Appareils");

new SortingButtons();




