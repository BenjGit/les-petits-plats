import { recipes } from "../recipe.js";
import RecipeCard from "../templates/RecipeCard.js";
import SortingOptions from "../templates/SortingOptions.js";
import SortingButtons from "./SortingButtons.js";

export default class SearchBar{
    constructor(){
        this.inputValue = document.getElementById('search-bar').value; // récupérer l'entrée de l'utilisateur
        this.input = document.getElementById('search-bar');
        this.search();
    }

    normalize(str) {
        const map = {
            'a': 'á|à|ã|â|À|Á|Ã|Â',
            'e': 'é|è|ê|É|È|Ê',
            'i': 'í|ì|î|Í|Ì|Î',
            'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
            'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            'c': 'ç|Ç',
            'n': 'ñ|Ñ'
        };

        for (let pattern in map) {
            str = str.replace(new RegExp(map[pattern], 'g'), pattern);
        };

        return str.toLowerCase();
    }

    search(){
        this.input.addEventListener('input', () => {
            this.inputValue = this.normalize(this.input.value);
            if(this.inputValue.length >= 3){
                const matchingRecipeIds = [];
                recipes.forEach(recipe => {
                    const cardDescription = this.normalize(recipe.description);
                    const cardTitle = this.normalize(recipe.name);
                    const cardIngredients = recipe.ingredients.map(ingredient => this.normalize(ingredient.ingredient));
                    const cardContent = cardTitle + ',' + cardDescription + ',' + cardIngredients;
                    
                    console.log(cardContent);
                    const hasMatchingItems = cardContent.includes(this.normalize(this.inputValue));
                    
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

        const matchingRecipes = recipes.filter(recipe => matchingRecipeIds.includes(recipe.id));//récupérer seulement les recettes correspondantes à l'id de la recherche effeectuée

        let updatedIngredients = [];
        let updatedUstensils = [];
        let updatedAppliances = [];

        matchingRecipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    updatedIngredients.push(ingredient.ingredient.toLowerCase());
                });
                updatedUstensils = updatedUstensils.concat(recipe.ustensils.flat());
                updatedAppliances.push(recipe.appliance);
        })

        updatedUstensils = [...new Set( updatedUstensils)];
        updatedIngredients = [...new Set( updatedIngredients)];
        updatedAppliances = [...new Set ( updatedAppliances)];

        new SortingOptions(updatedIngredients,"Ingrédients");
        new SortingOptions(updatedUstensils,"Ustensiles");
        new SortingOptions(updatedAppliances,"Appareils");

        new SortingButtons();
    }

}