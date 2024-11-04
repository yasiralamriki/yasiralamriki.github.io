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
                displaybottomtext.innerText = element.innerText
            } else {
                if (displaytoptext.innerText.length > 0) {
                    if (displaytoptext.innerText.split(" ")[0] == displaybottomtext.innerText) {
                        displaybottomtext.innerText = element.innerText
                    } else if (displaytoptext.innerText.includes("=")) {
                        displaytoptext.innerText = ""
                        displaybottomtext.innerText = "0"
                    } else {
                        displaybottomtext.innerText += element.innerText
                    }
                } else {
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
                    let result = eval(displaytoptext.innerText + displaybottomtext.innerText)
                    displaytoptext.innerText += ` ${displaybottomtext.innerText} =`
                    displaybottomtext.innerText = result
                }
            } else {
                // Addition, Subtraction, Multiplication, etc.
                if (!isNaN(displaybottomtext.innerText)) {
                    displaytoptext.innerText = `${displaybottomtext.innerText} ${element.innerText}`
                }
            }
        }
    })
}