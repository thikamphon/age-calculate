window.onload = function () {
    //button
    var summit_btn = document.querySelector('#arrow-btn')

    //input value
    const input_day = document.querySelector("#day");
    const input_month = document.querySelector("#month");
    const input_year = document.querySelector("#year");

    //output show
    const output_day = document.querySelector(".output_day");
    const output_month = document.querySelector(".output_month");
    const output_year = document.querySelector(".output_year");

    //error text
    const error = document.querySelectorAll('.error');
    const labels = document.querySelectorAll('label');
    
    const date = new Date();

    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const typeOfError = [
        "",
        "This field is required",
        "Must be a valid day",
        "Must be a valid month",
        "Must be a valid year",
        "Must be a valid date"
    ];

    const errorState = (numberOfError, typeOfDate, typeOfError, color) => {
        error[numberOfError].innerHTML = typeOfError;
        labels[numberOfError].style.color = color;
        typeOfDate.style.borderColor = color;
    }


    const isLeapYear = (day, month, year) => {
        month = month - 1;
        fullDate = new Date(year, month, day);
        if (day == fullDate.getDate() && month == fullDate.getMonth() && year == fullDate.getFullYear())
            return true;
        else
            return false
    }

    const substractAge = () => {
        let newYear = Math.abs(currentYear - input_year.value);

        let newMonth = 0;
        if (currentMonth >= input_month.value) {
            newMonth = currentMonth - input_month.value;
        }
        else {
            newYear--;
            newMonth = 12 + currentMonth - input_month.value;
        }

        let newDay = 0;
        if (currentDay >= input_day.value) {
            newDay = currentDay - input_day.value;
        }
        else {
            newMonth--;
            if (isLeapYear(input_day.value, input_month.value, input_year.value)) {
                newDay = 30 + currentDay - input_day.value;
            }
            else {
                newDay = currentDay - input_day.value;
            }

            if (newMonth < 0) {
                newMonth = 11;
                newYear--;
            }
            if (newMonth < currentMonth) {
                newDay++;
            }
        }
        output_year.innerHTML = newYear;
        output_month.innerHTML = newMonth;
        output_day.innerHTML = newDay;
    }

    const isDayCorrect = () => {
        if (input_day.value == '') {
            errorState(0, input_day, typeOfError[1], "var(--Lightred)");
            console.log('empty day');
            return false;
        }
        else if (input_day.value <= 0 || input_day.value > 31) {
            errorState(0, input_day, typeOfError[2], "var(--Lightred)");
            console.log('not valid');
            return false;
        }
        else if (isLeapYear(input_day.value, input_month.value, input_year.value) == false) {
            errorState(0, input_day, typeOfError[5], "var(--Lightred)");
            console.log('LeapYear.day');
            return false;
        }
        else {
            errorState(0, input_day, typeOfError[0], "");
            return true;
        }
    }

    const isMonthCorrect = () => {
        if (input_month.value == '') {
            errorState(1, input_month, typeOfError[1], "var(--Lightred)");
            console.log('empty month');
            return false;
        }
        else if (input_month.value <= 0 || input_month.value > 12) {
            errorState(1, input_month, typeOfError[3], "var(--Lightred)");
            console.log('not valid');
            return false;
        }
        else if (isLeapYear(input_day.value, input_month.value, input_year.value) == false) {
            errorState(1, input_month, typeOfError[0], "var(--Lightred)");
            console.log('LeapYear.month');
            return false;
        }
        else {
            errorState(1, input_month, typeOfError[0], "");
            return true;
        }
    }

    const isYearCorrect = () => {
        if (input_year.value == '') {
            errorState(2, input_year, typeOfError[1], "var(--Lightred)");
            console.log('empty Year');
            return false;
        }
        else if (input_year.value <= 0 || input_year.value > currentYear) {
            errorState(2, input_year, typeOfError[4], "var(--Lightred)");
            console.log('not valid');
            return false;
        }
        else if (input_year.value == currentYear && input_month.value > currentMonth) {
            errorState(1, input_month, typeOfError[3], "var(--Lightred)");
            console.log('not valid month in this month');
            return false;
        }
        else if (input_year.value == currentYear && input_month.value == currentMonth && input_day.value > currentDay) {
            errorState(0, input_day, typeOfError[2], "var(--Lightred)");
            console.log('not valid day in this year');
            return false;
        }
        else if (isLeapYear(input_day.value, input_month.value, input_year.value) == false) {
            errorState(2, input_year, typeOfError[0], "var(--Lightred)");
            console.log('LeapYear.year');
            return false;
        }
        else {
            errorState(2, input_year, typeOfError[0], "");
            return true;
        }
    }


    summit_btn.addEventListener("click", () => {

        isDayCorrect();
        isMonthCorrect();
        isYearCorrect();
        if (isDayCorrect() && isMonthCorrect() && isYearCorrect()) {
            substractAge();
        }
    })
}
