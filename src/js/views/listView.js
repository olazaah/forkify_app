import { element } from './base';

export const renderItem = item => {
    const markUp = `
        <li class="shopping__item">
            <div class="shopping__count" data-itemid=${item.id}>
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>g</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    element.shopping.insertAdjacentHTML('beforeend', markUp);
}

export const deteleItem = id => {
    const item = document.querySelector(`[data-itemid=${item.id}]`);
    item.parentElement.removeChild(item);
}