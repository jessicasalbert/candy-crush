document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid")
    const width = 8
    const squares = []
    let score = 0
    const scoreDiv = document.getElementById("score")

    const candyColors = [
        'url(images/dark-blue-candy.png)',
        'url(images/green-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)'
    ]

    function createBoard() {
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement("div")
            let random = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[random]
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()

    let colorDragged;
    let colorReplaced; 
    let idDragged;
    let idReplaced;

    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart() {
        colorDragged = this.style.backgroundImage
        idDragged = parseInt(this.id)
    }

    function dragEnd() {
        let valid = false;
        if (Math.abs(idDragged - idReplaced) === width) {
            valid = true;
        } else if (Math.abs(idDragged - idReplaced) === 1) {
            valid = true;
        }
        if (idReplaced && valid) {
            idReplaced = null
        } else if (idReplaced && !valid) {
            squares[idReplaced].style.backgroundImage = colorReplaced
            squares[idDragged].style.backgroundImage = colorDragged
        } else {
            squares[idDragged].style.backgroundImage = colorDragged
        }
    }

    function dragOver(e) {
        e.preventDefault()
    }
    
    function dragEnter(e) {
        e.preventDefault()
    }

    function dragLeave() {
    }

    function dragDrop() {
        colorReplaced = this.style.backgroundImage
        idReplaced = parseInt(this.id)
        squares[idDragged].style.backgroundImage = colorReplaced
        squares[idReplaced].style.backgroundImage = colorDragged
    }

    const start = document.getElementById("start")
    const stop = document.getElementById("stop")

    
    let interval; 

    start.addEventListener("click", () => {
        interval = window.setInterval(() => {
            console.log('hi')
            dropCandies()
            checkForFour()
            checkForFourCol()
            checkForThree()
            checkForThreeCol()
            dropCandies()
        }, 100)
    })

    stop.addEventListener("click", () => {
        clearInterval(interval)
    })
    

    
    function dropCandies() {
        for (let i = 0; i < 56; i++ ) {
            if (squares[i + width].style.backgroundImage === "") {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ""
                
            }
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            if (firstRow.includes(i) && squares[i].style.backgroundImage === "") {
                squares[i].style.backgroundImage = candyColors[Math.floor(Math.random() * candyColors.length)]
            }
        }
    }

    function checkForThree() {
        for (i = 0; i < 62; i++) {
            let row = [i, i + 1, i + 2]
            color = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
    
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue 

            if (row.every( i => squares[i].style.backgroundImage === color && !isBlank)) {
                score += 3
                scoreDiv.innerHTML = score
                row.forEach( i => {
                    squares[i].style.backgroundImage = ""
                })
            }
        }
    }

    function checkForFour() {
        for (i = 0; i < 60; i++) {
            let row = [i, i + 1, i + 2, i + 3]
            color = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
    
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,54, 55]
            if (notValid.includes(i)) continue 
            
            if (row.every( i => squares[i].style.backgroundImage === color && !isBlank)) {
                score += 4
                scoreDiv.innerHTML = score
                row.forEach( i => {
                    squares[i].style.backgroundImage = ""
                })
            }
        }
    }

    function checkForFourCol() {
        for (i = 0; i < 39; i++) {
            let col = [i, i + width, i + (2 * width), i + (3 * width)]
            color = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
    
            if (col.every( i => squares[i].style.backgroundImage === color && !isBlank)) {
                score += 4
                scoreDiv.innerHTML = score
                col.forEach( i => {
                    squares[i].style.backgroundImage = ""
                })
            }
        }
    }

    function checkForThreeCol() {
        for (i = 0; i < 48; i++) {
            let col = [i, i + width, i + (2 * width)]
            color = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
    
            if (col.every( i => squares[i].style.backgroundImage === color && !isBlank)) {
                score += 3
                scoreDiv.innerHTML = score
                col.forEach( i => {
                    squares[i].style.backgroundImage = ""
                })
            }
        }
    }
    
    
})
