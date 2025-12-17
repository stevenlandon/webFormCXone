const fieldConfig = [
  { key: "Review_Start_Date", label: "Review Start Date" },
  { key: "Reviewer", label: "Reviewer" },
  { key: "Outcome", label: "Outcome" },
  { key: "Outcome_Details", label: "Outcome Details" },
  { key: "Other_Details", label: "Other Details" },
  { key: "Public_Note", label: "Public Note" },
  { key: "Private_Note", label: "Private Note" },
  { key: "Return_To_Queue_Date", label: "Return To Queue Date" },
];

let historyList = [];
async function loadData() {
  const url =
    "https://shubhamrathi1224.github.io/webFormCXone/cxone-work-item-form/to_host/history.json";
  try {
    const res = await fetch(url);
    historyList = await res.json();
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

function initializeTable() {
    const totalCols = fieldConfig.length;
    console.log('totalCols: ', totalCols);
    const headerRow = document.createElement('tr');
    for (let i = 0; i < totalCols; i++) {
        headerRow.innerHTML += `<th style="padding: 12px 10px; text-align: left; font-weight: 600; border-right: 1px solid rgba(255, 255, 255, 0.2); white-space: nowrap;">${fieldConfig[i].label || '-'}</th>`;
    }
    document.getElementById('tableHeader').appendChild(headerRow);
    const tbody = document.getElementById('tableBody');
    historyList.forEach((data) => {
        const row = document.createElement('tr');
        for (let i = 0; i < totalCols; i++) {
            const td = document.createElement('td');
            const value = i < fieldConfig.length ? (data[fieldConfig[i].key] || '') : '';
            td.innerHTML = value;
            td.style = "padding: 10px;border: 1px solid #e0e0e0;background: white;"
            row.appendChild(td);
        }
        tbody.appendChild(row);
    });
}

window.onload = async () => {
  await loadData();
  initializeTable();
};
