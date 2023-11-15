"use strict";

const select = document.getElementById("select-container");
const cityContainer = document.getElementById("city-container");
const listCity = document.getElementsByClassName("city-name");

const data = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "chan", label: "Chẵn" },
  { value: "le", label: "Lẻ" },
  { value: "reset", label: "Reset" },
];

const cities = [
  {
    id: "1",
    name: "Hà Nội",
  },
  {
    id: "2",
    name: "Sài Gòn",
  },
  {
    id: "3",
    name: "Đà Nẵng",
  },
  {
    id: "4",
    name: "Huế",
  },
  {
    id: "5",
    name: "Hải Phòng",
  },
  {
    id: "6",
    name: "Nha Trang",
  },
];

data.forEach((option) => {
  const optionElement = document.createElement("option");
  optionElement.value = option.value;
  optionElement.textContent = option.label;
  select.appendChild(optionElement);
});

cities.forEach((item) => {
  const liElement = document.createElement("li");
  liElement.classList.add("city-name");
  liElement.textContent = item.id + ". " + item.name;
  liElement.setAttribute("value", item.id);
  cityContainer.appendChild(liElement);
});

function handleChange() {
  const selected = select.value;

  Array.from(listCity).map((city, i) => {
    const index = city.value;
    if (Number(selected) === index) {
      city.classList.add("focus");
    } else if (selected.toString() === "chan") {
      const value = (i + 1) % 2;
      if (value === 0) {
        city.classList.add("focus");
      }
    } else if (selected.toString() === "le") {
      const value = (i + 1) % 2;
      if (value === 1) {
        city.classList.add("focus");
      }
    } else if (selected.toString() === "reset") {
      city.classList.remove("focus");
    }
  });
}
