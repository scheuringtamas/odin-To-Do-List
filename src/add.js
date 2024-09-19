import { createToDoListItem } from "./items.js";
import { displayItems } from "./display.js";

export let items = [];

export function addItem() {
  const addTask = document.querySelector(".addTask");
  const itemDialog = document.getElementById("itemDialog");
  const cancelBtn = document.getElementById("cancelBtn");
  const confirmBtn = document.getElementById("confirmBtn");

  const form = itemDialog.querySelector("form");

  addTask.addEventListener("click", () => {
    itemDialog.showModal();
  });

  confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = new FormData(form);

      const newItem = createToDoListItem(
        formData.get("title"),
        formData.get("description"),
        formData.get("dueDate"),
        formData.get("priority"),
        formData.get("project")
      );

      items.push(newItem);
      console.log(items);
      saveData();

      form.reset();

      itemDialog.close();

      displayItems();
    } else {
      form.reportValidity();
    }
  });

  cancelBtn.addEventListener("click", (event) => {
    itemDialog.close();
  });

  itemDialog.addEventListener("close", () => {
    form.reset();
    updateBtn.style.display = "none";
    confirmBtn.style.display = "inline";
  });
}

export function saveData() {
  localStorage.setItem("todoItems", JSON.stringify(items));
  const projects = Array.from(document.querySelectorAll(".project-item")).map(
    (item) => item.textContent
  );
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadData() {
  const savedItems = localStorage.getItem("todoItems");
  const savedProjects = localStorage.getItem("projects");

  if (savedItems) {
    items = JSON.parse(savedItems);
    displayItems();
  }

  if (savedProjects) {
    const projectsList = document.querySelector(".projectItemList");
    JSON.parse(savedProjects).forEach((projectName) => {
      const projectItem = document.createElement("li");
      projectItem.textContent = projectName;
      projectItem.classList.add("project-item");
      projectsList.appendChild(projectItem);

      const projectSelect = document.getElementById("project");
      const newOption = document.createElement("option");
      newOption.value = projectName;
      newOption.textContent = projectName;
      projectSelect.appendChild(newOption);
    });
  }
}
