document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid")
    const width = 8
    const squares = []

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
        console.log(colorDragged)
    }

    function dragEnd() {
        console.log(this.id, "end")
    }

    function dragOver(e) {
        e.preventDefault()
        console.log(this.id, "over")
    }
    
    function dragEnter(e) {
        e.preventDefault()
        console.log(this.id, "enter")
    }

    function dragLeave() {
        console.log(this.id, "leave")
    }

    function dragDrop() {
        colorReplaced = this.style.backgroundColor
        idReplaced = parseInt(this.id)
        squares[idDragged].style.backgroundColor = colorReplaced
    }
})