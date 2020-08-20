import { element } from './base';

export const getInput = () => element.searchInput.value;

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}", data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Pages ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1){
        // Only button to got to the next page
        button = createButton(page, 'next')

    }else if (page < pages){
        // Both buttons
        button =  `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `

    } else if (page === pages && pages > 1){
        // Only button to got to the prev page
        button = createButton(page, 'prev')
    }

    element.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(element => {
        renderRecipe(element)
    });

    // Render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};

export const clearInput = () => {
    element.searchInput.value = '';
};

export const clearResults = () => {
    element.searchResList.innerHTML = '';
    element.searchResPages.innerHTML = '';
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