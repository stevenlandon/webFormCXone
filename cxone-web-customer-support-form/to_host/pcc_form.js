const cxOneAgents = [
  { value: "agent1", label: "Agent 1" },
  { value: "agent2", label: "Agent 2" },
  { value: "agent3", label: "Agent 3" },
  { value: "agent4", label: "Agent 4" },
  { value: "agent5", label: "Agent 5" },
];

const cxOneSkills = [
  { value: "skill1", label: "Skill 1" },
  { value: "skill2", label: "Skill 2" },
  { value: "skill3", label: "Skill 3" },
  { value: "skill4", label: "Skill 4" },
  { value: "skill5", label: "Skill 5" },
];

let transferList = JSON.parse(JSON.stringify(cxOneAgents));

(function init() {
  populateTransferModes();
})();

function populateTransferModes() {
  var deliverModesOption = [ 
    { value: "skillSet", label: "Skill Set" },
    { value: "consultant", label: "PCC" },
  ];
  const group = document.getElementById("transferModeGroup");
  group.innerHTML = "";

  deliverModesOption.forEach((mode) => {
    const wrapper = document.createElement("label");
    wrapper.className = "radio-option";
    wrapper.style.display = "block";
    wrapper.style.cursor = "pointer";
    wrapper.setAttribute("for", `transferMode_${mode.value}`);

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "transferMode";
    input.value = mode.value;
    input.id = `transferMode_${mode.value}`;


    input.addEventListener("change", onTransferModeChange);
    const text = document.createTextNode(" " + mode.label);

    wrapper.appendChild(input);
    wrapper.appendChild(text);
    group.appendChild(wrapper);
  });
}

function onTransferModeChange(e){
  const selected = e.target.value;

  if (selected === "skillSet") {
    document.querySelector('label[for="transferTo"]').innerText = 'Skill Name';
    transferList = JSON.parse(JSON.stringify(cxOneSkills));
  } else {
    document.querySelector('label[for="transferTo"]').innerText = 'PCC Name';
    transferList = JSON.parse(JSON.stringify(cxOneAgents));
  }
}

// searchable autocomplete single-select transfer dropdown start

const transferSearchInput = document.getElementById("transferSearch");
const transferOptionsDiv = document.getElementById("transferOptions");
const transferToInput = document.getElementById("transferTo");

function renderTransferOptions(filter = "") {
  transferOptionsDiv.innerHTML = "";
  const filtered = transferList.filter((a) =>
    a.label.toLowerCase().includes(filter.toLowerCase())
  );
  filtered.forEach((a) => {
    const div = document.createElement("div");
    div.className = "option-item";
    div.textContent = a.label;
    div.dataset.value = a.value;
    div.addEventListener("click", () => selectTransferOption(a));
    transferOptionsDiv.appendChild(div);
  });
  transferOptionsDiv.style.display = filtered.length ? "block" : "none";
}

function selectTransferOption(agent) {
  transferSearchInput.value = agent.label;
  transferToInput.value = agent.value;
  transferOptionsDiv.style.display = "none";
}

transferSearchInput.addEventListener("input", (e) => {
  renderTransferOptions(e.target.value);
});

transferSearchInput.addEventListener("focus", () => renderTransferOptions(""));

document.addEventListener("click", (e) => {
  if (!e.target.closest("#transferSearch")) {
    transferOptionsDiv.style.display = "none";
  }
});

// searchable autocomplete single-select transfer dropdown start