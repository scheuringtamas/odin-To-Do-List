import { items } from "./add";
import { saveData } from "./add";
import { displayItems } from "./display";

export function addProjects() {
  const projectsList = document.querySelector(".projectItemList");
  const projectAddButton = document.getElementById("projectAddButton");
  const projectSelect = document.getElementById("project");

  projectAddButton.addEventListener("click", () => {
    const projectName = prompt("Enter project name:");
    if (projectName) {
      const projectItem = document.createElement("li");
      projectItem.textContent = projectName;
      projectItem.classList.add("project-item");
      projectsList.appendChild(projectItem);

      const newOption = document.createElement("option");
      newOption.value = projectName;
      newOption.textContent = projectName;
      projectSelect.appendChild(newOption);
      saveData();
    }
  });

  projectsList.addEventListener("click", (event) => {
    if (event.target && event.target.matches("li.project-item")) {
      const selectedProject = event.target.textContent;
      const filteredItems = items.filter(
        (item) => item.projects === selectedProject
      );

      displayItems(filteredItems);
    }
  });
}
