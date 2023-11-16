"use strict";

const phoneInput = document.getElementById("phone");
const form = document.getElementById("form-container");
const imageUpload = document.getElementById("image-upload");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const addButton = document.getElementById("button-add");
const resetButton = document.getElementById("button-reset");
const fullnameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const birthdayInput = document.getElementById("birthday");
const imageShow = document.getElementById("image-show");
const label = document.getElementById("image-upload-label");
const fullnamePreview = document.getElementById("fullname-preview");
const emailPreview = document.getElementById("email-preview");
const phonePreview = document.getElementById("phone-preview");
const birthdayPreview = document.getElementById("birthday-preview");
const imagePreview = document.getElementById("image-preview");
const inputFields = document.querySelectorAll(".form-field-input input");

document.addEventListener("keydown", function (event) {
  if (event.shiftKey) {
    handleSubmit(event);
  }
  if (event.code === "Delete" || event.key === "Delete") {
    handleReset();
  }
});

function validateEmptyFields() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => errorMessage.remove());
  let isValid = true;

  inputFields.forEach((inputField) => {
    if (inputField.value.trim() === "") {
      isValid = false;
      const fieldName = inputField.getAttribute("name");
      const errorMessage = `${
        fieldName?.charAt(0).toUpperCase() + fieldName?.slice(1)
      } is required`;
      displayErrorMessage(inputField, errorMessage);
    }
  });

  return isValid;
}

function validateForm() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => errorMessage.remove());
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validBeginLetter = /^[a-zA-Z]/;
  const validSpecialCha = /[!@#$%^&*]/;
  const validNumber = /\d/;
  const validCapitalLetter = /[A-Z]/;
  let isValid = true;

  validateEmptyFields();

  if (!validEmail.test(emailInput.value)) {
    isValid = false;
    displayErrorMessage(emailInput, "Invalid email format");
  }

  if (phoneInput.value.length !== 10) {
    isValid = false;
    displayErrorMessage(
      phoneInput,
      "The phone number must have exactly 10 digits"
    );
  } else if (isNaN(Number(phoneInput.value))) {
    isValid = false;
    displayErrorMessage(phoneInput, "Phone numbers include only digits");
  } else if (phoneInput.value[0] !== "0") {
    isValid = false;
    displayErrorMessage(phoneInput, "Phone numbers must start with 0");
  }

  if (passwordInput.value.length < 8 || passwordInput.value.length > 30) {
    isValid = false;
    displayErrorMessage(
      passwordInput,
      "Password must be between 8 and 30 characters"
    );
  } else if (!validBeginLetter.test(passwordInput.value)) {
    isValid = false;
    displayErrorMessage(passwordInput, "Password must start with a letter");
  } else if (!validSpecialCha.test(passwordInput.value)) {
    isValid = false;
    displayErrorMessage(
      passwordInput,
      "Password must contain at least one special character"
    );
  } else if (!validNumber.test(passwordInput.value)) {
    isValid = false;
    displayErrorMessage(
      passwordInput,
      "Password must contain at least one digit"
    );
  } else if (!validCapitalLetter.test(passwordInput.value)) {
    isValid = false;
    displayErrorMessage(
      passwordInput,
      "Password must contain at least one uppercase letter"
    );
  }

  if (confirmInput.value !== passwordInput.value) {
    isValid = false;
    displayErrorMessage(confirmInput, "Passwords do not match");
  }

  return isValid;
}

function displayErrorMessage(inputElement, message) {
  const existingErrorMessage =
    inputElement.parentNode.querySelector(".error-message");
  if (!existingErrorMessage) {
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;
    errorMessage.style.color = "red";
    inputElement.parentNode.appendChild(errorMessage);
  }
}

imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    label.style.display = "none";
    imageShow.style.display = "block";
    imageShow.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

function formatPhoneNumber(phoneNumber) {
  const formatNumber = phoneNumber.replace(/\D/g, "");

  if (formatNumber.length === 10) {
    const areaCode = formatNumber.slice(0, 3);
    const firstPart = formatNumber.slice(3, 6);
    const secondPart = formatNumber.slice(6, 10);
    return `${areaCode}-${firstPart}-${secondPart}`;
  }

  return phoneNumber;
}

function capitalizeFirstLetters(str) {
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

function formatBirthday(birthday) {
  const dateParts = birthday.split("-");
  const day = dateParts[2];
  const month = dateParts[1];
  const year = dateParts[0];

  return day + "/" + month + "/" + year;
}

function handleSubmit(event) {
  event.preventDefault();
  if (validateForm()) {
    const fullname = capitalizeFirstLetters(fullnameInput.value);
    const email = emailInput.value;
    const phone = formatPhoneNumber(phoneInput.value);
    const birthday = formatBirthday(birthdayInput.value);
    const image = imageUpload.files[0];

    fullnamePreview.textContent = fullname;
    emailPreview.textContent = email;
    phonePreview.textContent = phone;
    birthdayPreview.textContent = birthday;

    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.style.display = "block";
      imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(image);
  }
}

function handleReset() {
  form.reset();
  label.style.display = "flex";
  imageShow.style.display = "none";
  fullnamePreview.textContent = "";
  emailPreview.textContent = "";
  phonePreview.textContent = "";
  birthdayPreview.textContent = "";
  imagePreview.style.display = "none";
}

resetButton.addEventListener("click", function () {
  handleReset();
});
