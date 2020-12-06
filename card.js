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
        for (let cardNumber = 0; cardNumber < englishCardText[themeNumber].length; cardNumber++) {
            new ThemeItem(themeNumber, cardNumber)
        }
    }

    createRandomCardsArray() {
        let randomCardsArr = []
        const themesCount = 8 
        for (let i = 0; i < themesCount; i++) {
            randomCardsArr.push([])
            randomCardsArr[i].push(i)
            randomCardsArr[i].push(Math.floor(Math.random() * (englishCardText[i].length)))
        }
        randomCardsArr.sort(() => Math.random() - 0.5)
        return randomCardsArr
    }

    createPlayCards() {
        this.clearMainBody()
        const playCardsCount = 8
        const randomCardsArr = this.createRandomCardsArray()
        const shuffledCardsArr = randomCardsArr.slice().sort(() => Math.random() - 0.5)
        new StarArea()
        for (let i = 0; i < playCardsCount; i++) {
            const randomCardTheme = randomCardsArr[i][0]
            const randomCardNumber = randomCardsArr[i][1]
            new PlayItem(randomCardTheme, randomCardNumber, shuffledCardsArr)
        }
        new PlayButton(shuffledCardsArr)
    }
}

class Card {
    constructor(themeNumber, cardNumber) {
        this.playCardsCount = 8
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
            const titleName = cardThemes[this.themeNumber].slice(2)
            new HeaderMenu().refreshHeader(titleName)
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

        this.itemTurn = document.createElement('div')
        this.itemTurn.classList.add('main__turn')
        this.item.insertBefore(this.itemTurn, this.item.childNodes[2])
        const iconTurn = document.createElement('i')
        iconTurn.classList.add('fa-undo')
        iconTurn.classList.add('fas')
        this.itemTurn.append(iconTurn)

        this.soundCard()
        this.flipCard()
    }
    soundCard() {
        const voiceCard = () => {
            const audio = new Audio()
            audio.src = `audio/${englishCardText[this.themeNumber][this.cardNumber]}.mp3`
            audio.autoplay = true
        }
        this.itemImage.addEventListener('click', voiceCard)
        this.itemText.addEventListener('click', voiceCard)
    }
    flipCard() {
        let language = 'english'
        this.itemTurn.addEventListener('click', () => {
            if (language === 'english') {
                language = 'russian'
                this.item.animate([ {transform: 'scale(1, 1)'}, {transform: 'scale(0, 1)'}, {transform: 'scale(1, 1)'} ], 100)
                this.itemText.innerText = russianCardText[this.themeNumber][this.cardNumber]
            } 
        })
        this.item.addEventListener('mouseleave', () => {
            if (language === 'russian') {
                this.item.animate([ {transform: 'scale(1, 1)'}, {transform: 'scale(0, 1)'}, {transform: 'scale(1, 1)'} ], 100)
                language = 'english'
                this.itemText.innerText = englishCardText[this.themeNumber][this.cardNumber].slice(2)
            }
        })
    }
}

let turnCounter = 0
let resultArray = []
class PlayItem extends Card {
    constructor (themeNumber, cardNumber, shuffledCardsArr) {
        super(themeNumber, cardNumber)
        this.itemImage.style.cssText=`width: 210px;
        height: 150px;
        background: url('img/${englishCardText[this.themeNumber][this.cardNumber]}.jpg') no-repeat center center/cover;`
        this.itemText.innerText = ''

        const sayCurrentCard = () => {
            const cardTheme = shuffledCardsArr[turnCounter][0]
            const cardNumber = shuffledCardsArr[turnCounter][1]
            setTimeout(() => {
                const audio = new Audio()
                audio.src = `audio/${englishCardText[cardTheme][cardNumber]}.mp3`
                audio.autoplay = true
            }, 1000)
        }
        const sayCorrectIncorrect = (correctError) => {
            const correctAnswerAudio = new Audio()
            correctAnswerAudio.src = `audio/${correctError}.mp3`
            correctAnswerAudio.autoplay = true
        }
        const drawCorrectCard = () => {
            this.itemImage.style.cssText=`width: 210px;
            height: 150px;
            background: url('img/correct.png') no-repeat center center/cover;`
            this.itemText.innerText = 'done'
        }
        const makeCardUnactive = () => {
            setTimeout(() => {
                this.item.removeEventListener('click', clickItem)
            }, 0)
        }

        const clickItem = () => {
            const maxTurnCount = 8
            const isCorrectItem = themeNumber === shuffledCardsArr[turnCounter][0] && cardNumber === shuffledCardsArr[turnCounter][1]
            if (isCorrectItem) {
                resultArray.push(1)
                turnCounter++
                if (turnCounter < maxTurnCount) {
                    sayCorrectIncorrect('correct')
                    sayCurrentCard()
                    drawCorrectCard()
                }
                makeCardUnactive()
            } else {
                resultArray.push(0)
                sayCorrectIncorrect('error')
                sayCurrentCard()
            }
            new DrawStars(resultArray)
            const isFinishWin = (turnCounter >= maxTurnCount) && (resultArray.indexOf(0) === -1)
            const isFinishLoose = (turnCounter >= maxTurnCount) && (resultArray.indexOf(0) !== -1)
            if (isFinishWin) {
                new Win(true)
            } else if (isFinishLoose) {
                const mistakes = resultArray.filter((el) => el === 0).length
                new Win(false, mistakes)
            }
        }
        this.item.addEventListener('click', clickItem)
    }
}
class PlayButton {
    constructor (shuffledCardsArr) {
        const playCardsCount = 8
        turnCounter = 0
        resultArray = []

        this.mainBody = document.querySelector('[data-main-body]')
        const wrapper = document.createElement('div')
        wrapper.style.cssText=`width: 100%; height: 0;`
        this.mainBody.append(wrapper)
        const button = document.createElement('div')
        button.classList.add('main__play-button')
        button.innerText = 'Start game'
        this.mainBody.append(button)

        button.addEventListener('click', () => {
            button.innerText = 'Repeat'
            const cardTheme = shuffledCardsArr[turnCounter][0]
            const cardNumber = shuffledCardsArr[turnCounter][1]

            const audio = new Audio()
            audio.src = `audio/${englishCardText[cardTheme][cardNumber]}.mp3`
            audio.autoplay = true
        })
    }
}
class Win {
    constructor(isWin, mistakes) {
        new CreateCard().clearMainBody()

        this.mainBody = document.querySelector('[data-main-body]')
        const finnishPicture = document.createElement('div')
        const mistakesCount = document.createElement('div')

        function voiceFinnishSound(winLoose) {
            const audio = new Audio()
            audio.src = `audio/${winLoose}.mp3`
            audio.autoplay = true
        }

        finnishPicture.style.cssText=`margin: 50px; width: 210px; height: 210px;`

        if (isWin) {
            voiceFinnishSound('win')
            finnishPicture.style.background = `url('img/win.png') no-repeat center center/cover`
            mistakesCount.innerText = `Victory!`
        } else {
            voiceFinnishSound('loose')
            finnishPicture.style.background = `url('img/loose.png') no-repeat center center/cover`
            mistakesCount.innerText = `Mistakes: ${mistakes}`
        }
        this.mainBody.append(finnishPicture)
        this.mainBody.append(mistakesCount)
        
        setTimeout(() => {
            new HeaderMenu().refreshHeader()
            new CreateCard().createCategoryCards()
        }, 2000)
    }
}











