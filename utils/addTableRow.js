import { chemicalsData } from "../data/chemicalsData.js ";
import {
  loadChemicalsFromLocalStorage,
  saveChemicalsToLocalStorage,
  showSnackbarMsg,
} from "./helpers.js";
import renderTable from "./renderTable.js";

function addTableRow() {
  let chemicals = loadChemicalsFromLocalStorage() || chemicalsData;

  const newRow = {
    id: crypto.randomUUID(),
    chemicalName: "New name",
    vendor: "Vendor name",
    density: 0,
    viscosity: 0,
    packaging: "Bag",
    packSize: 0,
    unit: "L",
    quantity: 0,
  };

  chemicals.push(newRow);
  renderTable(chemicals);
  saveChemicalsToLocalStorage(chemicals);
  showSnackbarMsg("Row Added Successfully!");
}

export default addTableRow;
