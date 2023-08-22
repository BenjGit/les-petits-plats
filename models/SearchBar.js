import { recipes } from "../recipe.js";
import RecipeCard from "../templates/RecipeCard.js";
import SortingOptions from "../templates/SortingOptions.js";
import SortingButtons from "./SortingButtons.js";
import RecipeCounter from "./RecipeCounter.js";
import TagManager from "../templates/TagManager.js";
import normalize from "./Normalize.js";

export default class SearchBar{
    constructor(allIngredients,allUstensils,allAppliances){
        this.allIngredients = allIngredients;
        this.allUstensils = allUstensils;
        this.allAppliances = allAppliances;
        this.inputValue = document.getElementById('search-bar').value; // récupérer l'entrée de l'utilisateur
        this.input = document.getElementById('search-bar');
        this.search();
    }

    search(){
        this.input.addEventListener('input', () => {
            this.inputValue = normalize(this.input.value);
            if(this.inputValue.length >= 3){
                const matchingRecipeIds = [];
                recipes.forEach(recipe => {
                    const cardDescription = normalize(recipe.description);
                    const cardTitle = normalize(recipe.name);
                    const cardIngredients = recipe.ingredients.map(ingredient => normalize(ingredient.ingredient));
                    const cardContent = cardTitle + ',' + cardDescription + ',' + cardIngredients;
                    
                    const hasMatchingItems = cardContent.includes(normalize(this.inputValue));
                    
                    if (hasMatchingItems) {
                        matchingRecipeIds.push(recipe.id);
                    }
                    else{
                        console.log("Aucun élément trouvé");
                    }
                });
                this.updateCards(matchingRecipeIds);
               
                console.log(matchingRecipeIds);
            }
            else{
                console.log("Veuillez entrer plus de 3 caractères");
            }
        
        });
    }
    
    updateCards(matchingRecipeIds){
        const recipesContainer = document.querySelector('.card-container')
        recipesContainer.innerHTML = "";

        recipes.forEach(recipe => {
            if(matchingRecipeIds.includes(recipe.id)){
                const recipeTemplate = new RecipeCard(recipe);
                const recipeCardHtml = recipeTemplate.createRecipeCard();
                recipesContainer.appendChild(recipeCardHtml);
            }
        })

        // Mettre à jour les filtres 
        this.updateFilters(matchingRecipeIds);
    }

    updateFilters(matchingRecipeIds){
        const sortingButtons = document.querySelector('.sorting-buttons');
        sortingButtons.innerHTML = "";
        //récupérer seulement les recettes correspondantes à l'id de la recherche effectuée
        const matchingRecipes = recipes.filter(recipe => matchingRecipeIds.includes(recipe.id));

        this.allIngredients = [];
        this.allUstensils = [];
        this.allAppliances = [];

        matchingRecipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    this.allIngredients.push(ingredient.ingredient.toLowerCase());
                });
                this.allUstensils = this.allUstensils.concat(recipe.ustensils.flat());
                this.allAppliances.push(recipe.appliance);
        })

        this.allUstensils = [...new Set(this.allUstensils)];
        this.allIngredients = [...new Set(this.allIngredients)];
        this.allAppliances = [...new Set(this.allAppliances)];

        new SortingOptions(this.allIngredients,"Ingrédients");
        new SortingOptions(this.allUstensils, "Ustensiles");
        new SortingOptions(this.allAppliances, "Appareils");

        new SortingButtons();
        new RecipeCounter();
        new TagManager();
    }

}