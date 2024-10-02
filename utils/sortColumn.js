import { chemicalsData } from "../data/chemicalsData.js";
import { loadChemicalsFromLocalStorage, saveChemicalsToLocalStorage } from "./helpers.js";
import renderTable from "./renderTable.js";

let sortDirection = {};

function sortColumn(e) {
  const columnId = e.target.id;

  let chemicals = loadChemicalsFromLocalStorage() || chemicalsData;

  // Clone the chemicals array to avoid mutation during sorting
  let sortedChemicals = [...chemicals];

  if (!sortDirection[columnId]) {
    sortDirection[columnId] = "asc"; // Default to ascending
  }

  // Perform the sorting directly on the chemicals array based on the column type
  if (typeof chemicals[0][columnId] === "number") {
    // Sort ascending or descending based on the current direction
    if (sortDirection[columnId] === "asc") {
      sortedChemicals.sort((a, b) => a[columnId] - b[columnId]); // Ascending
    } else {
      sortedChemicals.sort((a, b) => b[columnId] - a[columnId]); // Descending
    }
  } else {
    // For strings, use localeCompare for sorting strings
    if (sortDirection[columnId] === "asc") {
      sortedChemicals.sort((a, b) => a[columnId].localeCompare(b[columnId])); // Ascending
    } else {
      sortedChemicals.sort((a, b) => b[columnId].localeCompare(a[columnId])); // Descending
    }
  }

  // Toggle the sort direction for the next click
  sortDirection[columnId] = sortDirection[columnId] === "asc" ? "desc" : "asc";

  // Re-render the table with the sorted data
  renderTable(sortedChemicals);

  // Save the sorted data to localStorage
  saveChemicalsToLocalStorage(sortedChemicals);
}

export default sortColumn
