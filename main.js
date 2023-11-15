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

document.addEventListener("keydown", function (event) {
  if (event.shiftKey) {
    handleSubmit(event);
  }
  if (event.code === "Delete" || event.key === "Delete") {
    handleReset();
  }
});

phoneInput.addEventListener("input", function () {
  const phoneNumber = phoneInput.value;

  if (phoneNumber.length !== 10) {
    phoneInput.setCustomValidity("Số điện thoại phải có đúng 10 chữ số");
  } else if (isNaN(Number(phoneNumber))) {
    phoneInput.setCustomValidity("Số điện thoại chỉ bao gồm các chữ số");
  } else if (phoneNumber[0] !== "0") {
    phoneInput.setCustomValidity("Số điện thoại phải bắt đầu bằng 0");
  } else {
    phoneInput.setCustomValidity("");
  }
});

passwordInput.addEventListener("input", function () {
  const password = passwordInput.value;
  const confirmPassword = confirmInput.value;
  const validBeginLetter = !/^[a-zA-Z]/;
  const validSpecialCha = !/[!@#$%^&*]/;
  const validNumber = !/\d/;
  const validCapitalLetter = !/[A-Z]/;

  if (password.length < 8 || password.length > 30) {
    passwordInput.setCustomValidity("Mật khẩu phải có từ 8 đến 30 ký tự");
  } else if (validBeginLetter.test(password)) {
    passwordInput.setCustomValidity("Mật khẩu phải bắt đầu bằng một chữ cái");
  } else if (validSpecialCha.test(password)) {
    passwordInput.setCustomValidity(
      "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"
    );
  } else if (validNumber.test(password)) {
    passwordInput.setCustomValidity("Mật khẩu phải chứa ít nhất một chữ số");
  } else if (validCapitalLetter.test(password)) {
    passwordInput.setCustomValidity(
      "Mật khẩu phải chứa ít nhất một chữ cái viết hoa"
    );
  } else if (password !== confirmPassword) {
    confirmInput.setCustomValidity("Mật khẩu không khớp");
    passwordInput.setCustomValidity("");
  }
});

confirmInput.addEventListener("input", function () {
  const password = passwordInput.value;
  const confirmPassword = confirmInput.value;

  if (password !== confirmPassword) {
    confirmInput.setCustomValidity("Mật khẩu không khớp");
  } else {
    confirmInput.setCustomValidity("");
  }
});

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
    const imagePreview = document.getElementById("image-preview");
    imagePreview.style.display = "block";
    imagePreview.src = e.target.result;
  };
  reader.readAsDataURL(image);
}

function handleReset() {
  form.reset();
  label.style.display = "flex";
  imageShow.style.display = "none";
  fullnamePreview.textContent = "";
  emailPreview.textContent = "";
  phonePreview.textContent = "";
  birthdayPreview.textContent = "";
  const imagePreview = document.getElementById("image-preview");
  imagePreview.style.display = "none";
}

resetButton.addEventListener("click", function () {
  handleReset();
});
