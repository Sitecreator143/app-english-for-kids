class CreateCard {
    clearMainBody() {
        this.mainBody = document.querySelector('[data-main-body]')
        this.mainBody.innerHTML = ''
    }
    createCategoryCards() {
        this.clearMainBody()
        for (let themeNumber = 0; themeNumber < cardThemes.length; themeNumber++) {
            new CategoryCard(themeNumber)
        }
    }
    createThemeCards(themeNumber) {
        this.clearMainBody()
        for (let cardNumber = 0; cardNumber < cardThemes.length; cardNumber++) {
            new ThemeItem(themeNumber, cardNumber)
        }
    }

    createRandomCardsArray() {
        let randomCardsArr = []
        const playCardsCount = 8
        while (randomCardsArr.length < playCardsCount) {
            let randomCardNumber = Math.floor(Math.random() * (64) + 1)
            if (randomCardsArr.indexOf(randomCardNumber) === -1) { 
                randomCardsArr.push(randomCardNumber) 
            }
        }
        return randomCardsArr
    }
    createPlayCards() {
        this.clearMainBody()
        
        const playCardsCount = 8
        const randomCardsArr = this.createRandomCardsArray()
        const shuffledCardsArr = randomCardsArr.slice().sort(() => Math.random() - 0.5)
        new StarArea()
        for (let i = 0; i < playCardsCount; i++) {
            const randomCardTheme = Math.floor((randomCardsArr[i] - 1) / 8)
            const randomCardNumber = randomCardsArr[i] % 8
            new PlayItem(randomCardTheme, randomCardNumber, randomCardsArr, shuffledCardsArr)
        }
        new PlayButton(randomCardsArr, shuffledCardsArr)
    }
}

class Card {
    constructor(themeNumber, cardNumber) {
        this.mainBody = document.querySelector('[data-main-body]')
        this.themeNumber = themeNumber
        this.cardNumber = cardNumber

        this.item = document.createElement('div')
        this.item.classList.add('main__item')
        this.mainBody.append(this.item)

        this.itemImage = document.createElement('div')
        this.itemImage.style.cssText=`width: 210px;
        height: 150px;
        background: url('img/${cardThemes[this.themeNumber]}.jpg') no-repeat center center/cover;`
        this.item.insertBefore(this.itemImage, this.item.childNodes[0])

        this.itemText = document.createElement('div')
        this.itemText.classList.add('main__text')
        this.itemText.innerText = cardThemes[this.themeNumber].slice(2)
        this.item.insertBefore(this.itemText, this.item.childNodes[1])
    }
}

class CategoryCard extends Card {
    constructor (themeNumber, cardNumber) {
        super(themeNumber, cardNumber)
        this.item.addEventListener('click', () => {
            new CreateCard().createThemeCards(this.themeNumber)
        })
    }
}

class ThemeItem extends Card {
    constructor (themeNumber, cardNumber) {
        super(themeNumber, cardNumber)

        this.itemImage.style.cssText=`width: 210px;
        height: 150px;
        background: url('img/${englishCardText[this.themeNumber][this.cardNumber]}.jpg') no-repeat center center/cover;`
        this.itemText.innerText = englishCardText[this.themeNumber][this.cardNumber].slice(2)

        const itemTurn = document.createElement('div')
        itemTurn.classList.add('main__turn')
        this.item.insertBefore(itemTurn, this.item.childNodes[2])
        const iconTurn = document.createElement('i')
        iconTurn.classList.add('fa-undo')
        iconTurn.classList.add('fas')
        itemTurn.append(iconTurn)

        this.itemImage.addEventListener('click', () => {
            const audio = new Audio()
            audio.src = `audio/${englishCardText[this.themeNumber][this.cardNumber]}.mp3`
            audio.autoplay = true
        })
        this.itemText.addEventListener('click', () => {
            const audio = new Audio()
            audio.src = `audio/${englishCardText[this.themeNumber][this.cardNumber]}.mp3`
            audio.autoplay = true
        })

        let language = 'english'
        itemTurn.addEventListener('click', () => {
            if (language === 'english') {
                language = 'russian'
                this.item.animate([
                    {transform: 'scale(1, 1)'}, 
                    {transform: 'scale(0, 1)'},
                    {transform: 'scale(1, 1)'}
                ], 100)
                this.itemText.innerText = russianCardText[this.themeNumber][this.cardNumber]
            } 
        })
        this.item.addEventListener('mouseleave', () => {
            if (language === 'russian') {
                this.item.animate([
                    {transform: 'scale(1, 1)'},
                    {transform: 'scale(0, 1)'},
                    {transform: 'scale(1, 1)'}
                ], 100)
                language = 'english'
                this.itemText.innerText = englishCardText[this.themeNumber][this.cardNumber].slice(2)
            }
        })
    }
}

let turnCounter = 0
let resultArray = []
class PlayItem extends Card {
    constructor (themeNumber, cardNumber, randomCardsArr, shuffledCardsArr) {
        
        super(themeNumber, cardNumber)
        this.itemImage.style.cssText=`width: 210px;
        height: 150px;
        background: url('img/${englishCardText[this.themeNumber][this.cardNumber]}.jpg') no-repeat center center/cover;`
        this.itemText.innerText = ''

        function sayNextCard() {
            const cardTheme = Math.floor((shuffledCardsArr[turnCounter] - 1) / 8)
            const cardNumber = shuffledCardsArr[turnCounter] % 8
            setTimeout(() => {
                const audio = new Audio()
                audio.src = `audio/${englishCardText[cardTheme][cardNumber]}.mp3`
                audio.autoplay = true
            }, 1000);
        }
    
        this.item.addEventListener('click', () => {
            const maxTurnCount = 8
            const isCorrectItem = themeNumber === Math.floor((shuffledCardsArr[turnCounter] - 1) / 8) && cardNumber === shuffledCardsArr[turnCounter] % 8
            if (isCorrectItem) {
                resultArray.push(1)
                turnCounter++
                if (turnCounter < maxTurnCount) {
                    const correctAnswerAudio = new Audio()
                    correctAnswerAudio.src = `audio/correct.mp3`
                    correctAnswerAudio.autoplay = true
                }
                sayNextCard()
            } else {
                resultArray.push(0)
                const incorrectAnswerAudio = new Audio()
                incorrectAnswerAudio.src = `audio/error.mp3`
                incorrectAnswerAudio.autoplay = true
                sayNextCard()
            }
            new DrawStars(resultArray)
            const isFinishWin = (turnCounter >= maxTurnCount) && (resultArray.indexOf(0) === -1)
            const isFinishLoose = (turnCounter >= maxTurnCount) && (resultArray.indexOf(0) !== -1)
            if (isFinishWin) {
                console.log('win')
                new Win(true)
            } else if (isFinishLoose) {
                console.log('lose')
                new Win(false)
                
            }
        })
    }
}
class PlayButton {
    constructor (randomCardsArr, shuffledCardsArr) {
        turnCounter = 0
        resultArray = []

        this.mainBody = document.querySelector('[data-main-body]')
        const button = document.createElement('div')
        button.classList.add('main__play-button')
        button.innerText = 'Start game'
        this.mainBody.append(button)

        button.addEventListener('click', () => {
            button.innerText = 'Repeat'
            const cardTheme = Math.floor((shuffledCardsArr[turnCounter] - 1) / 8)
            const cardNumber = shuffledCardsArr[turnCounter] % 8

            const audio = new Audio()
            audio.src = `audio/${englishCardText[cardTheme][cardNumber]}.mp3`
            audio.autoplay = true
        })
    }
}
class Win {
    constructor(isWin) {
        new CreateCard().clearMainBody()

        this.mainBody = document.querySelector('[data-main-body]')
        const finnishPicture = document.createElement('div')
        if (isWin) {
            const audio = new Audio()
            audio.src = `audio/win.mp3`
            audio.autoplay = true

            finnishPicture.style.cssText=`
            margin: 50px;
            width: 210px;
            height: 210px;
            background: url('img/win.png') no-repeat center center/cover;`
        } else {
            const audio = new Audio()
            audio.src = `audio/loose.mp3`
            audio.autoplay = true

            finnishPicture.style.cssText=`
            margin: 50px;
            width: 210px;
            height: 210px;
            background: url('img/loose.png') no-repeat center center/cover;`
        }
        this.mainBody.append(finnishPicture)
        
        setTimeout(() => {
            new CreateCard().createCategoryCards()
        }, 3000)
    }
}











