import { items } from "./add";

export function displayLibrary() {
  const output = document.querySelector(".content");
  let text = "";

  items.forEach((item, index) => {
    text += `
            <div class="item-card" data-index="${index}">
              <button class="deleteButton fa-regular fa-trash-can" style="font-size:24px;color:red"></button>
              <p><strong>Title:</strong> ${book.author}</p>
              <p><strong>Title:</strong> ${book.title}</p>
              <p><strong>Number of Pages:</strong> ${book.numberOfPages}</p>
              <p><strong>Has Read:</strong> ${book.hasRead ? "Yes" : "No"}</p>
            </div>
          `;
  });

  output.innerHTML = text;
  attachEventListeners();
}
