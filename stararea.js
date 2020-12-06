class StarArea {
    constructor() {
        this.mainBody = document.querySelector('[data-main-body]')
        this.starArea = document.createElement('div')
        this.starArea.setAttribute('data-star-area', null)
        this.starArea.style.cssText=`
        width: 100%;
        min-height: 100px;
        padding: 10px 0 10px 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        background-color: rgb(255, 255, 255, 0.2)`
        this.mainBody.append(this.starArea)
    }
}
class DrawStars {
    constructor(resultArray) {
        this.starArea = document.querySelector('[data-star-area]')

        const star = document.createElement('div')
        this.starArea.append(star)
        const starIcon = document.createElement('i')
        starIcon.classList.add('fas')
        starIcon.classList.add('fa-star')
        if (resultArray[resultArray.length - 1]) {
            starIcon.style.cssText=`
            font-size: 50px;
            color: yellow;`
        } else {
            starIcon.style.cssText=`
            font-size: 50px;
            color: gray;`
        }
        star.append(starIcon)
    }
}


