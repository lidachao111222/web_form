const updateDropdown = async (jsonFile, element) => {
  try {
    const response = await fetch(`../json/${jsonFile}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const dataList = await response.json();
    dataList.forEach((data) => {
      const option = document.createElement("option");
      option.textContent = data;
      option.value = data;
      element.appendChild(option);
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default updateDropdown;
