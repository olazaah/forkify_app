import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
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
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        } catch(error){
            alert('Error processing recipe :(');
        }
        
    }
}

////////////////////////////////
////// LIST CONTROLLER
///////////////////////////////

const controlList = () => {
    // Create a new list IF there is none yet
    if (!state.list) state.list = new List();

    window.my_list = state.list;

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
        // console.log(item);
    })
}


////////////////////////////////
////// LIKE CONTROLLER
///////////////////////////////
 const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)){
        // Add like to the state
        const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img);
        // Toggle the like button
        likesView.toggleLikeButton(true);
        // Add to the UI list
        likesView.renderLike(newLike);
        // console.log(state.likes);

    // User has liked current recipe
    } else{
        // remove like to the state
        state.likes.deleteLike(currentID);
        // Toggle the like button
        likesView.toggleLikeButton(false);
        // remove Like from UI list
        likesView.deleteLike(currentID);
        // console.log(state.likes);
        
    }
    likesView.toggleLikeMenu(state.likes.getNumLike());
 }


// window.addEventListener('hashchange', controlRecipe); 
// window.addEventListener('load', controlRecipe);

// SAME AS BELOW

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore likes

    state.likes.readStorage();

    // Toggle like menu button

    likesView.toggleLikeMenu(state.likes.getNumLike());

    state.likes.likes.forEach(like =>likesView.renderLike(like));
})
// state.likes = new Likes();

// // Restore likes

// state.likes.readStorage();

// Render the existing likes
// state.likes.likes.forEach(like =>likesView.renderLike(like));

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
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        // Adding ingredients to shopping list 
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like Controller 
        // console.log('Entered');
        controlLike();
    }
})


// Handle delete and update list item events    
element.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    // console.log(id);
    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        // Delete from state
        state.list.deleteItem(id);
        // Delete from UI
        listView.deteleItem(id);


        // Handle the count update 
    } else if (e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
})

