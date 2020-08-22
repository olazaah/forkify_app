import { element } from './base';

import { Fraction } from 'fractional';

export const clearRecipe = () => {
    element.recipe.innerHTML = '';
}

const formatCount = count => {
    if (count){
        // count = 2.5 --> 2 1/2
        // count = 0.5 --> 1/2
        // count = 1.333333333333 --> 1 1/3

        // first restrict the count to 2 decimal place as a formated string to use later
        let formatedNum = count.toFixed(2);
        
        const [int, dec] = count.toString().split('.').map(el => parseInt(el));

        if (!dec){
            return int;
        } else if (dec.toString().length > 3){
            // trying to trap recursives like 0.33333333, 0.6666666. 0.99999999999
            // count = count.toFixed(1);
            formatedNum = count.toFixed(1);
            console.log(formatedNum);
        }

        if (int === 0){
            const fr = new Fraction(formatedNum);
            return `${fr.numerator}/${fr.denominator}`;
        } else{
            const fr = new Fraction(formatedNum - int);
            // console.log(fr)
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
    }
    return '?';
};

const createIngredient = ingredient => `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${formatCount(ingredient.count)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.ingredient}
            </div>
        </li>
    `;

export const renderRecipe = (recipe, isLiked) => {
    const markUp = `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${recipe.ingredients.map(el => createIngredient(el)).join('')} 
                </ul>

                <button class="btn-small recipe__btn recipe__btn--add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `;

    element.recipe.insertAdjacentHTML('afterbegin', markUp);
}

export const updateServingsIngredients = recipe => {
    // Update servings 
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    // Update Ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    })
}