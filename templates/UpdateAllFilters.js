import { recipes } from "../Recipe.js";
import SortingButtons from "../models/SortingButtons.js";
import SortingOptions from "./SortingOptions.js";
import RecipeCounter from "../models/RecipeCounter.js";

export default function updateAllFilters(recipes) {
    let allIngredients = [];
    let allUstensils = [];
    let allAppliances = [];

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            allIngredients.push(ingredient.ingredient.toLowerCase());
        });
        allUstensils = allUstensils.concat(recipe.ustensils.flat());
        allAppliances.push(recipe.appliance); 
    });

    allUstensils = [...new Set(allUstensils)];
    allIngredients = [...new Set(allIngredients)];
    allAppliances = [...new Set (allAppliances)];

    new SortingOptions(allIngredients,"Ingrédients","filter-bar-ingredients");
    new SortingOptions(allUstensils,"Ustensiles","filter-bar-ustensils");
    new SortingOptions(allAppliances,"Appareils","filter-bar-appliances");

    new SortingButtons();
    new RecipeCounter();
}
