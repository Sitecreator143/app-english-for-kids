/**
 * Theme number > Card number
*/
const cardThemes = ['0-activities', '0-animals', '0-city', '0-clothes', '0-colors', '0-food', '0-home', '0-places']
const englishCardText = [['1-cut', '1-drink', '1-drive', '1-eat', '1-play', '1-run', '1-sleep', '1-walk'], 
['2-cat', '2-dog', '2-hamster', '2-hedgehog', '2-horse', '2-koala', '2-mouse', '2-turtle'], 
['3-bicycle', '3-bus', '3-car', '3-house', '3-road', '3-street', '3-train', '3-tree'], 
['4-jacket', '4-pants', '4-scarf', '4-shirt', '4-shoe', '4-shorts', '4-skirt', '4-socks', '4-t-shirt'], 
['5-black', '5-blue', '5-brown', '5-green', '5-orange', '5-pink', '5-red', '5-white', '5-yellow'], 
['6-beef', '6-cake', '6-coffee', '6-pasta', '6-potato', '6-salad', '6-soup', '6-tea'], 
['7-armchair', '7-bed', '7-chair', '7-door', '7-floor', '7-sofa', '7-table', '7-tv'], 
['8-beach', '8-desert', '8-field', '8-forest', '8-river', '8-sea', '8-sky', '8-space']]
const russianCardText = [['резать', 'пить', 'водить', 'есть', 'играть', 'бегать', 'спать', 'гулять'], 
['кошка', 'собака', 'хомяк', 'ёж', 'лошадь', 'коала', 'мышь', 'черепаха'], 
['велосипед', 'автобус', 'машина', 'дом', 'дорога', 'улица', 'поезд', 'дерево'], 
['куртка', 'штаны', 'шарф', 'рубашка', 'ботинок', 'шорты', 'юбка', 'носки', 'футболка'], 
['черный', 'синий', 'коричневый', 'зеленый', 'оранжевый', 'розовый', 'красный', 'белый', 'желтый'], 
['мясо', 'торт', 'кофе', 'макароны', 'картофель', 'салат', 'суп', 'чай'], 
['кресло', 'кровать', 'стул', 'дверь', 'пол', 'диван', 'стол', 'телевизор'], 
['пляж', 'пустыня', 'поле', 'лес', 'река', 'море', 'небо', 'космос']]

class HeaderMenu {
    constructor() {
        this.header = document.querySelector('[data-header]')
        this.body = document.querySelector('body')
        this.refreshHeader = (titleName) => {
            this.header.innerHTML = ''
            createHeader(titleName)
        }
    }
    addMenu() {
        const toggleMenuClasses = () => {
            burger.classList.toggle('active')
            nav.classList.toggle('active')
            this.body.classList.toggle('lock')
            shadow.classList.toggle('active')
        }

        const burger = document.createElement('div')
        burger.classList.add('header__burger')
        this.header.append(burger)
        const span = document.createElement('span')
        burger.append(span)
        burger.addEventListener('click', () => {
            toggleMenuClasses()
        })

        const nav = document.createElement('nav')
        nav.classList.add('header__menu')
        this.header.append(nav)
        const ul = document.createElement('ul')
        nav.append(ul)

        const main = document.createElement('li')
        main.innerText = 'main'
        main.addEventListener('click', () => {
            toggleMenuClasses()
            this.refreshHeader()
            new CreateCard().createCategoryCards()
        })
        ul.append(main)

        for (let themesCount = 0; themesCount < cardThemes.length; themesCount++) {
            const navItem = document.createElement('li')
            navItem.innerText = cardThemes[themesCount].slice(2)
            navItem.addEventListener('click', () => {
                toggleMenuClasses()
                const titleName = cardThemes[themesCount].slice(2)
                this.refreshHeader(titleName)
                new CreateCard().createThemeCards(themesCount)
            })
            ul.append(navItem)
        }

        const stat = document.createElement('li')
        stat.innerText = 'stat'
        stat.addEventListener('click', () => {
            toggleMenuClasses()
            const titleName = 'Statistic'
            this.refreshHeader(titleName)
            new CreateCard().createStatistic()
        })
        ul.append(stat)

        const shadow = document.createElement('div')
        shadow.classList.add('header__shadow')
        this.header.append(shadow)
        shadow.addEventListener('click', () => {
            toggleMenuClasses()
        })
        return this
    }
    addTitle(titleName = 'English for kids') {
        this.title = document.createElement('div')
        this.changeTitle(titleName)
        this.title.classList.add('header__title')
        this.header.append(this.title)
        this.title.addEventListener('click', () => {
            this.refreshHeader()
            new CreateCard().createCategoryCards()
        })
        return this
    }
    changeTitle(titleName) {
        this.title.innerText = titleName
    }
    addCheckbox() {
        const checkbox = document.createElement('div')
        checkbox.classList.add('header__checkbox')
        checkbox.innerText = 'Train'
        this.header.append(checkbox)

        const input = document.createElement('input')
        input.type = 'checkbox'
        checkbox.append(input)

        let isPlayMode = false
        checkbox.addEventListener('click', () => {
            if (isPlayMode) {
                new HeaderMenu().refreshHeader()
                new CreateCard().createCategoryCards()
            } else {
                isPlayMode = true
                const titleName = 'Play mode'
                this.changeTitle(titleName)
                checkbox.classList.add('active')
                checkbox.innerText = 'Play!'
                new CreateCard().createPlayCards()
            }
        })
    }
}

