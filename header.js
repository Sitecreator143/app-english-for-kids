/**
 * Theme number
 * Card number
 */
const englishCardText = [['0-activities', '0-animals', '0-city', '0-clothes', '0-colors', '0-food', '0-home', '0-places'], 
['1-cut', '1-drink', '1-drive', '1-eat', '1-play', '1-run', '1-sleep', '1-walk'], 
['2-cat', '2-dog', '2-hamster', '2-hedgehog', '2-horse', '2-koala', '2-mouse', '2-turtle'], 
['3-bicycle', '3-bus', '3-car', '3-house', '3-road', '3-street', '3-train', '3-tree'], 
['4-jacket', '4-pants', '4-scarf', '4-shirt', '4-shoe', '4-shorts', '4-skirt', '4-socks', '4-t-shirt'], 
['5-black', '5-blue', '5-brown', '5-green', '5-orange', '5-pink', '5-red', '5-white', '5-yellow'], 
['6-beef', '6-cake', '6-coffee', '6-pasta', '6-potato', '6-salad', '6-soup', '6-tea'], 
['7-armchair', '7-bed', '7-chair', '7-door', '7-floor', '7-sofa', '7-table', '7-tv'], 
['8-beach', '8-desert', '8-field', '8-forest', '8-river', '8-sea', '8-sky', '8-space']]
const russianCardText = [[], 
['резать', 'пить', 'водить', 'есть', 'играть', 'бегать', 'спать', 'гулять'], 
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

        const nav = document.createElement('nav')
        nav.classList.add('header__menu')
        this.header.append(nav)
        const ul = document.createElement('ul')
        nav.append(ul)

        const main = document.createElement('li')
        main.innerText = 'main'
        main.addEventListener('click', () => {
            createCategoryCards()
            toggleMenuClasses()
        })
        ul.append(main)

        for (let themesCount = 0; themesCount < englishCardText[0].length; themesCount++) {
            const navItem = document.createElement('li')
            navItem.innerText = englishCardText[0][themesCount].slice(2)
            navItem.addEventListener('click', () => {
                createThemeCards(themesCount + 1)
                toggleMenuClasses()
            })
            ul.append(navItem)
        }

        const shadow = document.createElement('div')
        shadow.classList.add('header__shadow')
        this.header.append(shadow)
        
        burger.addEventListener('click', () => {
            toggleMenuClasses()
        })
    }
    addTitle() {
        const title = document.createElement('div')
        title.innerText = 'English for kids'
        title.classList.add('header__title')
        this.header.append(title)
        title.addEventListener('click', () => {
            createCategoryCards()
        })
    }
    addCheckbox() {
        const checkbox = document.createElement('div')
        checkbox.classList.add('header__checkbox')
        checkbox.innerText = 'Play'
        this.header.append(checkbox)

        const input = document.createElement('input')
        input.type = 'checkbox'
        checkbox.append(input)

        checkbox.addEventListener('click', () => {
            checkbox.classList.toggle('active')
        })
    }
}

