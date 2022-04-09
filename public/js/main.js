const baseUrl = "https://bechdel.azurewebsites.net/api/";

async function getAll(page, year) {
  let response;
  if (year) {
    response = await fetch(getUrl(`films/${year}/?page=${page}`));
  } else {
    response = await fetch(getUrl(`films/?page=${page}`));
  }
  return await response.json();
}
async function getPassed(page, year) {
  let response;
  if (year) {
    response = await fetch(getUrl(`films/passed/${year}/?page=${page}`));
  } else {
    response = await fetch(getUrl(`films/passed/?page=${page}`));
  }
  return await response.json();
}
async function getFailed(page, year) {
  let response;
  if (year) {
    response = await fetch(getUrl(`films/failed/${year}/?page=${page}`));
  } else {
    response = await fetch(getUrl(`films/failed/?page=${page}`));
  }
  return await response.json();
}
async function getYears(page, year) {
  const response = await fetch(getUrl(`years`));
  return await response.json();
}
function getUrl(path) {
  if (path[0] === "/") throw error("Path must start without the /");
  return `${baseUrl}${path}`;
}
var api = {
  getAll,
  getPassed,
  getFailed,
  getYears
};

const resultsPane = document.getElementById("results");
const yearSelect = document.getElementById("year-select");

const Categories = {
  None: Symbol("NONE"),
  All: Symbol("ALL"),
  Passed: Symbol("PASSED"),
  Failed: Symbol("FAILED"),
};

const status = {
  category: Categories.None,
  page: 1,
  pages: 0,
  total: 0,
  currentYear: null
};

yearSelect.addEventListener("change", async (e) => {
  status.currentYear = e.target.value == "null" ? null : Number(e.target.value);
  console.log(e);
  await getResults(status.category);
});

function renderFilms(response) {
  resultsPane.innerHTML = "";
  const filmDivs = [];
  for (let film of response.results) {
    filmDivs.push(formatFilm(film));
  }
  resultsPane.innerHTML = filmDivs.join("");
}

async function fillSelect() {

  // Fill the year dropdown on first call (Always All and all years)
  if (yearSelect.options.length === 0) {
    const years = await api.getYears();
    for (year of ["All Years", ...years]) {
      yearSelect.add(new Option(year, year == "All Years" ? null : Number(year)));
    }
  }
}

async function getResults(category) {
  await fillSelect();
  let response;
  if (category === Categories.All) {
    response = await api.getAll(status.page, status.currentYear );
  } else if (category === Categories.Failed) {
    response = await api.getFailed(status.page, status.currentYear);
  } else if (category === Categories.Passed) {
    response = await api.getPassed(status.page, status.currentYear);
  } else {
    console.error("Bad Category Used...");
  }

  if (status.category != category) {
    status.category = category;
    status.page = 1;
    status.pageCount = response.pageCount;
    status.count = response.count;
  }

  renderFilms(response);
}

function formatFilm(film) {
  return `<div class="film">
    <img src="${film.posterUrl}" alt="${film.title}" />
    <div class="title">${film.title}</div>
    <div class="info">${film.year}</div>
    <div class="info">${film.rating}</div>
    <div class="info">Passed: ${film.passed}</div>
    <div class="info">Reason: ${film.reason}</div>
    <div class="info">Budget: $${film.budget.toLocaleString("en-US")}</div>
    <div class="info">Domestic Gross: $${film.domesticGross.toLocaleString(
      "en-US"
    )}</div>
    <div class="info">International Gross: $${film.internationalGross.toLocaleString(
      "en-US"
    )}</div>
    <p>${film.overview}</p>
  </div>`;
}

const loadAll = async () => await getResults(Categories.All);
const loadPassed = async () => await getResults(Categories.Passed);
const loadFailed = async () => await getResults(Categories.Failed);

function menu () {

  const allMenu = document.getElementById("menu-all");
  const passMenu = document.getElementById("menu-pass");
  const failMenu = document.getElementById("menu-fail");

  allMenu.addEventListener("click", () => loadAll());
  passMenu.addEventListener("click", () => loadPassed());
  failMenu.addEventListener("click", () => loadFailed());

}

document.addEventListener("DOMContentLoaded", async (e) => {
  menu();
  await loadAll();
});
//# sourceMappingURL=main.js.map
