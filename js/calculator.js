let buttons = document.getElementById("buttons")
let display = document.getElementById("display")
let displaybottomtext = document.getElementById("displaybottomtext")
let displaytoptext = document.getElementById("displaytoptext")

for (let i = 0; i < buttons.children.length; i++) {
    let element = buttons.children[i]

    element.addEventListener("click", function() {
        // If a number is pressed, add it to the display
        if (isNaN(element.innerText) == false) {
            if (displaybottomtext.innerText == "0") {
                // If the text is 0 then set it to to the button pressed
                displaybottomtext.innerText = element.innerText
            } else {
                if (displaytoptext.innerText.length > 0) {
                    // If the top text exists
                    if (displaytoptext.innerText.split(" ")[0] == displaybottomtext.innerText) {
                        // If the top and bottom text are the same then reset
                        displaybottomtext.innerText = element.innerText
                    } else if (displaytoptext.innerText.includes("=")) {
                        // Reset when a number is pressed after a calculation is finished
                        displaytoptext.innerText = ""
                        displaybottomtext.innerText = "0"
                    } else {
                        // Otherwise add the number to the bottom text
                        displaybottomtext.innerText += element.innerText
                    }
                } else {
                    // Add the number to the bottom text
                    displaybottomtext.innerText += element.innerText
                }
            }
        } else { // If other than a number is pressed
            if (element.innerText == "C") {
                // Clear everything
                displaytoptext.innerText = ""
                displaybottomtext.innerText = "0"
            } else if (element.innerText == "CE") { 
                // Clear the most recent
                displaybottomtext.innerText = "0"
            } else if (element.innerText == ".") {
                // Add decimal
                if (!displaybottomtext.innerText.includes(".")) {
                    displaybottomtext.innerText += "."
                }
            } else if (element.innerText == "=") {
                // Complete equation
                if (displaytoptext.innerText.length > 0 && displaybottomtext.innerText.length > 0 && !displaytoptext.innerText.includes("=")) {
                    let result = eval(displaytoptext.innerText + displaybottomtext.innerText) // Calculate the result
                    displaytoptext.innerText += ` ${displaybottomtext.innerText} =` // Add "=" to the top text
                    displaybottomtext.innerText = result // Set the bottom text to the result
                }
            } else {
                // Addition, Subtraction, Multiplication, etc.
                if (!isNaN(displaybottomtext.innerText)) {
                    displaytoptext.innerText = `${displaybottomtext.innerText} ${element.innerText}` // Add the symbol to the top text
                }
            }
        }
    })
}