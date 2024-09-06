import { items } from "./add";
import { displayItems } from "./display";

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

  projectsList.addEventListener("click", (event) => {
    if (event.target && event.target.matches("li.project-item")) {
      const selectedProject = event.target.textContent; // Get the text content of the clicked project item

      // Filter items based on the selected project
      const filteredItems = items.filter(
        (item) => item.projects === selectedProject
      );

      // Call displayItems with the filtered items
      displayItems(filteredItems);
    }
  });
}
