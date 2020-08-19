export const element = {
    searchInput : document.querySelector('.search__field'),
    searchForm : document.querySelector('.search'),
    searchResList : document.querySelector('.results__list'),
    searchRes : document.querySelector('.results'),
    searchResPages : document.querySelector('.results__pages')
};

export const renderLoader = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) loader.parentElement.removeChild(loader);
}

/*

*************************
List of possible queries
*************************

carrot
broccoli
asparagus
cauliflower
corn
cucumber
green pepper
lettuce
mushrooms
onion
potato
pumpkin
red pepper
tomato
beetroot
brussel sprouts
peas
zucchini
radish
sweet potato
artichoke
leek
cabbage
celery
chili
garlic
basil
coriander
parsley
dill
rosemary
oregano
cinnamon
saffron
green bean
bean
chickpea
lentil
apple
apricot
avocado
banana
blackberry
blackcurrant
blueberry
boysenberry
cherry
coconut
fig
grape
grapefruit
kiwifruit
lemon
lime
lychee
mandarin
mango
melon
nectarine
orange
papaya
passion fruit
peach
pear
pineapple
plum
pomegranate
quince
raspberry
strawberry
watermelon
salad
pizza
pasta
popcorn
lobster
steak
bbq
pudding
hamburger
pie
cake
sausage
tacos
kebab
poutine
seafood
chips
fries
masala
paella
som tam
chicken
toast
marzipan
tofu
ketchup
hummus
chili
maple syrup
parma ham
fajitas
champ
lasagna
poke
chocolate
croissant
arepas
bunny chow
pierogi
donuts
rendang
sushi
ice cream
duck
curry
beef
goat
lamb
turkey
pork
fish
crab
bacon
ham
pepperoni
salami
ribs */