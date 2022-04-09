import { loadAll } from "./results.js";
import menu from "./menu";

document.addEventListener("DOMContentLoaded", async (e) => {
  menu();
  await loadAll();
});
