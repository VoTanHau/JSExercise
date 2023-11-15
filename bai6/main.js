"use strict";

const infoList = document.getElementsByClassName("form-field-input");
const deleteBtn = document.getElementById("form-btn-del");
const table = document.getElementById("table-tbody");
const fullname = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const tickAll = document.getElementById("tick-all");

let profileStore = [];

function handleSubmit(event) {
  event.preventDefault();
  const person = {
    name: fullname.value,
    phone: phone.value,
    email: email.value,
  };
  profileStore.push(person);
  renderProfile(person);
  Array.from(infoList).forEach((item) => {
    item.value = "";
  });
  handleUpdateProfile();
}

deleteBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const tickList = document.getElementsByClassName("tick-input");
  const willDelete = [];
  Array.from(tickList).forEach((item, index) => {
    if (item.checked === true) {
      willDelete.push(index);
    }
  });
  profileStore = profileStore.filter((item, index) => {
    return !willDelete.includes(index);
  });
  renderAll();
  handleUpdateProfile();
});

tickAll.addEventListener("change", (event) => {
  const tickList = document.getElementsByClassName("tick-input");
  const isChecked = event.target.checked;
  Array.from(tickList).forEach((item) => {
    item.checked = isChecked;
  });
});

function renderProfile(person) {
  if (person) {
    const html = `<tr>
        <td class='tick'><input class='tick-input' type='checkbox'></td>
        <td><div class='user-info' >${person["name"]}</div></td>
        <td><div class='user-info' >${person["phone"]}</div></td>
        <td><div class='user-info' >${person["email"]}</div></td>
        <td class='delete'><button onClick='deleteForEachButton(${profileStore.length})'>Delete</button></td>
    </tr>`;
    table.innerHTML += html;
  }
  tickAll.checked = false;
}

renderProfile();
handleUpdateProfile();

function renderAll() {
  const html = profileStore.map((item, index) => {
    return `<tr>
            <td class='tick'><input class='tick-input' type='checkbox'></td>
            <td><div class='user-info' >${item["name"]}</div></td>
            <td><div class='user-info' >${item["phone"]}</div></td>
            <td><div class='user-info' >${item["email"]}</div></td>
            <td class='delete'><button onClick='deleteForEachButton(${
              index + 1
            })'>Delete</button></td>
        </tr>`;
  });
  table.innerHTML = html.join("");
  tickAll.checked = false;
}

function deleteForEachButton(id) {
  profileStore.splice(Number(id) - 1, 1);
  renderAll();
  handleUpdateProfile();
}

function handleUpdateProfile() {
  const listInfo = document.getElementsByClassName("user-info");
  Array.from(listInfo).forEach((item) => {
    item.addEventListener("dblclick", () => {
      item.classList.add("change");
      handleUpdateValue(item);
    });
  });
}

function handleUpdateValue(item) {
  const valueTemporary = item.textContent;
  let inputHTML = item.outerHTML.replaceAll("div", "input");
  inputHTML = inputHTML.replace(valueTemporary, "");
  item.outerHTML = inputHTML;
  const itemChange = document.getElementsByClassName("change")[0];
  console.log(itemChange);
  itemChange.value = valueTemporary;
  itemChange.focus();
  itemChange.style.cursor = "text";
  itemChange.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.keyCode === 13) {
      itemChange.blur();
    }
  });
  itemChange.addEventListener("blur", (e) => {
    replaceInputToDiv(itemChange);
  });
}

function replaceInputToDiv(item) {
  inputHTML = item.value;
  item.outerHTML = item.outerHTML.replaceAll("input", "div");
  const itemChange = document.getElementsByClassName("change")[0];
  itemChange.textContent = inputHTML;
  itemChange.ondblclick = () => {
    itemChange.className = "change";
    handleUpdateValue(itemChange);
  };
  itemChange.className = "";
}
