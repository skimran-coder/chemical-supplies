import { chemicalsData } from "../data/chemicalsData.js";
import { saveChemicalsToLocalStorage, showSnackbarMsg } from "./helpers.js";
import renderTable from "./renderTable.js";

function resetData() {
  const chemicals = chemicalsData;
  renderTable(chemicals);
  saveChemicalsToLocalStorage(chemicals);
  showSnackbarMsg("Table reset successfully!");
}

export default resetData