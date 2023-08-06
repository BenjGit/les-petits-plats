import RecipeCard from "./templates/RecipeCard.js";
import { recipes } from "./recipe.js";
import SortingOptions from "./templates/SortingOptions.js";
import SortingButtons from "./utils/sortingButtons.js";
import SearchBar from "./utils/SearchBar.js";

const recipesContainer = document.querySelector('.card-container')
const sortingContainer = document.querySelector('.sorting-filters')

let allIngredients = [];
let allUstensils = [];
let allAppliances = [];
let allDescription = [];
let allTitles = [];
let allItems = [];

recipes.forEach(recipe => {
    allDescription += recipe.description.replace(/[,\.]/g, '') + ','; // enlever les virgule et les points
    allTitles += recipe.name + ',';
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
allItems = allIngredients + ',' + allDescription + ',' + allTitles;
console.log(allItems);


new SearchBar(allItems.split(','));
new SortingOptions(allIngredients,"Ingrédients");
new SortingOptions(allUstensils,"Ustensiles");
new SortingOptions(allAppliances,"Appareils");

new SortingButtons();




