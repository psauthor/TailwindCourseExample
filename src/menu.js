import { loadAll, loadFailed, loadPassed } from "./results";

export default function () {

  const allMenu = document.getElementById("menu-all");
  const passMenu = document.getElementById("menu-pass");
  const failMenu = document.getElementById("menu-fail");

  allMenu.addEventListener("click", () => loadAll());
  passMenu.addEventListener("click", () => loadPassed());
  failMenu.addEventListener("click", () => loadFailed());

}