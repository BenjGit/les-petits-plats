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
        allUstensils = allUstensils.concat(recipe.ustensils.flat().map(item => item.toLowerCase()));
        allAppliances.push(recipe.appliance.toLowerCase()); 
    });


    allUstensils = [...new Set(allUstensils)];
    allIngredients = [...new Set(allIngredients)];
    allAppliances = [...new Set (allAppliances)];

    const ingredientsOption = new SortingOptions(allIngredients,"Ingrédients","filter-bar-ingredients");
    const ustensilsOption = new SortingOptions(allUstensils,"Ustensiles","filter-bar-ustensils");
    const appliancesOption = new SortingOptions(allAppliances,"Appareils","filter-bar-appliances");

    ingredientsOption.buttonsEventListeneners();
    ustensilsOption.buttonsEventListeneners();
    appliancesOption.buttonsEventListeneners();

    new SortingButtons();
    new RecipeCounter();

    return {
        getAllIngredients: () => allIngredients,
        getAllUstensils: () => allUstensils,
        getAllAppliances: () => allAppliances,
        setIngredients: (ingredients) => {
            allIngredients = ingredients;
        }
    };
}

// export function createButtons(ingredients){
//     new SortingOptions(ingredients,"Ingrédients","filter-bar-ingredients");
//     new SortingOptions(allUstensils,"Ustensiles","filter-bar-ustensils");
//     new SortingOptions(allAppliances,"Appareils","filter-bar-appliances");

//     new SortingButtons();
// }

// updateAllFilters(recipes);
// createButtons(allIngredients);