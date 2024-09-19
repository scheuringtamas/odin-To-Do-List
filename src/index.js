import "./styles.css";
import { addItem } from "./add";
import { addProjects } from "./projects";
import { loadData } from "./add";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

window.addEventListener("DOMContentLoaded", () => {
  loadData();
  displayItems();
});

addItem();
addProjects();
