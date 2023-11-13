"use strict";

const select = document.getElementById("select-container");
const listCity = document.getElementsByClassName("city-name");

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
