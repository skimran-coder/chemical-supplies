import { chemicalsData } from "../data/chemicalsData.js";
import { loadChemicalsFromLocalStorage, showSnackbarMsg } from "./helpers.js";

function convertToCSV(chemicals) {
  const headers = Object.keys(chemicals[0]);

  const array = [headers].concat(chemicals);

  return array
    .map((row) => {
      return Object.values(row)
        .map((val) => `"${val}"`)
        .join(",");
    })
    .join("\n");
}

function downloadAsFile(data, fileName, fileType) {
  const blob = new Blob([data], { type: fileType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

function downloadCSV() {
  let chemicals = loadChemicalsFromLocalStorage() || chemicalsData;
  const csvData = convertToCSV(chemicals);
  downloadAsFile(csvData, "chemicals-data.csv", "text/csv");
  showSnackbarMsg("File downloading...");
}

export default downloadCSV;
