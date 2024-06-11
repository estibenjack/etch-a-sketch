const canvas = document.getElementById('canvas')
const colorPicker = document.getElementById('color-picker')
const sizeSlider = document.getElementById('size-slider')
const sizeValue = document.getElementById('size-value')
const colorBtn = document.getElementById('color-btn')
const rainbowBtn = document.getElementById('rainbow-btn')
const eraserBtn = document.getElementById('eraser-btn')
const clearBtn = document.getElementById('clear-btn')
let currentMode = 'color'
let click = false

colorBtn.onclick = () => setMode('color')
rainbowBtn.onclick = () => setMode('rainbow')
eraserBtn.onclick = () => setMode('eraser')
clearBtn.onclick = () => clearCanvas()

document.body.onmousedown = () => (click = true)
document.body.onmouseup = () => (click = false)

function createCanvas(size) {
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i=0; i<size*size; i++) {
        let square = document.createElement('div')
        square.addEventListener('mouseover', colorSquare)
        square.addEventListener('click', colorSquare)
        canvas.appendChild(square)
    }
}

// function colorSquare(){
//     if(click){
//         if(currentMode == 'rainbow'){
//             this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 65%)`
//         } else if (currentMode === 'color'){
//             this.style.backgroundColor = colorPicker.value
//         } else if (currentMode === 'eraser'){
//             this.style.backgroundColor = 'white'
//         }
//     }
// }

function colorSquare(e){
    if (e.type === 'mouseover' && !click) return
    if(currentMode == 'rainbow'){
        e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 65%)`
    } else if (currentMode === 'color'){
        e.target.style.backgroundColor = colorPicker.value
    } else if (currentMode === 'eraser'){
        e.target.style.backgroundColor = 'white'
    }
    }

function setColor(colorChoice){
    currentMode = colorChoice
}

function setMode(newMode) {
    activateButton(newMode)
    setColor(newMode)
}

function clearCanvas(){
    let squares = document.querySelectorAll('div')
    squares.forEach((square) => square.style.backgroundColor = 'white')
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active')
    }
  }

createCanvas(sizeSlider.value)
activateButton('color')

sizeSlider.addEventListener('input', function() {
    let size = sizeSlider.value
    sizeValue.textContent = `${size} x ${size}`
    clearCanvas()
    createCanvas(size)
})