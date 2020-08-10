var button, thickness, plusButton, minusButton, confirmButton, colorInput, color, message, posArray, database, xPos, yPos;
thickness = 10;
color = "black"

function setup() {
    database = firebase.database();

    createCanvas(displayWidth - 50, displayHeight - 200);

    button = createButton("Clear Canvas")
    button.position((displayWidth - 50)/2, displayHeight - 250)

    colorInput = createInput("black")
    confirmButton = createButton("Set Color")

    plusButton = createButton("+ thickness")
    minusButton = createButton("- thickness")

    plusButton.position(((displayWidth - 50)/2) + 115, displayHeight - 250)

    minusButton.position(((displayWidth - 50)/2) - 100, displayHeight - 250)

    message = createElement('h2')

    message.position(((displayWidth - 50)/2) - 130, 30)

    message.html("Click Set Color to start drawing!")
}

function draw() {
    database.ref('mousePos/x').on("value", (data)=> {
        xPos = data.val() 
    })

    database.ref('mousePos/y').on("value", (data)=> {
        yPos = data.val() 
    })

    ellipse(xPos, yPos, thickness)

    button.mousePressed(()=>{
        background("white")
        database.ref('mousePos').update({
            x: 0,
            y: 0
        })
    })

    plusButton.mousePressed(()=>{
        thickness+=1
    })

    minusButton.mousePressed(()=>{
        thickness-=1
    })

    confirmButton.mousePressed(()=>{
        color = colorInput.value();
    })

    if (xPos === 0 && yPos === 0) {
        background("white")
    }
}

function mouseDragged() {
    ellipseMode(CENTER)
    fill(color)
    noStroke()
    ellipse(mouseX, mouseY, thickness)

    database.ref('mousePos').update({
        x: mouseX,
        y: mouseY
    })
}