const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange"); 
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black"

canvas.width = 700;
canvas.height = 600;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width , canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPaning() {
    painting = false
}

function startPainting() {
    painting = true
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handelRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function hnadleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width , canvas.height);
    }
}

function handelRightClick(event) {
    event.preventDefault();
}

function handelSaveClick(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPaning);
    canvas.addEventListener("mouseleave", stopPaning);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handelRightClick);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handelRangeChange)
}

if(mode) {
    mode.addEventListener("click", hnadleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handelSaveClick);
}
