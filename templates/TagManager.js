import { recipes } from "../recipe.js";
import SortingButtons from "../models/SortingButtons.js";
import SortingOptions from "./SortingOptions.js";
import RecipeCounter from "../models/RecipeCounter.js";
import normalize from "../models/Normalize.js";
import RecipeCard from "./RecipeCard.js";
import updateAllFilters from "./UpdateAllFilters.js";

export default class TagManager{
    constructor(){
        this.tags = []; // Variable de classe pour stocker les tags
        this.addOptionClickHandlers();
        this.inputIngredients = document.getElementById('filter-bar-ingredients');
        this.inputAppliances = document.getElementById('filter-bar-appliances');
        this.inputUstensils = document.getElementById('filter-bar-ustensils');
    }

    addOptionClickHandlers() {
        const options = document.querySelectorAll("li[role='option']");
        
        options.forEach((option) => {
            option.addEventListener('click', () => {
                const selectedText = option.textContent;
                this.addTag(selectedText);
                });
        });
    }
    
    addTag(text) {
        const tagList = document.querySelector('.tag-list');
        console.log(`Tag ajouté : ${text}`);

        const existingTags = Array.from(tagList.querySelectorAll('.tag'));
        const isDuplicate = existingTags.some((tag) => tag.textContent === text);

        if (isDuplicate) {
            console.log(`Le tag "${text}" existe déjà.`);
            return;
        }

        const tag = document.createElement('div');
        const tagText = document.createElement('span');
        const closeBtn = document.createElement('span');
        const closeIcon = document.createElement('i');

        tagText.setAttribute('class', 'tag-text');
        tag.setAttribute('class', 'tag');
        closeBtn.setAttribute('class', 'close-btn');
        closeIcon.classList.add('fa-solid', 'fa-xmark');
        
        tagText.textContent = text;

        closeBtn.appendChild(closeIcon);
        tag.appendChild(tagText);
        tag.appendChild(closeBtn);
        tagList.appendChild(tag);

        this.tags.push(text); // Ajouter le tag à la liste des tags
        this.updateCardsByTags(this.tags); // Mettre à jour les cartes avec les tags existants
        
        closeBtn.addEventListener('click', () => {
            this.removeTag(text);
        });
    }
    
    searchFiltersBar(){
        this.inputIngredients.addEventListener('input', () => {
            this.inputIngredientsValue = normalize(this.inputIngredients.value);
            if(this.inputIngredientsValue.length >= 3){
                const matchingAppliances = [];
                const matchingUstensils = [];
                const matchingIngredients = [];
                recipes.forEach(recipe => {
                    const cardAppliances = normalize(recipe.appliance);
                    const cardUstensils = normalize(recipe.ustensils);
                    const cardIngredients = recipe.ingredients.map(ingredient => normalize(ingredient.ingredient));
                
                    const hasMatchingAppliances = cardAppliances.includes(normalize(this.inputValue));
                    const hasMatchingUstensils = cardUstensils.includes(normalize(this.inputValue));
                    const hasMatchingIngredients = cardIngredients.includes(normalize(this.inputValue));
                    
                    if (hasMatchingAppliances) {
                        matchingAppliances.push(recipe.id);
                    }
                    if (hasMatchingUstensils) {
                        matchingUstensils.push(recipe.id);
                    }
                    if (hasMatchingIngredients) {
                        matchingIngredients.push(recipe.id);
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

    generateTagsForRecipe(recipe) {
        const tags = [];
        
        // Générer les tags à partir des ingrédients
        recipe.ingredients.forEach((ingredient) => {
            const normalizedIngredient = normalize(ingredient.ingredient);
            if (!tags.includes(normalizedIngredient)) {
            tags.push(normalizedIngredient);
            }
        });
        
        // Générer les tags à partir de l'appareil
        const normalizedAppliance = normalize(recipe.appliance);
        if (!tags.includes(normalizedAppliance)) {
            tags.push(normalizedAppliance);
        }
        
        // Générer les tags à partir des ustensiles
        recipe.ustensils.forEach((ustensil) => {
            const normalizedUstensil = normalize(ustensil);
            if (!tags.includes(normalizedUstensil)) {
            tags.push(normalizedUstensil);
            }
        });
        
        return tags;
    }

    updateCardsByTags(selectedTags) {
        const recipesContainer = document.querySelector('.card-container');
        recipesContainer.innerHTML = "";
        
        recipes.forEach(recipe => {
            const generatedTags = this.generateTagsForRecipe(recipe);
            const cardTags = generatedTags.map(tag => normalize(tag));
            const hasMatchingTags = selectedTags.every(tag => cardTags.includes(normalize(tag)));
        
            if (hasMatchingTags) {
            const recipeTemplate = new RecipeCard(recipe);
            const recipeCardHtml = recipeTemplate.createRecipeCard();
            recipesContainer.appendChild(recipeCardHtml);
            }
        });
        
        // Mettre à jour les filtres en fonction des tags sélectionnés
        this.updateFiltersByTags(selectedTags);
    }

    updateFiltersByTags(selectedTags) {
        const sortingButtons = document.querySelector('.sorting-buttons');
        sortingButtons.innerHTML = "";
      
        const matchingRecipes = recipes.filter(recipe => {
          const generatedTags = this.generateTagsForRecipe(recipe);
          const cardTags = generatedTags.map(tag => normalize(tag));
          return selectedTags.every(tag => cardTags.includes(normalize(tag)));
        });
      
        updateAllFilters(matchingRecipes);
        this.addOptionClickHandlers();
    }

    removeTag(text) {
        const tagList = document.querySelector('.tag-list');
        const tagToRemove = Array.from(tagList.querySelectorAll('.tag')).find(tag => tag.textContent === text);

        if (tagToRemove) {
            tagToRemove.remove();
            this.tags = this.tags.filter(tag => tag !== text); // Supprimer le tag de la liste des tags
            this.updateCardsByTags(this.tags); // Mettre à jour les cartes de recettes en fonction des tags mis à jour
        }
    }
}