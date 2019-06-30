var c = document.getElementById("canvas")
var ctx = c.getContext("2d")
ctx.imageSmoothingEnabled = true;
var tab = []
var type = true
var color = "black"
var numberOfLines = 0
var justDots = false
var oldLines = 0
var image = ""
var thickness = 1
var brush = false
var mouseHold = false
var int;
var lastDot = []
c.addEventListener("click", function (e) {
    if (!brush) {
        newDot(e)
        if (!justDots) {
            if (type)
                line(tab)
            else
                lineToAll(tab)
        }
    }
})
c.addEventListener("mousedown", function () {
    if (brush)
        mouseHold = true
})
c.addEventListener("mouseup", function () {
    mouseHold = false
    lastDot = []
})
c.addEventListener("mousemove", function (e) {
    if (mouseHold) {
        paintDots(e)
    }
})
document.getElementById("typ").addEventListener("click", function () {
    if (type) {
        type = false
        document.getElementById("typ").innerHTML = "all to new"
    }
    else {
        type = true
        document.getElementById("typ").innerHTML = "last to new"
    }
    justDots = false
    document.getElementById("justDots").innerHTML = "dots+lines"
    brush=false
    document.getElementById("brush").innerHTML="no brush"
})
document.getElementById("justDots").addEventListener("click", function () {
    if (justDots) {
        justDots = false
        this.innerHTML = "dots+lines"
    }
    else {
        justDots = true
        this.innerHTML = "just dots"
    }
    document.getElementById("typ") = "last to new"
    brush = false
    document.getElementById("brush").innerHTML = "no brush"
})
document.getElementById("firstToLast").addEventListener("click", function () {
    firstToLast(tab)
})
document.getElementById("connectDots").addEventListener("click", function () {
    if (tab.length >= 2) {
        connectAllDots(tab)
    }
})
document.getElementById("brush").addEventListener("click", function () {
    if (brush) {
        brush = false
        this.innerHTML = "no brush"
    }
    else {
        brush = true
        this.innerHTML = "brush"
    }

})
document.getElementById("thickness").addEventListener("change", function () {
    if (Number(this.value) <= 0)
        thickness = 1
    if (Number(this.value) > 999)
        thickness = 999
    if (Number(this.value) > 0 && Number(this.value) < 1000)
        thickness = Number(this.value)

})
document.getElementById("file").addEventListener("input", function (e) {
    image = new Image()
    image.src = URL.createObjectURL(e.target.files[0])
    tab = []
    clear()
    image.onload = function () {
        ctx.drawImage(image, 0, 0)
    }
})
document.getElementById("clear").addEventListener("click", function () {
    clear()
    tab = []
})
document.getElementById("clearAll").addEventListener("click", function () {
    clearAll()
})
document.getElementById("save").addEventListener("click", function () {
    var d = c.toDataURL("image/png");
    var w = window.open('about:blank', 'image from canvas');
    w.document.write("<img src='" + d + "' alt='from canvas'/>");
})
document.getElementById("blue").addEventListener("click", function () {
    color = "blue"
    var divs = document.getElementsByClassName("chosen")
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("chosen")
    }
    this.classList.add("chosen")
})
document.getElementById("red").addEventListener("click", function () {
    color = "red"
    var divs = document.getElementsByClassName("chosen")
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("chosen")
    }
    this.classList.add("chosen")
})
document.getElementById("green").addEventListener("click", function () {
    color = "green"
    var divs = document.getElementsByClassName("chosen")
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("chosen")
    }
    this.classList.add("chosen")
})
document.getElementById("black").addEventListener("click", function () {
    color = "black"
    var divs = document.getElementsByClassName("chosen")
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("chosen")
    }
    this.classList.add("chosen")
})
document.getElementById("yellow").addEventListener("click", function () {
    color = "yellow"
    var divs = document.getElementsByClassName("chosen")
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("chosen")
    }
    this.classList.add("chosen")
})
document.getElementById("pink").addEventListener("click", function () {
    color = "pink"
    var divs = document.getElementsByClassName("chosen")
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("chosen")
    }
    this.classList.add("chosen")
})
document.getElementById("magenta").addEventListener("click", function () {
    color = "magenta"
    var divs = document.getElementsByClassName("chosen")
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("chosen")
    }
    this.classList.add("chosen")
})
document.getElementById("white").addEventListener("click", function () {
    color = "white"
    var divs = document.getElementsByClassName("chosen")
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("chosen")
    }
    this.classList.add("chosen")
})
document.getElementById("main").style.height = window.innerHeight + "px"
window.onresize=function(e){
    document.getElementById("main").style.height = window.innerHeight + "px"
}
function line(tab) {
    if (tab.length >= 2) {
        var len = tab.length
        ctx.beginPath()
        ctx.moveTo(tab[len - 2].x, tab[len - 2].y)
        ctx.lineTo(tab[len - 1].x, tab[len - 1].y)
        ctx.strokeStyle = color
        ctx.lineWidth = thickness;
        ctx.stroke()
        numberOfLines++
    }
    updateLines()
}
function lineToAll(tab) {
    var len = tab.length
    for (var i = 0; i < len - 1; i++) {
        ctx.beginPath()
        ctx.moveTo(tab[i].x, tab[i].y)
        ctx.lineTo(tab[len - 1].x, tab[len - 1].y)
        ctx.strokeStyle = color
        ctx.lineWidth = thickness;
        ctx.stroke()
        numberOfLines++
    }
    updateLines()
}
function firstToLast(tab) {
    if (tab.length >= 2) {
        var len = tab.length
        ctx.beginPath()
        ctx.moveTo(tab[0].x, tab[0].y)
        ctx.lineTo(tab[len - 1].x, tab[len - 1].y)
        ctx.strokeStyle = color
        ctx.lineWidth = thickness;
        ctx.stroke()
        numberOfLines++
    }
    updateLines()
}
function clear() {
    ctx.clearRect(0, 0, c.width, c.height)
    if (image != "") {
        ctx.drawImage(image, 0, 0)
    }
    numberOfLines = 0
    updateLines()
}
function clearAll() {
    ctx.clearRect(0, 0, c.width, c.height)
    numberOfLines = 0
    updateLines()
    tab = []
    image = ""
    document.getElementById("file").value = ""
}
function updateLines() {
    document.getElementById("nOL").innerHTML = "Lines: " + numberOfLines
}
function newDot(e) {
    var coord = { x: e.offsetX, y: e.offsetY }
    tab.push(coord)
    ctx.beginPath()
    ctx.arc(coord.x, coord.y, 1, 0, 2 * Math.PI)
    ctx.strokeStyle = color
    ctx.stroke();
}
function paintDots(e) {
    var coord = { x: e.offsetX, y: e.offsetY }
    tab.push(coord)
    if (lastDot.length == 1) {
        ctx.beginPath()
        ctx.moveTo(coord.x, coord.y)
        ctx.lineTo(lastDot[0].x, lastDot[0].y)
        ctx.strokeStyle = color
        ctx.lineWidth = thickness;
        ctx.stroke();
        lastDot = []
        lastDot.push(coord)
    }
    if (lastDot.length > 1) {
        lastDot = []
        lastDot.push(coord)
    }
    if (lastDot.length == 0) {
        ctx.beginPath()
        ctx.arc(coord.x, coord.y, 1, 0, 2 * Math.PI)
        ctx.strokeStyle = color
        ctx.lineWidth = thickness;
        ctx.stroke();
        lastDot.push(coord)
    }
}
function connectAllDots(tab) {
    for (var i = 1; i < tab.length; i++) {
        ctx.beginPath()
        ctx.moveTo(tab[i - 1].x, tab[i - 1].y)
        ctx.lineTo(tab[i].x, tab[i].y)
        ctx.strokeStyle = color
        ctx.lineWidth = thickness;
        ctx.stroke()
        numberOfLines++
    }
    firstToLast(tab)
    updateLines()
}
function newLine(){
    
}