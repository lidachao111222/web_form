import { loadLanguage, submitAlertCheck } from "../utils/language.js";
import {
  addValidationListeners,
  validateDateOfBirth,
} from "../utils/validation.js";
import updateDropdown from "../utils/updateDropdown.js";

// select element of changing language
const changeLanguageElement = document.querySelector("#changeLanguage");
// Applicant Name
const applicantNameElement = document.querySelector("#name");
// marital Status
const maritalStatusElement = document.querySelector("#maritalStatus");
// canadian Address
const canadianAddressElement = document.querySelector("#canadianAddress");
// city
const cityElement = document.querySelector("#city");
// province
const provinceElement = document.querySelector("#province");
// postcode
const postcodeElement = document.querySelector("#postcode");
// date of birth
const dateOfBirthElement = document.querySelector("#dateOfBirth");
// email
const emailAddressElement = document.querySelector("#email");
// phone country code
// let phoneCodeElement = document.querySelector("#phoneCode");
// phone number
const phoneNumberElement = document.querySelector("#canadianPhoneNumber");
// indigenous checkbox
const indigenousCheckBoxElement = document.querySelector("#indigenousCheckBox");
// nationality input element
const nationalityInputELement = document.querySelector(
  "#nationalityInputELement"
);
// get button element
const submitButtonElement = document.querySelector("#subButton");
// from state element
const formStateElement = document.querySelector("#formState");
// get citylist element
const cityListOptionsElement = document.querySelector("#cityListOptions");
// get phoneCodeList element
const countryCodeElement = document.querySelector("#phoneCodeListOptions");

// add event listener when change the language
const changeLanguage = () => {
  changeLanguageElement.addEventListener("change", function () {
    loadLanguage(changeLanguageElement.value);
  });
};

// request city list from json file
const getCityList = () => {
  updateDropdown("canadian_cities.json", cityListOptionsElement);
};

// request country code list from json file
const getCountryCodeList = () => {
  updateDropdown("country_code.json", countryCodeElement);
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
      submitAlertCheck(changeLanguageElement.value);
      return;
    }

    let canadianAddress = `${canadianAddressElement.value.trim()}, ${cityElement.value.trim()}, ${provinceElement.value.trim()}, ${postcodeElement.value.trim()}`;
    canadianAddress;

    let collectInfo = {
      applicantName: applicantNameElement.value.trim(),
      maritalStatus: maritalStatusElement.value,
      canadianAddress,
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
  // init language
  loadLanguage("en");
  changeLanguage();
  getCityList();
  getCountryCodeList();
  initValidators();
  handleIndigenousCheckBox();
  handleSubmit();
}

main();
