import { element } from './base';

export const getInput = () => element.searchInput.value;

export const renderResults = recipes => {
    recipes.forEach(element => {
        renderRecipe(element)
    });
};

export const clearInput = () => {
    element.searchInput.value = '';
};

export const clearResults = () => {
    element.searchResList.innerHTML = '';
};

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    element.searchResList.insertAdjacentHTML('beforeend', markup);
};

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}