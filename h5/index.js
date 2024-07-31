//TODO should be element

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

// TODO province

// postcode
let postcode = document.querySelector("#postcode");

// date of birth
let dateOfBirth = document.querySelector("#dateOfBirth");

// email
let emailAddress = document.querySelector("#email");

// phone number
let phoneNumber = document.querySelector("#canadianPhoneNumber");

// indigenous checkbox
let indigenousCheckBox = document.querySelector("#indigenousCheckBox");

// nationality input element
let nationalityInputELement = document.querySelector(
  "#nationalityInputELement"
);

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

const validatePostCode = () => {
  // postcode input event
  postcode.addEventListener("blur", function () {
    // check if is a email email address.
    const postCodeReg =
      /^[abceghj-nprstvxy]\d[abceghj-nprstv-z] \d[abceghj-nprstv-z]\d$/i;

    const postcodeValue = postcode.value.trim();
    // First check if the postcode value is empty
    if (postcodeValue.length === 0) {
      return;
    }
    // Then check if it matches the postcode pattern
    if (!postCodeReg.test(postcodeValue)) {
      postcode.classList.add("is-invalid");
    }
  });

  // remove the warning if the length is zero
  postcode.addEventListener("keyup", function () {
    const postcodeValue = postcode.value.trim();
    if (postcodeValue.length === 0) {
      postcode.classList.remove("is-invalid");
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
      emailAddress.classList.add("is-invalid");
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

const handleIndigenousCheckBox = () => {
  indigenousCheckBox.addEventListener("change", function () {
    if (this.checked) {
      nationalityInputELement.classList.remove("d-none");
    } else {
      nationalityInputELement.classList.add("d-none");
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
  validatePostCode();
  validateEmail();
  handleIndigenousCheckBox();
  handleSubmit();

  //TODO the postcpde's letter need to be cap
}

main();
