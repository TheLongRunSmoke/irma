/**
 * Generate random background.
 * 
 * @author thelongrunsmoke
 */

import './main.css'

const StackBlur = require('./blur')

const seedInput = document.getElementById('seed_input')
const rollButton = document.getElementById('roll')
const aboutButton = document.getElementById('about_button')
const about = document.getElementById('about')
const canvas = document.getElementById('content')
const ctx = canvas.getContext('2d')
const saveButton = document.getElementById('save')
const dataUrlLink = document.getElementById('data_url_link')

/**
 * Initialize window.
 */
let init = () => {
    document.addEventListener('resize', canvasResize)
    canvasResize()
    rollButton.addEventListener('click', rollSeed)
    saveButton.addEventListener('click', saveBackground)
    aboutButton.addEventListener('click', (event) => {
        event.stopPropagation()
        toggleAbout()
    })
    hideAbout()
}

/**
 * Keep canvas size coresponding to viewport.
 */
let canvasResize = () => {
    var width = document.documentElement.clientWidth
    var height = document.documentElement.clientHeight
    canvas.width = width
    canvas.height = height
    canvas.style.width = width + "px"
    canvas.style.height = height + "px"
}

/**
 * Restrict input for sidned integer only.
 * 
 * @param {HTMLCanvasElement} textbox affected field
 */
let setInputFilter = (textbox) => {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach((event) => {
        textbox.addEventListener(event, () => {
            if (/^-?\d*$/.test(textbox.value)) {
                textbox.oldValue = textbox.value
                textbox.oldSelectionStart = textbox.selectionStart
                textbox.oldSelectionEnd = textbox.selectionEnd
            } else if (textbox.hasOwnProperty("oldValue")) {
                textbox.value = textbox.oldValue
                textbox.setSelectionRange(textbox.oldSelectionStart, textbox.oldSelectionEnd)
            }
            generateBackground(seedInput.value)
        })
    })
}

/**
 * Select all in seed field.
 * 
 * @param {HTMLCanvasElement} textbox affected field
 */
let setAutoSelect = (textbox) => {
    textbox.addEventListener("click", () => seedInput.setSelectionRange(0, seedInput.value.length))
}

/**
 * Generate new seed.
 */
let rollSeed = () => {
    var sign = Math.random() < 0.5 ? -1 : 1
    seedInput.value = sign * Math.floor(100000000 + Math.random() * 900000000)
    generateBackground(seedInput.value)
}

/**
 * Toggle visiability of About element.
 */
let toggleAbout = () => {
    about.style.display = (about.style.display == 'none') ? '' : 'none'
}

/**
 * Hide About element, when click outside.
 * 
 * @param {*} seed 
 */
let hideAbout = () => {
    document.onclick = (event) => {
        if (about.style.display == 'none') return
        var path = event.composedPath()
        path.forEach((elm) => {
            if (elm.id == 'about') return
        })
        about.style.display = 'none'
    }
}

/**
 * Offer to save current background as file.
 * 
 * @param {Integer} seed 
 */
let saveBackground = (seed) => {
    var dataURL = canvas.toDataURL("image/jpeg")
    dataUrlLink.href = dataURL
    dataUrlLink.download = seedInput.value + '.jpg'
    dataUrlLink.click()
}

/**
 * Seedable pseudo-random generator. From -1 to 1, included. 
 * Required Math.seed initialized.
 * Values selected to give interesting and well distributed sequence.
 * 
 * @param {Boolean} isSigned signed result or not.
 */
Math.seededRandom = (isSigned = false) => {
    Math.seed = (Math.seed * 9301 + 49297) % 233280
    var rnd = Math.seed / 233280.0
    return !isSigned ? Math.abs(rnd) : rnd
}

/**
 * Colors.
 */
const pallet = ["#ef5350", "#ec407a", "#ab47bc", "#7e57c2", "#5c6bc0", "#42a5f5",
    "#26c6da", "#26a69a", "#66bb6a", "#9ccc65", "#d4e157", "#ffee58",
    "#ffca28", "#8d6e63", "#bdbdbd", "#78909c"]

/**
 * Return random color from pallet.
 */
let randomColor = () => {
    // Select random color.
    var rand = Math.seededRandom() * pallet.length
    var color = pallet[Math.floor(rand)]
    // Compare with last selected color ...
    if (color != pallet.last) {
        // ... if different, save it and return.
        pallet.last = color
        return color
    } else {
        // ... if same - call recursively. 
        return randomColor()
    }
}

/**
 * Draw pallet, with color names.
 */
let showPallet = () => {
    var size = 100
    ctx.font = '20px sans-serif'
    ctx.textBaseline = 'hanging'
    for (var i = 0; i < pallet.length; i++) {
        ctx.fillStyle = pallet[i]
        ctx.fillRect(i % 5 * size, Math.floor(i / 5) * size, size, size)
        ctx.fillStyle = '#000'
        ctx.fillText(pallet[i], i % 5 * size + 5, Math.floor(i / 5) * size + 5)
    }
}

/**
 * Create linear gradient for given angle. 
 * From edge to edge always via screen center.
 * 
 * @param {Float} angle to vertical in degrees, from 0 to 180.
 */
let generateMainGradient = (angle) => {
    var halfWidth = ctx.canvas.width / 2
    var halfHeight = ctx.canvas.height / 2
    var angle = angle * Math.PI / 180
    var x = Math.abs(Math.tan(angle) * halfHeight)
    var y = (angle < Math.PI / 2) ? halfHeight : -halfHeight
    if (x > halfWidth) {
        x = halfWidth
        y = 1 / Math.tan(angle) * halfWidth
    }
    return ctx.createLinearGradient(
        halfWidth + x, halfHeight + y,
        halfWidth - x, halfHeight - y
    )
}

/**
 * Create radial gradient in random position.
 */
let generateSpotGradient = () => {
    var width = ctx.canvas.width
    var height = ctx.canvas.height
    var innerGrdCenterX = Math.seededRandom() * width
    var innerGrdCenterY = Math.seededRandom() * height
    var innerRad = Math.seededRandom() * height / 2
    if (innerRad < height / 12) {
        innerRad = height / 12
    }
    var outerGrdCenterOffsetX = Math.seededRandom(true) * innerRad * 0.7
    var outerGrdCenterOffsetY = Math.seededRandom(true) * Math.sqrt(Math.pow(innerRad, 2) - Math.pow(outerGrdCenterOffsetX, 2))
    var outerRad = innerRad +
        Math.sqrt(Math.pow(outerGrdCenterOffsetY, 2) + Math.pow(outerGrdCenterOffsetX, 2)) +
        Math.seededRandom() * height / 3
    return ctx.createRadialGradient(
        innerGrdCenterX,
        innerGrdCenterY,
        innerRad,
        innerGrdCenterX + outerGrdCenterOffsetX,
        innerGrdCenterY + outerGrdCenterOffsetY,
        outerRad)
}

/**
 * Draw backround by seed.
 * 
 * @param {Integer} seed 
 */
let generateBackground = (seed) => {
    // Check for inconsistent condition.
    if (!seed) return
    if (seed === '-') return
    // Init seed.
    Math.seed = seedInput.value
    // Clear canvas.
    var width = ctx.canvas.width
    var height = ctx.canvas.height
    ctx.clearRect(0, 0, width, height)
    //Draw linear gradient first.
    var linearGrd = generateMainGradient(Math.seededRandom() * 180)
    linearGrd.addColorStop(0, randomColor())
    linearGrd.addColorStop(1, randomColor())
    ctx.fillStyle = linearGrd
    ctx.fillRect(0, 0, width, height)
    // Draw some radial gradients.
    for (var i = 0; i < 5; i++) {
        var grd = generateSpotGradient()
        var color = randomColor()
        grd.addColorStop(0, color)
        grd.addColorStop(1, color + '00')
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, width, height)
    }
    // Blur result out.
    StackBlur.blur(canvas, 50)
}

init()
setInputFilter(seedInput)
setAutoSelect(seedInput)
rollSeed()