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

    const errorState = (i) => {
        for (let i = 0; i < required_txt.length; i++) {
        required_txt[i].classList.add('open');
        label[i].classList.add('redtxt');
        input_box[i].classList.add('error');
        }
    }

    const removeError = (i) => {
        for (let i = 0; i < required_txt.length; i++) {
            required_txt[i].classList.remove('open');
            label[i].classList.remove('redtxt');
            input_box[i].classList.remove('error');
        }
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
        //year calculate

        let newYear = currentYear - intput_year.value;

        //month calculate
        let newMonth = 0;
        if (currentMonth >= input_month.value) {
            newMonth = currentMonth - input_month.value;
        }
        else {
            newYear--;
            newMonth = 12 + currentMonth - input_month.value;
        }

        //day calculate
        let newDay = 0;
        if (currentDay >= input_day.value) {
            newDay = currentDay - input_day.value;
        }
        else {
            newMonth--;
            if (isLeapYear(input_day.value, input_month.value, intput_year.value)) {
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

        output_day.innerHTML = newDay;
        output_month.innerHTML = newMonth;
        output_year.innerHTML = newYear;
    }

    const isDayCorrect = () => {
        if (input_day.value == "") {
            errorState(0);
            return false;
        }
        else if (input_day.value <= 0 || input_day.value > 31) {
            errorState(0);
            return false;
        }
        else if (isLeapYear(input_day.value, input_month.value, intput_year.value) == false) {
            errorState(0);
            return false;
        }
        else {
            removeError();
            return true;
        }
    }

    const isMonthCorrect = () => {
        if (input_month.value == "") {
            errorState(1);
            return false;
        }
        else if (input_month.value <= 0 || input_month.value > 12) {
            errorState(1);
            return false;
        }
        else if (isLeapYear(input_day.value, input_month.value, intput_year.value) == false) {
            return false;
        }
        else {
            removeError();
            return true;
        }
    }

    const isYearCorrect = () => {
        if (intput_year.value == "") {
            errorState(2);
            return false;
        }
        else if (intput_year.value < 0 || intput_year.value > currentYear) {
            errorState(2);
            return false;
        }
        else if (intput_year.value == currentYear && input_month.value > currentMonth) {
            errorState(2);
            return false;
        }
        else if (intput_year.value == currentYear && input_month.value == currentMonth && input_day.value > currentDay) {
            errorState(2);
            return false;
        }
        else if (isLeapYear(input_day.value, input_month.value, intput_year.value) == false) {
            errorState(2);
            return false;
        }
        else {
            removeError();
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