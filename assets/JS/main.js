import {
  isExists,
  isAfter,
  format,
  formatDistance,
  formatRelative,
  subDays,
} from "../../node_modules/date-fns";

const getInputs = () => {
  const dayInput = document.querySelector("#day-input");
  const monthInput = document.querySelector("#month-input");
  const yearInput = document.querySelector("#year-input");

  return {
    dayInput,
    monthInput,
    yearInput,
  };
};

const dateForm = document.querySelector(".date-form");

dateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { dayInput, monthInput, yearInput } = getInputs();
  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);
  const data = {
    day,
    month,
    year,
  };
  const bday = bDay(year, month, day);

  validateInputs(data, bday);
});
function bDay(year, month, day) {
  return new Date(`${year}-${month}-${day}`);
}

const errorMsg = {
  validDate: "Must be a valid date",
  validDay: "Must be a valid day",
  validMonth: "Must be a valid month",
  past: "Must be in the past",
  field: "This field is required",
};
function getP() {
  return {
    dayP: document.querySelector(".day-error-txt"),
    monthP: document.querySelector(".month-error-txt"),
    yearP: document.querySelector(".year-error-txt"),
  };
}

function validateInputs(data, bday) {
  const { dayP, monthP, yearP } = getP();
  const { day, month, year } = data;
  const { dayInput, monthInput, yearInput } = getInputs();
  const check = { day, month, year };
  const today = new Date();

  //day
  if (day == "") {
    check.day = false;
    setError(dayInput, dayP, errorMsg.field);
  } else if (day < 1 || day > 31) {
    check.day = false;
    setError(dayInput, dayP, errorMsg.validDay);
  } else {
    check.day = true;
    setSuccess(dayInput);
  }

  //month
  if (month == "") {
    check.month = false;
    setError(monthInput, monthP, errorMsg.field);
  } else if (month < 1 || month > 12) {
    check.month = false;
    setError(monthInput, monthP, errorMsg.validMonth);
  } else {
    check.month = true;
    setSuccess(monthInput);
  }

  //year
  if (year == "") {
    check.year = false;
    setError(yearInput, yearP, errorMsg.field);
  } else if (year > today.getFullYear()) {
    check.year = false;
    setError(yearInput, yearP, errorMsg.past);
  } else {
    check.year = true;
    setSuccess(yearInput);
  }

  //date
  if (check.day && check.year && check.month) {
    if (!isExists(year, month - 1, day)) {
      setSuccess("allInputs");
      setError("allInputs", dayP, errorMsg.validDate);
    } else if (isAfter(bday, today)) {
      setSuccess("allInputs");
      setError("allInputs", dayP, errorMsg.past);
    } else {
      setSuccess("allInputs");
      ageCalc(bday);
    }
  }
}

function setError(input, p, message) {
  let div = input.parentElement;
  if (input === "allInputs") {
    for (const c of dateForm.children) {
      for (const j of c.children) {
        j.classList.add("error");
      }
    }
  } else {
    for (const c of div.children) {
      c.classList.add("error");
    }
  }
  p.innerText = message;
}

function setSuccess(input) {
  const { dayP, monthP, yearP } = getP();
  let div = input.parentElement;

  if (input === "allInputs") {
    debugger;
    dayP.innerText = "";
    monthP.innerText = "";
    yearP.innerText = "";
    for (const c of dateForm.children) {
      for (const j of c.children) {
        j.classList.remove("error");
      }
    }
  } else {
    for (const c of div.children) {
      c.classList.remove("error");
    }
  }
}

function ageCalc(bday) {
  const today = new Date();
  const msLong = today - bday;
  const daysLong = Math.floor(msLong / 1000 / 60 / 60 / 24);
  const yearsCalc = Math.floor(daysLong / 365);
  const monthsCalc = Math.floor((daysLong % 365.25) / 30);
  const daysCalc = Math.ceil((daysLong % 365.25) % 30);
  console.log(yearsCalc, monthsCalc, daysCalc);
  displayCalc(yearsCalc, monthsCalc, daysCalc);
  return {
    yearsCalc,
    monthsCalc,
    daysCalc,
  };
}

const getDisplays = () => {
  const dayDisplay = document.querySelector(".day-results");
  const monthDisplay = document.querySelector(".month-results");
  const yearDisplay = document.querySelector(".year-results");
  return {
    dayDisplay,
    monthDisplay,
    yearDisplay,
  };
};
function displayCalc(yearsCalc, monthsCalc, daysCalc) {
  const { dayDisplay, monthDisplay, yearDisplay } = getDisplays();
  dayDisplay.innerText = daysCalc;
  monthDisplay.innerText = monthsCalc;
  yearDisplay.innerText = yearsCalc;
}
