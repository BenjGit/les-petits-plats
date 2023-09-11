import { recipes } from "../Recipe.js";
import RecipeCard from "../templates/RecipeCard.js";
import TagManager from "../templates/TagManager.js";
import normalize from "./Normalize.js";
import updateAllFilters from "../templates/UpdateAllFilters.js";

export default class SearchBar{
    constructor(){
        this.inputValue = document.getElementById('search-bar').value; // récupérer l'entrée de l'utilisateur
        this.input = document.getElementById('search-bar');
        this.button = document.querySelector('.search-button');
        this.clearButton = document.querySelector('.clear-button');
        this.clearButton.style.visibility = 'hidden';
        this.originalRecipes = [...recipes];
        this.buttonsEventListerners();
    }

    search(){
        //Eviter les injections sql en enlevant la possibilité de mettre des chiffres et des caractères spéciaux
        this.inputValue = normalize(this.input.value);
        const userInput = this.inputValue;
        const regex = /^[a-zA-Z\s]+$/; // regex pour vérifier les lettres et espaces

        if (!regex.test(userInput)) {
            console.log("L'entrée contient des caractères non autorisés.");
            return;
        }
        
        if(this.inputValue.length >= 3 ){
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
    
    }
    
    updateCards(matchingRecipeIds) {
        const recipesContainer = document.querySelector('.card-container');
        recipesContainer.innerHTML = '';
      
        this.originalRecipes.forEach(recipe => {
          if (matchingRecipeIds.includes(recipe.id)) {
            const recipeTemplate = new RecipeCard(recipe);
            const recipeCardHtml = recipeTemplate.createRecipeCard();
            recipesContainer.appendChild(recipeCardHtml);
          }
        });
      
        // Mettre à jour les filtres
        this.updateFilters(matchingRecipeIds);
      }

    updateFilters(matchingRecipeIds){
        const sortingButtons = document.querySelector('.sorting-buttons');
        sortingButtons.innerHTML = "";
        //récupérer seulement les recettes correspondantes à l'id de la recherche effectuée
        const matchingRecipes = recipes.filter(recipe => matchingRecipeIds.includes(recipe.id));

        updateAllFilters(matchingRecipes);
        new TagManager();
    }

    buttonsEventListerners(){
        this.button.addEventListener('click', () => {
            this.search();
          });
          
        // Événement d'appui sur la touche Entrée
        this.input.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
            this.search();
        }
        });
        // Événement d'entrée dans la barre de recherche
        this.input.addEventListener('input', () => {
            if (this.input.value.length > 0) {
                this.clearButton.style.visibility = 'visible';
            } else {
                this.clearButton.style.visibility = 'hidden';
                this.updateCards(recipes.map(recipe => recipe.id));
            }
        });
        
        // Événement de clic sur la croix pour effacer le contenu de la recherche et réinitialiser l'affichage des cards
        this.clearButton.addEventListener('click', () => {
            this.input.value = '';
            this.clearButton.style.visibility = 'hidden';
            this.updateCards(recipes.map(recipe => recipe.id)); // Réinitialiser l'affichage des cards
        });
    }
}