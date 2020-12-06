document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid")
    const width = 8
    const squares = []
    let score = 0

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

    
    function checkForThree() {
        for (i = 0; i < 61; i++) {
            let row = [i, i + 1, i + 2]
            color = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''
    
            if (row.every( i => squares[i].style.backgroundColor === color && !isBlank)) {
                score += 3
                row.forEach( i => {
                    squares[i].style.backgroundColor = ""
                })
            }
        }
    }
    
    checkForThree()
})
