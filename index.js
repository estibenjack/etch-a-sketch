// DOM elements

const canvas = document.getElementById('canvas')
const colorPicker = document.getElementById('color-picker')
const sizeSlider = document.getElementById('size-slider')
const sizeValue = document.getElementById('size-value')
const colorBtn = document.getElementById('color-btn')
const rainbowBtn = document.getElementById('rainbow-btn')
const eraserBtn = document.getElementById('eraser-btn')
const clearBtn = document.getElementById('clear-btn')

// Variables

let currentMode = 'color'
let click = false

// Event listeners

colorBtn.onclick = () => setMode('color')
rainbowBtn.onclick = () => setMode('rainbow')
eraserBtn.onclick = () => setMode('eraser')
clearBtn.onclick = () => clearCanvas()

sizeSlider.addEventListener('input', function() {
  const size = sizeSlider.value
  sizeValue.textContent = `${size} x ${size}`
  clearCanvas()
  createCanvas(size)
})

// Mouse events

document.body.onmousedown = () => click = true
document.body.onmouseup = () => click = false

// Functions

function createCanvas(size) {
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i=0; i<size*size; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        square.addEventListener('mouseover', colorSquare)
        square.addEventListener('click', colorSquare)
        canvas.appendChild(square)
    }
}

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
    document.querySelectorAll('.square').forEach(square => square.style.backgroundColor = 'white')
}

// function activateButton(newMode) {
//     if (currentMode === 'rainbow') {
//       rainbowBtn.classList.remove('active')
//     } else if (currentMode === 'color') {
//       colorBtn.classList.remove('active')
//     } else if (currentMode === 'eraser') {
//       eraserBtn.classList.remove('active')
//     }
  
//     if (newMode === 'rainbow') {
//       rainbowBtn.classList.add('active')
//     } else if (newMode === 'color') {
//       colorBtn.classList.add('active')
//     } else if (newMode === 'eraser') {
//       eraserBtn.classList.add('active')
//     }
//   }

function activateButton(newMode) {
  const activeBtn = document.querySelector('.active')
  if (activeBtn) activeBtn.classList.remove('active')
  switch (newMode) {
      case 'rainbow':
          rainbowBtn.classList.add('active')
          break
      case 'color':
          colorBtn.classList.add('active')
          break
      case 'eraser':
          eraserBtn.classList.add('active')
          break
  }
}

// initialise board

createCanvas(sizeSlider.value)
activateButton('color')
