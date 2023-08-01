import RecipeCard from "./templates/RecipeCard.js";
import { recipes } from "./recipe.js";
import SortingOptions from "./templates/SortingOptions.js";
import SortingButtons from "./utils/sortingButtons.js";


const recipesContainer = document.querySelector('.card-container')
const sortingContainer = document.querySelector('.sorting-filters')



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

const ingredientsOptions = new SortingOptions(allIngredients);
const ustensilsOptions = new SortingOptions(allUstensils);
const appareilsOptions = new SortingOptions(allAppliances);

sortingContainer.appendChild(ingredientsOptions.createSortingOptions(appareilsOptions, ustensilsOptions, ingredientsOptions));
sortingContainer.appendChild(ustensilsOptions.createSortingOptions(appareilsOptions, ustensilsOptions, ingredientsOptions));
sortingContainer.appendChild(appareilsOptions.createSortingOptions(appareilsOptions, ustensilsOptions, ingredientsOptions));

new SortingButtons();




