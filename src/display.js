import { items } from "./add.js";

export function displayItems(items) {
  const output = document.querySelector(".content");
  let text = "<h2>Items</h2>";

  items.forEach((item, index) => {
    text += `
            <div class="item-card" data-index="${index}">
              <button class="deleteButton fa-regular fa-trash-can" style="font-size:24px;color:red"></button>
              <p><strong>Title:</strong> ${item.title}</p>
              <p><strong>Description:</strong> ${item.description}</p>
              <p><strong>Due Date:</strong> ${item.dueDate}</p>
              <p><strong>Project:</strong> ${item.project}</p>
              <p><strong>Priority:</strong> ${item.priority}</p>
            </div>
          `;
  });

  output.innerHTML = text;
  console.log("Fut a displayItems");
  //attachEventListeners();
}
