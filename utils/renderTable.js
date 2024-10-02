function renderTable(chemicals) {
  const table = document.getElementById("table");
  table.innerHTML = "";
  let tableRows = "";
  chemicals.length > 0 &&
    chemicals.map((item, index) => {
      const row = generateTable(item, index);
      tableRows += row;
    });
  table.innerHTML = tableRows;

  function generateTable(item, index) {
    return `
    <tr id="row_${item.id}" class="table-row">
     <td class="checkbox-td">
     <input type="checkbox" class="checkboxes" id="${item.id}" name="${
      item.chemicalName
    }" value="${item.id}">
     </td>
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
  }
}

export default renderTable;
