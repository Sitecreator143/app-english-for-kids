

class Card {
    constructor(themeNumber, cardNumber) {
        this.mainBody = document.querySelector('[data-main-body]')
        this.themeNumber = themeNumber
        this.cardNumber = cardNumber
    }
    createCategoryItems() {
        const item = document.createElement('div')
        item.classList.add('main__item')
        this.mainBody.append(item)

        const itemImage = document.createElement('div')
        itemImage.style.cssText=`width: 210px;
        height: 150px;
        background: url('img/${englishCardText[this.themeNumber][this.cardNumber]}.jpg') no-repeat center center/cover;`
        item.insertBefore(itemImage, item.childNodes[0])

        const itemText = document.createElement('div')
        itemText.classList.add('main__text')
        itemText.innerText = englishCardText[this.themeNumber][this.cardNumber].slice(2)
        item.insertBefore(itemText, item.childNodes[1])

        item.addEventListener('click', () => {
            createThemeCards(this.cardNumber + 1)
        })
    }
    createThemeItems() {
        const item = document.createElement('div')
        item.classList.add('main__item')
        this.mainBody.append(item)

        const itemImage = document.createElement('div')
        itemImage.style.cssText=`width: 210px;
        height: 150px;
        background: url('img/${englishCardText[this.themeNumber][this.cardNumber]}.jpg') no-repeat center center/cover;`
        item.insertBefore(itemImage, item.childNodes[0])

        const itemText = document.createElement('div')
        itemText.classList.add('main__text')
        itemText.innerText = englishCardText[this.themeNumber][this.cardNumber].slice(2)
        item.insertBefore(itemText, item.childNodes[1])

        const itemAudio = document.createElement('div')
        itemAudio.classList.add('main__audio')
        item.insertBefore(itemAudio, item.childNodes[2])
        const iconAudio = document.createElement('i')
        iconAudio.classList.add('fa-volume-down')
        iconAudio.classList.add('fas')
        itemAudio.append(iconAudio)

        itemText.addEventListener('click', () => {
            const audio = new Audio()
            audio.src = `audio/${englishCardText[this.themeNumber][this.cardNumber]}.mp3`
            audio.autoplay = true
        })
        let language = 'english'
        itemImage.addEventListener('mouseout', () => {
            if (language === 'russian') {
                item.animate([
                    {transform: 'scale(1, 1)'},
                    {transform: 'scale(0, 1)'},
                    {transform: 'scale(1, 1)'}
                ], 100);
                language = 'english'
                itemText.innerText = englishCardText[this.themeNumber][this.cardNumber].slice(2)
            }
        })
        itemImage.addEventListener('click', () => {
            item.animate([
                {transform: 'scale(1, 1)'},
                {transform: 'scale(0, 1)'},
                {transform: 'scale(1, 1)'}
            ], 100);
            if (language === 'english') {
                language = 'russian'
                itemText.innerText = russianCardText[this.themeNumber][this.cardNumber]
            } else {
                language = 'english'
                itemText.innerText = englishCardText[this.themeNumber][this.cardNumber].slice(2)
            }
        })
    }
}










