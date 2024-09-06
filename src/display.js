import { items } from "./add.js";

export function displayItems(filteredItems = items) {
  const output = document.querySelector(".content");
  let text = "";

  filteredItems.forEach((item, index) => {
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
  filteredItems.forEach((item, index) => {
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
      const projects = formData.get("project");
      const priority = formData.get("priority");

      const index = itemDialog.getAttribute("data-index");

      if (index !== null) {
        items[index] = { title, description, dueDate, projects, priority };
        displayItems();
        itemDialog.close();
      } else {
        form.reportValidity();
      }
    }
  });

  calendar();
  completedItems();
}

function calendar() {
  const currentDate = new Date().toISOString().split("T")[0];

  const today = document.querySelector(".today");
  const upcoming = document.querySelector(".upcoming");
  const overdue = document.querySelector(".overdue");

  today.addEventListener("click", (event) => {
    const todayItems = items.filter((item) => item.dueDate === currentDate);
    displayItems(todayItems);
  });

  upcoming.addEventListener("click", (event) => {
    const upcomingItems = items.filter((item) => item.dueDate > currentDate);
    displayItems(upcomingItems);
  });

  overdue.addEventListener("click", (event) => {
    const overdueItems = items.filter((item) => item.dueDate < currentDate);
    displayItems(overdueItems);
  });
}

function completedItems() {
  const completed = document.querySelector(".completed");
  completed.addEventListener("click", (event) => {
    const completedItems = items.filter((item) => item.status === true);
    displayItems(completedItems);
  });
}
