async function loadLanguage(lang) {
    const response = await fetch(`../i18n/${lang}.json`);
    const texts = await response.json();

    document.querySelector("#formTitle").textContent = texts?.formTitle;
    document.querySelector("#applicantNameTitle").textContent = texts?.applicantName;
    document.querySelector("#name").setAttribute("placeholder", texts?.namePlaceholder);
    document.querySelector("#maritalStatusTitle").textContent = texts?.maritalStatus;
    document.querySelector("#firstOptionOfMarital").textContent = texts?.maritalStatusInputPlaceholder;
    document.querySelector("#addressTitle").textContent = texts?.canadianAddress;
    document.querySelector("#cityLabel").textContent = texts?.city;
    document.querySelector("#provinceLabel").textContent = texts?.provinces;
    document.querySelector("#firstOptionOfProvince").textContent = texts?.provinceInputPlaceholder;
    document.querySelector("#postcodeLabel").textContent = texts?.postCode;
    document.querySelector("#dateOfBirthTitle").textContent = texts?.dateOfBirth;
    document.querySelector("#mobileOfDateInfo").setAttribute("data-bs-original-title", texts?.mobileOfDateInfo);
    document.querySelector("#pcOfDateInfo").setAttribute("data-bs-original-title", texts?.pcOfDateInfo);
    document.querySelector("#emailTitle").textContent = texts?.email;
    document.querySelector("#phoneNumberTitle").textContent = texts?.canadianPhoneNumber;
    document.querySelector("#countryCodelabel").textContent = texts?.countryCode;
    document.querySelector("#indigenousLabel").textContent = texts?.identifyAsIndigenous;
    document.querySelector("#nationalityInputELement").setAttribute("placeholder", texts?.nationality);
    document.querySelector("#subButton").textContent = texts?.submit;

    // remove value first before render
    const itemsToRemove = document.querySelectorAll('.editOption');
    itemsToRemove.forEach(element => {
        element.remove();
    });

    renderMaritalSelecter(texts);
    renderProvinceSelecter(texts)
}

async function submitAlertCheck(lang){
    const response = await fetch(`../i18n/${lang}.json`);
    const texts = await response.json();
    alert(texts?.warningOfSubmit);
}

async function dateOfBirthAlertCheck(lang){
    const response = await fetch(`../i18n/${lang}.json`);
    const texts = await response.json();
    alert(texts?.warningOfBirth);
}

const renderMaritalSelecter = ({status}) => {
    const selectParent = document.querySelector("#maritalStatus");
    const lastOption = document.querySelector("#lastOptionOfMarital"); 
    for(const i in status){
        const newOption = document.createElement("option");
        newOption.textContent = status[i]?.name;
        newOption.value = status[i]?.value;
        newOption.classList.add("editOption");
        selectParent.insertBefore(newOption, lastOption);
    }
}

const renderProvinceSelecter = ({provinceList}) => {
    const selectParent = document.querySelector("#province");
    const lastOption = document.querySelector("#lastOptionOfProvince");
    for(const i in provinceList){
        const newOption = document.createElement("option");
        newOption.textContent = provinceList[i]?.name;
        newOption.value = provinceList[i]?.value;
        newOption.classList.add("editOption");
        selectParent.insertBefore(newOption, lastOption);
    }
}



export  { loadLanguage, submitAlertCheck, dateOfBirthAlertCheck }
