import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { element, renderLoader, clearLoader } from './views/base';

/*

* - Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes

*/


////////////////////////////////
////// SEARCH CONTROLLER
///////////////////////////////
const state = {};

const controlSearch = async () =>{
    // 1. Get query from view
    const query = searchView.getInput();
    // console.log(query);

    if(query){
        // 2. New search and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(element.searchRes);

        try{
            // 4. Search for recipies
            await state.search.getResults();

            // 5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result); 
        } catch(err){
            alert('Something went wrong with the search');
            clearLoader();
        }
        

    }
}
element.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


element.searchResPages.addEventListener('click', e => {
    const button = e.target.closest('.btn-inline');
    if (button){
        searchView.clearResults();
        const goto = parseInt(button.dataset.goto);
        // console.log(goto);
        searchView.renderResults(state.search.result, goto);
    }
});


////////////////////////////////
////// RECIPE CONTROLLER
///////////////////////////////

const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    // console.log(id);

    if (id){
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(element.recipe);

        // Highlight selected search item
        if (state.search){
            searchView.highlightSelected(id);
        }

        try{
            // Create new recipe object
            state.recipe = new Recipe(id);

            // Get Recipe data and parse ingredient
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // console.log(state.recipe);

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(error){
            alert('Error processing recipe :(');
        }
        
    }
}

// window.addEventListener('hashchange', controlRecipe); 
// window.addEventListener('load', controlRecipe);

// SAME AS BELOW

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// HANDLING RECIPE BUTTON CLICKS

element.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        // Decrease button is clicked
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        } 
    } else if (e.target.matches('.btn-increase, .btn-increase *')){
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
})

window.L = new List();
