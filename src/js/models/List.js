import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.items = [];
    }

    addItem(count, unit, ingredient){
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id){
        // [2, 8, 9] splice(1, 2) -> returns [8, 9], original array is [2, 9]
        // [2, 8, 9] slice(1, 2) -> returns 8, original array is [2, 8, 9]
        const index = this.items.findIndex(el => el.id === id); 
        this.items.splice(index, 1);
    }

    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    }
}