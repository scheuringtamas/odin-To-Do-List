import { items } from "./add.js";

export function displayItems() {
  const output = document.querySelector(".content");
  let text = "<h2>Items:</h2>";

  items.forEach((item, index) => {
    text += `
            <div class="item-card" data-index="${index}">
                <button class="deleteButton"><i class = "fa-regular fa-trash-can"></i></button>
                <button class="modifyButton"><i class = "fa-solid fa-pencil"></i></button>

                <p><strong>Title:</strong> ${item.title}</p>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Due Date:</strong> ${item.dueDate}</p>
                <p><strong>Project:</strong> ${item.projects}</p>
                <p><strong>Priority:</strong> ${item.priority}</p>
                <p class="status">
                <strong>Status:</strong>
                <input type="checkbox" id="done-${index}" name="done" value="done" ${
      item.status ? "checked" : ""
    }>
              </p>
            </div>
          `;
  });

  output.innerHTML = text;
  attachEventListeners();

  // Add event listeners for each checkbox after rendering
  items.forEach((item, index) => {
    const checkbox = document.getElementById(`done-${index}`);
    if (checkbox) {
      checkbox.addEventListener("change", () => {
        item.status = checkbox.checked;
        console.log(`Item ${index} status:`, item.status); // Debugging output
      });
    }
  });
}

function attachEventListeners() {
  const deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemCard = button.closest(".item-card");
      const index = parseInt(itemCard.getAttribute("data-index"));

      items.splice(index, 1);

      displayItems();
    });
  });

  const modifyButton = document.querySelectorAll(".modifyButton");
  const itemDialog = document.getElementById("itemDialog");
  const form = itemDialog.querySelector("form");
  const updateBtn = document.getElementById("updateBtn");
  const confirmBtn = document.getElementById("confirmBtn");

  modifyButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemCard = button.closest(".item-card");
      const index = parseInt(itemCard.getAttribute("data-index"), 10);

      const item = items[index];
      form.querySelector("#title").value = item.title;
      form.querySelector("#description").value = item.description;
      form.querySelector("#dueDate").value = item.dueDate;
      form.querySelector("#project").value = item.projects;
      form.querySelector("#priority").value = item.priority;

      itemDialog.setAttribute("data-index", index);

      updateBtn.style.display = "inline";
      confirmBtn.style.display = "none";
      itemDialog.showModal();
    });
  });

  updateBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = new FormData(form);
      const title = formData.get("title");
      const description = formData.get("description");
      const dueDate = formData.get("dueDate");
      const project = formData.get("project");
      const priority = formData.get("priority");

      const index = itemDialog.getAttribute("data-index");

      if (index !== null) {
        items[index] = { title, description, dueDate, project, priority };
        displayItems();
        itemDialog.close();
      } else {
        form.reportValidity();
      }
    }
  });
}
