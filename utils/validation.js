const addValidationListeners = (element, regex) => {
  // function that handle blur events
  const handleBlur = () => {
    const value = element.value.trim();
    if (value.length === 0) {
      return;
    }
    if (!regex.test(value)) {
      element.classList.add("is-invalid");
    }
  };

  // function that handle keyup events
  const handleKeyup = () => {
    const value = element.value.trim();
    if (value.length === 0 || regex.test(value)) {
      element.classList.remove("is-invalid");
    }
  };

  // handlers for different events
  element.addEventListener("blur", handleBlur);
  element.addEventListener("keyup", handleKeyup);
};

const validateDateOfBirth = (element) => {
  // birth input event
  element.addEventListener("blur", function () {
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

export { addValidationListeners, validateDateOfBirth };
