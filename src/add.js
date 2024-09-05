import { createToDoListItem } from "./items.js";
import { displayLibrary } from "./display.js";
export { items };

const items = [];

export function addItem() {
  const addTask = document.querySelector(".addTask");
  const itemDialog = document.getElementById("itemDialog");
  const cancelBtn = document.getElementById("cancelBtn");

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

      console.log(newItem);

      items.push(newItem);

      form.reset();

      itemDialog.close();

      // displayLibrary();
    } else {
      form.reportValidity();
    }
  });

  cancelBtn.addEventListener("click", (event) => {
    itemDialog.close();
  });
}
