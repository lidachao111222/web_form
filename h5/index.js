//TODO should be element

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

// get citylist element
let cityListOptionsElement = document.querySelector("#cityListOptions");

// request city list from json file
const getCityList = async () => {
  try {
    const response = await fetch("../canadian_cities.json");
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

const validateDateOfBirth = () => {
  // birth input event
  dateOfBirthElement.addEventListener("blur", function () {
    // get selected date
    const selectedDate = new Date(this.value);
    selectedDate.setHours(0, 0, 0, 0);
    // get current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    // compare
    if (currentDate.valueOf() < selectedDate.valueOf()) {
      alert("Date cannot be later than today.");
      this.value = "";
    }
  });
};

const validatePostCode = () => {
  // postcode input event
  postcodeElement.addEventListener("blur", function () {
    // check if is a email email address.
    const postCodeReg =
      /^[abceghj-nprstvxy]\d[abceghj-nprstv-z] \d[abceghj-nprstv-z]\d$/i;

    const postcodeValue = postcodeElement.value.trim();
    // First check if the postcode value is empty
    if (postcodeValue.length === 0) {
      return;
    }
    // Then check if it matches the postcode pattern
    if (!postCodeReg.test(postcodeValue)) {
      postcodeElement.classList.add("is-invalid");
    }
  });

  // remove the warning if the length is zero
  postcodeElement.addEventListener("keyup", function () {
    const postcodeValue = postcode.value.trim();
    if (postcodeValue.length === 0) {
      postcodeElement.classList.remove("is-invalid");
    }
  });
};

const validateEmail = () => {
  // email input event
  emailAddressElement.addEventListener("blur", function () {
    // check if is a email email address.
    const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/;
    const emailValue = emailAddressElement.value.trim();
    // First check if the email value is empty
    if (emailValue.length === 0) {
      return;
    }
    // Then check if it matches the email pattern
    if (!emailReg.test(emailValue)) {
      emailAddressElement.classList.add("is-invalid");
    }
  });

  // remove the warning if the length is zero
  emailAddressElement.addEventListener("keyup", function () {
    const emailValue = emailAddressElement.value.trim();
    if (emailValue.length === 0) {
      emailAddressElement.classList.remove("is-invalid");
    }
  });
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

    // console.log(applicantNameElement.value);
    // console.log(maritalStatusElement.value);
    // console.log(canadianAddressElement.value);
    // console.log(cityElement.value);
    // console.log(provinceElement.value);
    // console.log(postcodeElement.value);
    // console.log(dateOfBirthElement.value);
    // console.log(emailAddressElement.value);
    // console.log(phoneNumberElement.value);
    // console.log(indigenousCheckBoxElement.checked);
    // console.log(nationalityInputELement.value);
  });
};

function main() {
  getCityList();
  validateDateOfBirth();
  validatePostCode();
  validateEmail();
  handleIndigenousCheckBox();
  handleSubmit();

  //TODO the postcpde's letter need to be cap
}

main();
