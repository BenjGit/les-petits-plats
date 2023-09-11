import { recipes } from "../Recipe.js";
import normalize from "../models/Normalize.js";
import RecipeCard from "./RecipeCard.js";
import updateAllFilters from "./UpdateAllFilters.js";

export default class TagManager{
    constructor(){
        this.tags = []; // Variable de classe pour stocker les tags
        this.addOptionClickHandlers();
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
    
    

    generateTagsForRecipe(recipe) {
        const tags = [];
        
        // Générer les tags à partir des ingrédients
        recipe.ingredients.forEach((ingredient) => {
            const normalizedIngredient = normalize(ingredient.ingredient);
            tags.push(normalizedIngredient);
        });
        
        // Générer les tags à partir de l'appareil
            const normalizedAppliance = normalize(recipe.appliance);
            tags.push(normalizedAppliance);
        
        // Générer les tags à partir des ustensiles
        recipe.ustensils.forEach((ustensil) => {
            const normalizedUstensil = normalize(ustensil);
            tags.push(normalizedUstensil);
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