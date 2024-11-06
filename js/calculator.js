let buttons = document.getElementById("buttons")
let displayTopTextElem = document.getElementById("displaytoptext")
let displayBottomTextElem = document.getElementById("displaybottomtext")

let displayTopText = displayTopTextElem.innerText
let displayBottomText = displayBottomTextElem.innerText

// Function to handle the input for both click and keydown events
function handleInput(elementText) {
    // If a number is pressed, add it to the display
    if (!isNaN(elementText)) {
        if (displayBottomText === "0") {
            // If the text is 0 then set it to the button pressed
            displayBottomText = elementText
        } else {
            if (displayTopText.length > 0) {
                // If the top text exists
                if (displayTopText.split(" ")[0] == displayBottomText) {
                    // If the top and bottom text are the same then reset
                    displayBottomText = elementText
                } else if (displayTopText.includes("=")) {
                    // Reset when a number is pressed after a calculation is finished
                    displayTopText = ""
                    displayBottomText = elementText
                } else {
                    // Otherwise add the number to the bottom text
                    displayBottomText += elementText
                }
            } else {
                // Add the number to the bottom text
                displayBottomText += elementText
            }
        }
    } else { // If other than a number is pressed
        if (elementText === "C") {
            // Clear everything
            displayTopText = ""
            displayBottomText = "0"
        } else if (elementText === "CE") { 
            // Clear the most recent
            displayBottomText = "0"
        } else if (elementText === ".") {
            // Add decimal
            if (!displayBottomText.includes(".")) {
                displayBottomText += "."
            }
        } else if (elementText === "=") {
            // Complete equation
            if (displayTopText.length > 0 && displayBottomText.length > 0 && !displayTopText.includes("=")) {
                let result = eval(displayTopText + displayBottomText) // Calculate the result
                displayTopText += ` ${displayBottomText} =` // Add "=" to the top text
                displayBottomText = result.toString() // Set the bottom text to the result
            }
        } else {
            // Addition, Subtraction, Multiplication, etc.
            if (!isNaN(displayBottomText)) {
                displayTopText = `${displayBottomText} ${elementText}` // Add the symbol to the top text
            }
        }
    }

    // Update the DOM with the new values
    displayTopTextElem.innerText = displayTopText
    displayBottomTextElem.innerText = displayBottomText
}

// Add click event listeners to each button
for (let i = 0; i < buttons.children.length; i++) {
    let element = buttons.children[i]
    let elementText = element.innerText
    element.addEventListener("click", function() {
        handleInput(elementText)
    })
}

// Add keydown event listener to handle keyboard input
document.addEventListener("keydown", function(event) {
    let key = event.key
    let validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "C", "CE", "+", "-", "*", "/", "="]

    // Check if the pressed key is valid
    if (validKeys.includes(key)) {
        // Map "Enter" key to "="
        if (key === "Enter") key = "="

        handleInput(key)
    }
})