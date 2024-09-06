import { items } from "./add.js";

export function displayItems() {
  const output = document.querySelector(".content");
  let text = "<h2>Items</h2>";

  items.forEach((item, index) => {
    text += `
            <div class="item-card" data-index="${index}">
                <button class="deleteButton">Delete</button>
                <button class="modify fa-solid fa-pencil" style="font-size:24px"></button>
                
                <p><strong>Title:</strong> ${item.title}</p>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Due Date:</strong> ${item.dueDate}</p>
                <p><strong>Project:</strong> ${item.project}</p>
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
      console.log(items);

      displayItems();
    });
  });
}
