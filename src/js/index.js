import Search from './models/Search';
import * as searchView from './views/searchView';
import { element, renderLoader, clearLoader } from './views/base';

/*

* - Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes

*/

const state = {};

const controlSearch = async () =>{
    // 1. Get query from view
    const query = searchView.getInput();
    console.log(query);

    if(query){
        // 2. New search and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(element.searchRes);

        // 4. Search for recipies
        await state.search.getResults();

        // 5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result); 
        

    }
}
element.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})




