import { chemicalsData } from "../data/chemicalsData.js";
import renderTable from "./renderTable.js";

let chemicals = loadChemicalsFromLocalStorage() || chemicalsData;

export function checkIsDarkMode() {
  const body = document.getElementsByTagName("body");
  const saveIconSvg = document.getElementById("save-icon-svg");
  const themeTogglerSvg = document.getElementById("theme-toggle-svg");

  if (body[0].classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", true);
    themeTogglerSvg.setAttribute("src", "assets/dark-mode-toggle-icon.svg");
    saveIconSvg.setAttribute("src", "assets/save-icon-dark.svg");
  } else {
    localStorage.removeItem("dark-mode");
    themeTogglerSvg.setAttribute("src", "assets/light-mode-toggle-icon.svg");
    saveIconSvg.setAttribute("src", "assets/save-icon.svg");
  }
}

export function saveChemicalsToLocalStorage(data) {
  localStorage.setItem("chemicals", JSON.stringify(data));
}

export function loadChemicalsFromLocalStorage() {
  const storedData = localStorage.getItem("chemicals");
  return storedData ? JSON.parse(storedData) : null;
}

export function selectAllCheckBoxes(selectAllCheckBox) {
  console.log(selectAllCheckBox);
  const checkboxes = Array.from(document.getElementsByClassName("checkboxes"));

  if (selectAllCheckBox.checked) {
    checkboxes.forEach((checkbox) => (checkbox.checked = true));
  } else {
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }
}

export function showSnackbarMsg(message) {
  var snackbar = document.getElementById("snackbar");
  snackbar.innerText = message;
  snackbar.className = "show";

  setTimeout(function () {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}

function filterDataToUpdate(checkedBox) {
  const checkedId = checkedBox.map((box) => box.id);
  console.log(checkedId);

  let filteredData = [];

  checkedId.forEach((id) => {
    const data = chemicals.filter((chemical) => chemical.id === id);
    if (data.length > 0) {
      filteredData.push(data[0]);
    }
  });

  return filteredData;
}

function renderModal(filteredData) {
  const editModalDiv = document.getElementById("edit-modal");
  editModalDiv.innerHTML = "";
  const form = `
  <form class="edit-row-form" id="edit-row-form">

      <div class="edit-row-form-header">
      <h2>Edit Row Data</h2>
      <i class="fa-solid fa-xmark"></i>
      </div>

      <div>
        <label>Id:</label>
        <input type="text" value="${filteredData[0].id.slice(-6)}" disabled>
      </div>
      <div>
        <label>Chemical Name:</label>
        <input type="text" value="${filteredData[0].chemicalName}" required>
      </div>
      <div>
        <label>Vendor:</label>
        <input type="text" value="${filteredData[0].vendor}">
      </div>
      <div>
        <label>Density:</label>
        <input type="number" value="${filteredData[0].density}">
      </div>
      <div>
        <label>Viscosity:</label>
        <input type="number" value="${filteredData[0].viscosity}">
      </div>
      <div>
        <label>Packaging:</label>
        <input type="text" value="${filteredData[0].packaging}">
      </div>
      <div>
        <label>Pack Size:</label>
        <input type="number" value="${filteredData[0].packSize}">
      </div>
      <div>
        <label>Unit:</label>
        <input type="text" value="${filteredData[0].unit}">
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" value="${filteredData[0].quantity}">
      </div>
      <div class="edit-row-form-btn-div">
         <button class="back-btn">
            <i class="fa-solid fa-arrow-left"></i> Back 
          </button>
          <button class="edit-done-btn" id="save-edit-btn">
            ${"Save"} <i class="fa-solid fa-arrow-right"></i>
          </button>
      </div>
    </form>`;

  editModalDiv.innerHTML = form;

  document
    .getElementById("edit-row-form")
    .addEventListener("submit", (e) => e.preventDefault());
}

function saveRowEdit(e, id, filteredData) {
  e.preventDefault();
  const allInputs = Array.from(
    document.getElementById("edit-row-form").getElementsByTagName("input")
  );
  const allInputValues = [];
  allInputs.map((input) => allInputValues.push(input.value));
  console.log(allInputValues);
  console.log(id);
  const dataKey = Object.keys(filteredData);
  console.log(dataKey);
  for (let i = 1; i < allInputValues.length; i++) {
    const key = dataKey[i];
    const value = allInputValues[i];
    chemicals.forEach((chemical) => {
      if (id === chemical.id) {
        chemical[key] = value;
      }
    });
  }
  saveChemicalsToLocalStorage(chemicals);
  renderTable(chemicals);
  closeModal();
  showSnackbarMsg("Row Updated Successfully!");
}

function closeModal() {
  const editModalDiv = document.getElementById("edit-modal");
  editModalDiv.classList.add("display-none");
  document.body.classList.remove("modal-open");
  document.querySelector(".bg-shadow").classList.add("display-none");
}

export function openModal() {
  const checkboxes = Array.from(document.getElementsByClassName("checkboxes"));
  const checkedBox = checkboxes.filter((checkbox) => checkbox.checked);
  const editModalDiv = document.getElementById("edit-modal");

  if (!checkedBox.length > 0) {
    showSnackbarMsg("⚠️ Select atleast one row!");
    return;
  }

  editModalDiv.classList.remove("display-none");
  document.body.classList.add("modal-open");
  document.querySelector(".bg-shadow").classList.remove("display-none");

  const filteredData = filterDataToUpdate(checkedBox);

  renderModal(filteredData);

  document.querySelector(".fa-xmark").addEventListener("click", closeModal);
  document
    .getElementById("save-edit-btn")
    .addEventListener("click", (e) =>
      saveRowEdit(e, filteredData[0].id, filteredData[0])
    );
}

export function inlineEdit(e) {
  e.target.setAttribute("contenteditable", true);
  e.target.setAttribute("autofocus", true);
  e.target.focus();
}

export function doneEdit(e) {
  e.target.setAttribute("contenteditable", false);
  const cellId = e.target.id;
  const [columnHeading, id] = cellId.split("_");
  chemicals.forEach((chemical) => {
    if (id === chemical.id) {
      chemical[columnHeading] = e.target.innerText;
      saveChemicalsToLocalStorage(chemicals);
    }
  });
}
