import { chemicalsData } from "../data/chemicalsData.js";
import {
  loadChemicalsFromLocalStorage,
  saveChemicalsToLocalStorage,
  showSnackbarMsg,
} from "./helpers.js";
import renderTable from "./renderTable.js";

function deleteRow(e) {
  e.preventDefault();
  let chemicals = loadChemicalsFromLocalStorage() || chemicalsData;

  const selectAllCheckBox = document.getElementById("select-all-checkboxes");
  const checkboxes = Array.from(document.getElementsByClassName("checkboxes"));
  const checkedBox = checkboxes.filter((checkbox) => checkbox.checked);

  if (!checkedBox.length > 0) {
    showSnackbarMsg("⚠️ Select atleast one row!");
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

  renderTable(chemicals);
  saveChemicalsToLocalStorage(chemicals);
  showSnackbarMsg("Row(s) Deleted Successfully!");
}

export default deleteRow;
