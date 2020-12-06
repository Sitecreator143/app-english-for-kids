function start() {
    createHeader('English for kids')
    new CreateCard().createCategoryCards()
}
start()
function createHeader(titleName) {
    new HeaderMenu().addMenu().addTitle(titleName).addCheckbox()
}



