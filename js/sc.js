window.onload = function () {
    //button
    var summit_btn = document.querySelector('#arrow-btn')

    //input value
    const input_day = document.querySelector("#day");
    const input_month = document.querySelector("#month");
    const intput_year = document.querySelector("#year");

    //output show
    const output_day = document.querySelector(".output_day");
    const output_month = document.querySelector(".output_month");
    const output_year = document.querySelector(".output_year");

    const date = new Date();

    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    //error text
    const required_txt = document.querySelectorAll('.required');
    const label = document.querySelectorAll('label');
    const input_box = document.querySelectorAll('input');

    const add = (i) => [
        required_txt[i].classList.add('open'),
        label[i].classList.add('redtxt'),
        input_box[i].classList.add('error')
    ]

    const errorState = (numberOfError, typeOfDate, add, color) => {
        required_txt[numberOfError].innerHTML = typeOfError;
        label[numberOfError].style.color = color;
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

    const isDayCorrect = () => {
        if (input_day.value == '') {
            errorState(0, day, typeOafError[1], "#ff5757");
            // add(0);
            console.log('empty day');
        }
        else if (input_day.value <= 0 || input_day.value > 31) {
            add(0);
            console.log('not valid');
        }
        else if (isLeapYear(input_day.value, input_month.value, intput_year.value) == false) {
            add(0);
            console.log('LeapYear.day');
        }
        else {
            remove(0);
        }
    }
    const isMonthCorrect = () => {
        if (input_month.value == '') {
            add(1);
            console.log('empty month');
        }
        else if (input_month.value <= 0 || input_month.value > 12) {
            add(1);
            console.log('not valid');
        }
        else if (isLeapYear(input_day.value, input_month.value, intput_year.value) == false) {
            add(1);
            console.log('LeapYear.month');
        }
        else {
            remove(1);
        }
    }

    const isYearCorrect = () => {
        if (intput_year.value == '') {
            add(2);
            console.log('empty Year');
        }
        else if (intput_year.value <= 0 || intput_year.value > currentYear) {
            add(2);
            console.log('not valid');
        }
        else if (intput_year.value == currentYear && input_month.value > currentMonth) {
            errorState(2);
            console.log('not valid month in this month');
        }
        else if (intput_year.value == currentYear && input_month.value == currentMonth && input_day.value > currentDay) {
            add(2);
            console.log('not valid day in this year');
        }
        else if (isLeapYear(input_day.value, input_month.value, intput_year.value) == false) {
            add(2);
            remove[0] = required_txt[2].classList.remove('open');
            console.log('LeapYear.year');
        }
        else {
            remove(2);
        }
    }


    const substractAge = () => {
        let newYear = Math.abs(currentYear - year.value);

        let newMonth = 0;
        if (currentMonth >= month.value) {
            newMonth = currentMonth - month.value;
        }
        else {
            newYear--;
            newMonth = 12 + currentMonth - month.value;
        }

        let newDay = 0;
        if (currentDay >= day.value) {
            newDay = currentDay - day.value;
        }
        else {
            newMonth--;
            if (isLeapYear(day.value, month.value, year.value)) {
                newDay = 30 + currentDay - day.value;
            }
            else {
                newDay = currentDay - day.value;
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
    summit_btn.addEventListener("click", () => {

        isDayCorrect();
        isMonthCorrect();
        isYearCorrect();
        if (isDayCorrect() && isMonthCorrect() && isYearCorrect()) {
            substractAge();
        }
    })
}