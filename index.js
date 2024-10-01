import { chemicalsData } from "./data/chemicalsData.js";
import addTableRow from "./utils/addTableRow.js";
import renderTable from "./utils/renderTable.js";
import {
  checkIsDarkMode,
  saveChemicalsToLocalStorage,
  loadChemicalsFromLocalStorage,
  selectAllCheckBoxes,
  openModal,
  inlineEdit,
  doneEdit,
} from "./utils/helpers.js";
import deleteRow from "./utils/deleteRow.js";

const body = document.getElementsByTagName("body");
const themeTogglerSvg = document.getElementById("theme-toggle-svg");
const addRowBtn = document.getElementById("add-row");
const deleteRowBtn = document.getElementById("delete-row");
const editRowBtn = document.getElementById("edit-row");
const selectAllCheckBox = document.getElementById("select-all-checkboxes");

if (localStorage.getItem("dark-mode")) {
  body[0].classList.add("dark-mode");
}

themeTogglerSvg.addEventListener("click", () => {
  body[0].classList.toggle("dark-mode");
  checkIsDarkMode();
});

checkIsDarkMode();

let chemicals = loadChemicalsFromLocalStorage() || chemicalsData;

if (!loadChemicalsFromLocalStorage()) {
  saveChemicalsToLocalStorage(chemicals);
}

renderTable(chemicals);

addRowBtn.addEventListener("click", addTableRow);

deleteRowBtn.addEventListener("click", deleteRow);

selectAllCheckBox.addEventListener("change", () =>
  selectAllCheckBoxes(selectAllCheckBox)
);

editRowBtn.addEventListener("click", openModal);

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
