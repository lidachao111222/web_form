// Applicant Name
let applicantName = document.querySelector("#name");

// Marital Status
let status = document.querySelector("#maritalStatus");

// marital Status
let maritalStatus = document.querySelector("#maritalStatus");

// canadian Address
let canadianAddress = document.querySelector("#canadianAddress");

// city
let city = document.querySelector("#city");

// date of birth
let dateOfBirth = document.querySelector("#dateOfBirth");

// email
let emailAddress = document.querySelector("#email");

// phone number
let phoneNumber = document.querySelector("#canadianPhoneNumber");

// get button element
let submitButton = document.querySelector("#subButton");

// get citylist element
let cityListOptions = document.querySelector("#cityListOptions");

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
      cityListOptions.appendChild(cityOption);
    });
  } catch (error) {
    console.error(error.message);
  }
};

const validateDateOfBirth = () => {
  // birth input event
  dateOfBirth.addEventListener("blur", function () {
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

const validateEmail = () => {
  // email input event
  emailAddress.addEventListener("blur", function () {
    // check if is a email email address.
    const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/;
    const emailValue = emailAddress.value.trim();
    // First check if the email value is empty
    if (emailValue.length === 0) {
      return;
    }
    // Then check if it matches the email pattern
    if (!emailReg.test(emailValue)) {
      // alert("This is not a correct email address, please type again.");
      emailAddress.classList.add("is-invalid");
      // this.value = "";
    }
  });

  // remove the warning if the length is zero
  emailAddress.addEventListener("keyup", function () {
    const emailValue = emailAddress.value.trim();
    if (emailValue.length === 0) {
      emailAddress.classList.remove("is-invalid");
    }
  });
};

const handleSubmit = () => {
  // submit button event
  submitButton.addEventListener("click", function () {
    // if name is empty ask for input
    if (applicantName.value.length === 0) {
      alert("the Applicant Name is required, please enter your name");
      return;
    }

    // console.log(applicantName.value);
    // console.log(maritalStatus.value);
    // console.log(canadianAddress.value);
    // console.log(dateOfBirth.value);
    // console.log(emailAddress.value);
    // console.log(city.value);
  });
};

function main() {
  getCityList();
  validateDateOfBirth();
  validateEmail();
  handleSubmit();
}

main();
