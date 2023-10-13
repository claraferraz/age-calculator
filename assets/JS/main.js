import { isExists, isAfter } from "date-fns";

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

const errorMsg = {
  validDate: "Must be a valid date",
  validDay: "Must be a valid day",
  validMonth: "Must be a valid month",
  past: "Must be in the past",
  field: "This field is required",
};
function getP() {
  return {
    dayError: document.querySelector(".day-error-txt"),
    monthError: document.querySelector(".month-error-txt"),
    yearError: document.querySelector(".year-error-txt"),
  };
}

function validateInputs(data, bday) {
  const { dayError, monthError, yearError } = getP();
  const { day, month, year } = data;
  const { dayInput, monthInput, yearInput } = getInputs();

  const today = new Date();
  const allInputs = getInputs();

  //day
  if (day == "") {
    setError(dayInput, dayError, errorMsg.field);
    console.log(errorMsg.field);
  } else if (day < 1 || day > 31) {
    setError(dayInput, dayError, errorMsg.validDay);
  } else setSuccess(dayInput, bday);

  //month
  if (month == "") {
    setError(monthInput, monthError, errorMsg.field);
    console.log(errorMsg.field);
  } else if (month < 1 || month > 12) {
    setError(monthInput, monthError, errorMsg.validMonth);
  } else setSuccess(monthInput, bday);

  //year
  if (year == "") {
    setError(yearInput, yearError, errorMsg.field);
  } else if (year > today.getFullYear) {
    setError(yearInput, yearError, errorMsg.past);
  } else setSuccess(yearInput, bday);

  //date
  if (isAfter(bday, today)) {
    setError(allInputs, dayError, errorMsg.past);
    console.log(errorMsg.past);
  } else if (!isExists(year, month - 1, day)) {
    setError(allInputs, dayError, errorMsg.validDate);
    console.log(errorMsg.validDate);
  } else {
    setSuccess(allInputs, bday);
    console.log("data válida");
  }
}

function setError(input, p, message) {
  const allInputs = getInputs();
  if (input == allInputs) {
    for (const i in allInputs) {
      for (const c of i.children) {
        c.classList.add("error");
      }
    }
  }
  const div = input.parentElement;
  for (const c of div.children) {
    c.classList.add("error");
  }
  p.innerText = message;
}

function setSuccess(input, bday) {
  const div = input.parentElement;
  for (const c of div.children) {
    c.classList.remove("error");
  }
  ageCalc(bday);
}

function bDay(year, month, day) {
  return new Date(`${year}-${month}-${day}`);
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
  if (
    Number.isNaN(yearsCalc) ||
    Number.isNaN(monthsCalc) ||
    Number.isNaN(daysCalc)
  )
    return;
  else {
    const { dayDisplay, monthDisplay, yearDisplay } = getDisplays();
    dayDisplay.innerText = daysCalc;
    monthDisplay.innerText = monthsCalc;
    yearDisplay.innerText = yearsCalc;
  }
}
