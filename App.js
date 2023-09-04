import RecipeCard from "./templates/RecipeCard.js";
import { recipes } from "./recipe.js";
import updateAllFilters from "./templates/UpdateAllFilters.js";
import SearchBar from "./models/SearchBar.js";
import TagManager from "./templates/TagManager.js";

const recipesContainer = document.querySelector('.card-container')

recipes.forEach(recipe => {
    const recipeTemplate = new RecipeCard(recipe);
    const recipeCardHtml = recipeTemplate.createRecipeCard();
    recipesContainer.appendChild(recipeCardHtml);
});

new SearchBar();
updateAllFilters(recipes);
new TagManager();



