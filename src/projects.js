export function addProjects() {
  const projectsList = document.querySelector(".projectItemList");
  const projectAddButton = document.getElementById("projectAddButton");
  const projectSelect = document.getElementById("project");

  projectAddButton.addEventListener("click", () => {
    const projectName = prompt("Enter project name:");
    if (projectName) {
      // Add new project to sidebar
      const projectItem = document.createElement("li");
      projectItem.textContent = projectName;
      projectItem.classList.add("project-item");
      projectsList.appendChild(projectItem);

      // Add new project to the select dropdown
      const newOption = document.createElement("option");
      newOption.value = projectName;
      newOption.textContent = projectName;
      projectSelect.appendChild(newOption);
    }
  });
}
