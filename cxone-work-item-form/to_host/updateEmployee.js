let agentList = [];
async function loadData() {
  const url =
    "https://shubhamrathi1224.github.io/webFormCXone/cxone-work-item-form/to_host/agentList.json";
  try {
    const res = await fetch(url);
    agentList = await res.json();
    agentList = agentList.map((item) => {
      const activeStatus = item.isActive.toLowerCase() === "True" ? 'Active' : 'Inactive';
      const polarId = item.custom1.split(',')[0];
      return {
        ...item, 
        agent_name: item.firstName + ' ' + item.lastName,
        agent_option: `${item.firstName} ${item.lastName} - ${polarId} - ${item.teamName} - ${activeStatus}`,
      }
    });
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

function filterData(query) {
  query = query.toLowerCase();
  return agentList
    .filter((item) => item.agent_name.toLowerCase().includes(query))
    .slice(0, 25);
}

function setupAutocomplete() {
  const input = document.getElementById("search");
  const list = document.getElementById("suggestions");

  input.addEventListener("input", () => {
    list.innerHTML = "";
    const value = input.value.trim();
    if (value.length === 0) return;

    const results = filterData(value);
    if(results.length > 0){
        list.style.border = "1px solid #ccc";
    } else {
        list.style.border = "none";
    }

    results.forEach((result) => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.style = "padding: 8px;cursor: pointer;"
      div.addEventListener("mouseenter", () => {
          div.style.background = "#f0f0f0";
      });

      div.addEventListener("mouseleave", () => {
          div.style.background = "white";
      });
      div.textContent = result.agent_option;
      div.onclick = () => {
        input.value = result.agent_option;
        document.getElementById('wi_newAgentId').value=result.agentId;
        list.innerHTML = "";
        list.style.border = "none";
      };
      list.appendChild(div);
    });
  });
}

window.onload = async () => {
  await loadData();
  setupAutocomplete();
};
