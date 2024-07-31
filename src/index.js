import {
  addValidationListeners,
  validateDateOfBirth,
} from "../utils/validation.js";

// Applicant Name
let applicantNameElement = document.querySelector("#name");

// marital Status
let maritalStatusElement = document.querySelector("#maritalStatus");

// canadian Address
let canadianAddressElement = document.querySelector("#canadianAddress");

// city
let cityElement = document.querySelector("#city");

// province
let provinceElement = document.querySelector("#province");

// postcode
let postcodeElement = document.querySelector("#postcode");

// date of birth
let dateOfBirthElement = document.querySelector("#dateOfBirth");

// email
let emailAddressElement = document.querySelector("#email");

// phone country code
// let phoneCodeElement = document.querySelector("#phoneCode");

// phone number
let phoneNumberElement = document.querySelector("#canadianPhoneNumber");

// indigenous checkbox
let indigenousCheckBoxElement = document.querySelector("#indigenousCheckBox");

// nationality input element
let nationalityInputELement = document.querySelector(
  "#nationalityInputELement"
);

// get button element
let submitButtonElement = document.querySelector("#subButton");

// from state element
let formStateElement = document.querySelector("#formState");

// get citylist element
let cityListOptionsElement = document.querySelector("#cityListOptions");

// get phoneCodeList element
let countryCodeElement = document.querySelector("#phoneCodeListOptions");

// request city list from json file
const getCityList = async () => {
  try {
    const response = await fetch("../json/canadian_cities.json");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const cityList = await response.json();
    // create element and append to the list element
    cityList.forEach((city) => {
      const cityOption = document.createElement("option");
      cityOption.textContent = city;
      cityOption.value = city;
      cityListOptionsElement.appendChild(cityOption);
    });
  } catch (error) {
    console.error(error.message);
  }
};

// request country code list from json file
const getCountryCodeList = async () => {
  try {
    const response = await fetch("../json/country_code.json");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const countryCodeList = await response.json();
    // create element and append to the list element
    countryCodeList.forEach((countryCode) => {
      const countryCodeOption = document.createElement("option");
      countryCodeOption.textContent = countryCode;
      countryCodeOption.value = countryCode;
      countryCodeElement.appendChild(countryCodeOption);
    });
  } catch (error) {
    console.error(error.message);
  }
};

const initValidators = () => {
  const postCodeReg =
    /^[abceghj-nprstvxy]\d[abceghj-nprstv-z] \d[abceghj-nprstv-z]\d$/i;
  const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/;
  const canadianPhoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  addValidationListeners(postcodeElement, postCodeReg);
  addValidationListeners(emailAddressElement, emailReg);
  addValidationListeners(phoneNumberElement, canadianPhoneRegex);
  validateDateOfBirth(dateOfBirthElement);
};

const handleIndigenousCheckBox = () => {
  indigenousCheckBoxElement.addEventListener("change", function () {
    if (this.checked) {
      nationalityInputELement.classList.remove("d-none");
    } else {
      nationalityInputELement.classList.add("d-none");
    }
  });
};

const handleSubmit = () => {
  // submit button event
  submitButtonElement.addEventListener("click", function () {
    // if name is empty ask for input
    if (applicantNameElement.value.length === 0) {
      alert("the Applicant Name is required, please enter your name");
      return;
    }

    let collectInfo = {
      applicantName: applicantNameElement.value.trim(),
      maritalStatus: maritalStatusElement.value,
      canadianAddress: `${canadianAddressElement.value.trim()}, ${
        cityElement.value
      }, ${provinceElement.value}, ${postcodeElement.value}`,
      dateOfBirth: dateOfBirthElement.value,
      emailAddress: emailAddressElement.value.trim(),
      canadianPhoneNumber: `${phoneNumberElement.value.trim()}`,
      isIndigenous: indigenousCheckBoxElement.checked,
      applicantNationality: nationalityInputELement.value.trim(),
    };

    let jsonString = JSON.stringify(collectInfo);
    formStateElement.textContent = jsonString;
  });
};

function main() {
  getCityList();
  getCountryCodeList();
  initValidators();
  handleIndigenousCheckBox();
  handleSubmit();
}

main();
