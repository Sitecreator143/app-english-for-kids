function start() {
    createHeader()
    new CreateCard().createCategoryCards()
}
start()
function createHeader() {
    new HeaderMenu().addMenu()
    new HeaderMenu().addTitle()
    new HeaderMenu().addCheckbox()
}



