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

      form.reset();

      itemDialog.close();

      displayItems(items);
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
