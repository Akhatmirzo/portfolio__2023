// ! Local Timezone
const timeHour = document.querySelector('.time-hour');
const timeMinute = document.querySelector('.time-minute');

// ! A special function that determines the time
function localTime() {
    const timeNow = new Date();
    timeHour.innerHTML = timeNow.getHours();

    if (timeNow.getMinutes() < 10) {
        timeMinute.innerHTML = `0${timeNow.getMinutes()}`;
    } else {
        timeMinute.innerHTML = timeNow.getMinutes();
    }
}

// ! A function that updates the time change checker
setInterval(localTime, 1000);


// ! ----------------------------------------------------------------

// ! Calc Display
const displayValue = document.getElementById("displayValue");
const result = document.querySelector('.result');

// ! calc control
const numberBtns = document.querySelectorAll('.number');
const operationBtns = document.querySelectorAll('.operation');

// ! Calc number Buttons
numberBtns.forEach(res => {
    res.addEventListener("click", () => {
        if (displayValue.value == 0) displayValue.value = '';
        displayValue.value += res.value;
        lastNumber = res.value;
    })
});

// ! Calc operation Buttons
operationBtns.forEach(res => {
    res.addEventListener("click", () => {
        if (displayValue.value == 0) displayValue.value = '';
        if (displayValue.value == 0 && (res.value == '/' || res.value == '*' || res.value == '+')) { displayValue.value = '0'; }
        else {
            displayValue.value += res.value;
            lastOperation = res.value;
        }
    })
});

// ! Display Number length of field
function displayValueLength() {
    let dispValueLength = displayValue.value.length;

    if (dispValueLength >= 0 && dispValueLength <= 8) {
        displayValue.style.fontSize = '72px';
    } else if (dispValueLength >= 8 && dispValueLength <= 12) {
        displayValue.style.fontSize = '45px';
    } else if (dispValueLength > 12) {
        displayValue.style.fontSize = '30px';
    }

    if (dispValueLength >= 18) {
        numberBtns.forEach(res => {
            res.setAttribute("disabled", "");
            window.addEventListener('keydown', function (event) {
                if (event.keyCode >= 48 && event.keyCode <= 57) {
                    event.preventDefault();
                    return false;
                }
            });
        });
        operationBtns.forEach(res => {
            res.setAttribute("disabled", "");
        });
    } else {
        numberBtns.forEach(res => {
            res.removeAttribute("disabled", "");
        });
        operationBtns.forEach(res => {
            res.removeAttribute("disabled", "");
        });
    }
}

// ! A function that auto-runs a function
setInterval(displayValueLength, 10);

// ! function to output the responses
function answer() {
    let answer = eval(displayValue.value)
    if (answer === undefined) {
        result.innerHTML = '0';
        displayValue.value = '0';
    } else {
        result.innerHTML = answer;
    }
}

// ! Special function for cleaning the field
function clearDisplay() {
    result.innerHTML = '0';
    displayValue.value = '0';
}

// ! A function that executes an action when Enter is pressed
window.addEventListener('keydown', function (event) {
    return event.keyCode == 13 ? answer() : '';
});

