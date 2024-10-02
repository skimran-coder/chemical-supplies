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
  showSnackbarMsg,
} from "./utils/helpers.js";
import deleteRow from "./utils/deleteRow.js";
import downloadCSV from "./utils/downloadFile.js";
import moveRowUp from "./utils/moveRowUp.js";
import moveRowDown from "./utils/moveRowDown.js";
import resetData from "./utils/resetData.js";

const body = document.getElementsByTagName("body");
const themeTogglerSvg = document.getElementById("theme-toggle-svg");
const resetIconSvg = document.getElementById("reset-icon-svg");
const saveIconSvg = document.getElementById("save-icon-svg");
const addRowBtn = document.getElementById("add-row");
const deleteRowBtn = document.getElementById("delete-row");
const editRowBtn = document.getElementById("edit-row");
const selectAllCheckBox = document.getElementById("select-all-checkboxes");
const moveRowUpIcon = document.getElementById("move-row-up-icon");
const moveRowDownIcon = document.getElementById("move-row-down-icon");

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

resetIconSvg.addEventListener("click", resetData);

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

moveRowUpIcon.addEventListener("click", moveRowUp);
moveRowDownIcon.addEventListener("click", moveRowDown);

saveIconSvg.addEventListener("click", downloadCSV);
