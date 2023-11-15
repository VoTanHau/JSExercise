"use strict";

const inputLeft = document.getElementById("input-left");
const submitLeft = document.getElementById("submit-left");
const buttonLeft = document.getElementsByClassName("chatbox-btn-left");
const screenLeft = document.getElementById("screen-left");
const inputRight = document.getElementById("input-right");
const submitRight = document.getElementById("submit-right");
const buttonRight = document.getElementsByClassName("chatbox-btn-right");
const screenRight = document.getElementById("screen-right");
const bold = "bold";
const italic = "italic";
const reset = "reset";
let msgStoreLeft = [];
let msgStoreRight = [];

Array.from(buttonLeft).forEach((item) => {
  item.addEventListener("click", () => {
    handleReStyleContent(item, inputLeft, "left");
  });
});

Array.from(buttonRight).forEach((item) => {
  item.addEventListener("click", () => {
    handleReStyleContent(item, inputRight, "right");
  });
});

submitLeft.addEventListener("click", (event) => {
  event.preventDefault();
  sendMsg("left", "right", inputLeft);
});

inputLeft.addEventListener("keydown", (event) => {
  const inputValue = inputLeft.value;
  if (event.key === "Enter") {
    event.preventDefault();
    if (inputValue) {
      sendMsg("left", "right", inputLeft);
    }
  }
});

submitRight.addEventListener("click", (event) => {
  event.preventDefault();
  sendMsg("right", "left", inputRight);
});

inputRight.addEventListener("keydown", (event) => {
  const inputValue = inputRight.value;
  if (event.key === "Enter") {
    event.preventDefault();
    if (inputValue) {
      sendMsg("right", "left", inputRight);
    }
  }
});

function handleReStyleContent(item, actor, side) {
  console.log(item);
  if (item.value === bold) {
    handleCustomStyle(actor, "Weight", bold);
  } else if (item.value === italic) {
    handleCustomStyle(actor, "Style", italic);
  } else if (item.value === reset) {
    handleResetMsg(side);
  }
}

function sendMsg(from, to, input) {
  const inputValue = input.value.trim();
  if (inputValue) {
    msgStoreLeft.push(
      `<div class='msg msg__${to}'><span style='font-style:${
        input.style.fontStyle || ""
      }; font-weight:${input.style.fontWeight || ""}'>${
        input.value
      }</span></div>`
    );
    msgStoreRight.push(
      `<div class='msg msg__${from}'><span style='font-style:${
        input.style.fontStyle || ""
      }; font-weight:${input.style.fontWeight || ""}'>${
        input.value
      }</span></div>`
    );
    screenLeft.innerHTML = msgStoreLeft.join(" ");
    screenRight.innerHTML = msgStoreRight.join(" ");
    input.value = "";
    input.focus();
  }
}

function handleCustomStyle(actor, style, value) {
  actor.style[`font${style}`] =
    actor.style[`font${style}`] === value ? "unset" : value;
}

function handleResetMsg(side) {
  if (side === "left") {
    msgStoreLeft = [];
    screenLeft.innerHTML = "";
  } else {
    msgStoreRight = [];
    screenRight.innerHTML = "";
  }
}
