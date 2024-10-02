import { chemicalsData } from "../data/chemicalsData.js";
import {
  loadChemicalsFromLocalStorage,
  saveChemicalsToLocalStorage,
  showSnackbarMsg,
} from "./helpers.js";
import renderTable from "./renderTable.js";

function moveRowDown() {
  let chemicals = loadChemicalsFromLocalStorage() || chemicalsData;
  const checkboxes = Array.from(document.getElementsByClassName("checkboxes"));
  const checkedBox = checkboxes.filter((checkbox) => checkbox.checked);
  if (!checkedBox.length > 0) {
    showSnackbarMsg("⚠️ Select atleast one row!");
    return;
  }
  if (checkedBox.length > 1) {
    showSnackbarMsg("⚠️ Select only one row at a time!");
    return;
  }
  const checkedId = checkedBox.map((box) => box.id);
  console.log(checkedId[0]);
  let foundIndex = 0;
  for (let i = 0; i < chemicals.length; i++) {
    if (chemicals[i].id === checkedId[0]) {
      const matchedIndex = i;
      foundIndex = matchedIndex;
    }
  }
  if (foundIndex + 1 === chemicals.length) {
    showSnackbarMsg("⚠️ This is the last row!");
    checkedBox[0].checked = false;
    return;
  }
  const newArr = [];
  newArr.push(chemicals[foundIndex + 1]);
  newArr.push(chemicals[foundIndex]);

  console.log(newArr);

  chemicals.splice(foundIndex, 2, newArr[0], newArr[1]);
  renderTable(chemicals);
  saveChemicalsToLocalStorage(chemicals);
  showSnackbarMsg("Row moved down successfully!");
}

export default moveRowDown;
