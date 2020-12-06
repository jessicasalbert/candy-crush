document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid")
    const width = 8
    const squares = []
    let score = 0
    const scoreDiv = document.getElementById("score")

    const candyColors = ['red', 'yellow', 'orange', 'purple', 'green', 'blue']

    function createBoard() {
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement("div")
            let random = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundColor = candyColors[random]
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
        colorDragged = this.style.backgroundColor
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
            squares[idReplaced].style.backgroundColor = colorReplaced
            squares[idDragged].style.backgroundColor = colorDragged
        } else {
            squares[idDragged].style.backgroundColor = colorDragged
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
        colorReplaced = this.style.backgroundColor
        idReplaced = parseInt(this.id)
        squares[idDragged].style.backgroundColor = colorReplaced
        squares[idReplaced].style.backgroundColor = colorDragged
    }

    
    

    window.setInterval(() => {
        dropCandies()
        checkForFour()
        checkForFourCol()
        checkForThree()
        checkForThreeCol()
        dropCandies()
    }, 100)
    
    function dropCandies() {
        for (let i = 0; i < 56; i++ ) {
            if (squares[i + width].style.backgroundColor === "") {
                squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
                squares[i].style.backgroundColor = ""
                
            }
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            if (firstRow.includes(i) && squares[i].style.backgroundColor === "") {
                squares[i].style.backgroundColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            }
        }
    }

    function checkForThree() {
        for (i = 0; i < 62; i++) {
            let row = [i, i + 1, i + 2]
            color = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''
    
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue 

            if (row.every( i => squares[i].style.backgroundColor === color && !isBlank)) {
                score += 3
                scoreDiv.innerHTML = score
                row.forEach( i => {
                    squares[i].style.backgroundColor = ""
                })
            }
        }
    }

    function checkForFour() {
        for (i = 0; i < 60; i++) {
            let row = [i, i + 1, i + 2, i + 3]
            color = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''
    
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,54, 55]
            if (notValid.includes(i)) continue 
            
            if (row.every( i => squares[i].style.backgroundColor === color && !isBlank)) {
                score += 4
                scoreDiv.innerHTML = score
                row.forEach( i => {
                    squares[i].style.backgroundColor = ""
                })
            }
        }
    }

    function checkForFourCol() {
        for (i = 0; i < 39; i++) {
            let col = [i, i + width, i + (2 * width), i + (3 * width)]
            color = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''
    
            if (col.every( i => squares[i].style.backgroundColor === color && !isBlank)) {
                score += 4
                scoreDiv.innerHTML = score
                col.forEach( i => {
                    squares[i].style.backgroundColor = ""
                })
            }
        }
    }

    function checkForThreeCol() {
        for (i = 0; i < 48; i++) {
            let col = [i, i + width, i + (2 * width)]
            color = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''
    
            if (col.every( i => squares[i].style.backgroundColor === color && !isBlank)) {
                score += 3
                scoreDiv.innerHTML = score
                col.forEach( i => {
                    squares[i].style.backgroundColor = ""
                })
            }
        }
    }
    
    
})
