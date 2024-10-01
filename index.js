import { chemicalsData } from "./data/chemicalsData.js";

const body = document.getElementsByTagName("body");
const themeTogglerSvg = document.getElementById("theme-toggle-svg");
const saveIconSvg = document.getElementById("save-icon-svg");
const selectAllCheckBox = document.getElementById("select-all-checkboxes");
const editModalDiv = document.getElementById("edit-modal");

if (localStorage.getItem("dark-mode")) {
  body[0].classList.add("dark-mode");
}

themeTogglerSvg.addEventListener("click", () => {
  body[0].classList.toggle("dark-mode");
  checkIsDarkMode();
});

function checkIsDarkMode() {
  if (body[0].classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", true);
    themeTogglerSvg.setAttribute("src", "/assets/dark-mode-toggle-icon.svg");
    saveIconSvg.setAttribute("src", "/assets/save-icon-dark.svg");
  } else {
    localStorage.removeItem("dark-mode");
    themeTogglerSvg.setAttribute("src", "/assets/light-mode-toggle-icon.svg");
    saveIconSvg.setAttribute("src", "/assets/save-icon.svg");
  }
}

checkIsDarkMode();

function saveChemicalsToLocalStorage(data) {
  localStorage.setItem("chemicals", JSON.stringify(data));
}

function loadChemicalsFromLocalStorage() {
  const storedData = localStorage.getItem("chemicals");
  return storedData ? JSON.parse(storedData) : null;
}

let chemicals = loadChemicalsFromLocalStorage() || chemicalsData;

if (!loadChemicalsFromLocalStorage()) {
  saveChemicalsToLocalStorage(chemicals);
}

function renderTable() {
  const table = document.getElementById("table");
  table.innerHTML = "";
  chemicals.length > 0 &&
    chemicals.map((item, index) => {
      const row = `
  <tr id="row_${item.id}">
   <td class="checkbox-td"><input type="checkbox" class="checkboxes" id="${
     item.id
   }" name="${item.chemicalName}" value="${item.id}"></td>
  <td>${index + 1}</td>
  <td>${item.id.slice(-6)}</td>
  <td id="name_${item.id}">${item.chemicalName}</td>
  <td id="vendor_${item.id}">${item.vendor}</td>
  <td id="density_${item.id}">${item.density}</td>
  <td id="viscosity_${item.id}">${item.viscosity}</td>
  <td id="packaging_${item.id}">${item.packaging}</td>
  <td id="packSize_${item.id}">${item.packSize}</td>
  <td id="unit_${item.id}">${item.unit}</td>
  <td id="quantity_${item.id}">${item.quantity}</td>
</tr>`;

      table.innerHTML += row;
    });
}

renderTable();

function addRow() {
  const newRow = {
    id: crypto.randomUUID(),
    chemicalName: "New name",
    vendor: "Vendor name",
    density: 0,
    viscosity: 0,
    packaging: "",
    packSize: 0,
    unit: "",
    quantity: 0,
  };

  chemicals.push(newRow);
  renderTable();
  saveChemicalsToLocalStorage(chemicals);
}

document.getElementById("add-row").addEventListener("click", addRow);

function deleteRow(e) {
  e.preventDefault();

  const checkboxes = Array.from(document.getElementsByClassName("checkboxes"));
  const checkedBox = checkboxes.filter((checkbox) => checkbox.checked);

  if (!checkedBox.length > 0) {
    console.log("early return");
    return;
  }

  const checkedId = checkedBox.map((box) => box.id);

  checkedId.forEach((id) => {
    const index = chemicals.findIndex((chemical) => chemical.id === id);
    if (index > -1) {
      chemicals.splice(index, 1);
    }
  });

  if (selectAllCheckBox.checked) {
    selectAllCheckBox.checked = false;
  }

  renderTable();
  saveChemicalsToLocalStorage(chemicals);
}

document.getElementById("delete-row").addEventListener("click", deleteRow);

function selectAllCheckBoxes() {
  console.log(selectAllCheckBox);
  const checkboxes = Array.from(document.getElementsByClassName("checkboxes"));

  if (selectAllCheckBox.checked) {
    checkboxes.forEach((checkbox) => (checkbox.checked = true));
  } else {
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }
}

selectAllCheckBox.addEventListener("change", selectAllCheckBoxes);

function openModal() {
  const checkboxes = Array.from(document.getElementsByClassName("checkboxes"));
  const checkedBox = checkboxes.filter((checkbox) => checkbox.checked);

  if (!checkedBox.length > 0) {
    console.log("early return");
    return;
  }

  editModalDiv.classList.remove("display-none");
  document.body.classList.add("modal-open");
  document.querySelector(".bg-shadow").classList.remove("display-none");

  const checkedId = checkedBox.map((box) => box.id);
  console.log(checkedId);

  let filteredData = [];

  checkedId.forEach((id) => {
    const data = chemicals.filter((chemical) => chemical.id === id);
    if (data.length > 0) {
      filteredData.push(data[0]);
    }
  });

  console.log(filteredData);

  function renderModal() {
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
    

    document.getElementById("edit-row-form").addEventListener("submit", (e) => e.preventDefault())
  }

  renderModal();
  document.querySelector(".fa-xmark").addEventListener("click", closeModal);
  document
    .getElementById("save-edit-btn")
    .addEventListener("click", (e) =>
      saveRowEdit(e, filteredData[0].id, filteredData[0])
    );
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
  renderTable();
  closeModal()
}

function closeModal() {
  editModalDiv.classList.add("display-none");
  document.body.classList.remove("modal-open");
  document.querySelector(".bg-shadow").classList.add("display-none");
}

document.getElementById("edit-row").addEventListener("click", openModal);

function inlineEdit(e) {
  e.target.setAttribute("contenteditable", true);
  e.target.setAttribute("autofocus", true);
  e.target.focus();
}

function doneEdit(e) {
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

const allTableCells = Array.from(document.querySelectorAll("td"));

const dataTableCells = allTableCells.filter((cell) => {
  const filteredData =
    cell.cellIndex !== 0 && cell.cellIndex !== 1 && cell.cellIndex !== 2;
  return filteredData;
});

dataTableCells.forEach((cell) => {
  cell.addEventListener("dblclick", (e) => inlineEdit(e));
  cell.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      console.log("enter");
      doneEdit(e);
    }
  });
  cell.addEventListener("blur", (e) => doneEdit(e));
});
