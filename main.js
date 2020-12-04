function start() {
    new HeaderMenu().addMenu()
    new HeaderMenu().addTitle()
    new HeaderMenu().addCheckbox()
    createCategoryCards()
}
start()
function createCategoryCards() {
    mainBody = document.querySelector('[data-main-body]')
    mainBody.innerHTML = ''
    for (let cardNumber = 0; cardNumber < englishCardText[0].length; cardNumber++) {
        new Card(0, cardNumber).createCategoryItems()
    }
}
function createThemeCards(themeNumber) {
    mainBody = document.querySelector('[data-main-body]')
    mainBody.innerHTML = ''
    for (let cardNumber = 0; cardNumber < englishCardText[themeNumber].length; cardNumber++) {
        new Card(themeNumber, cardNumber).createThemeItems()
    }
}



