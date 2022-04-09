const baseUrl = "https://bechdel.azurewebsites.net/api/";

async function getAll(page, year) {
  let response;
  if (year) {
    response = await fetch(getUrl(`films/${year}/?page=${page}`));
  } else {
    response = await fetch(getUrl(`films/?page=${page}`));
  }
  return await response.json();
};

async function getPassed(page, year) {
  let response;
  if (year) {
    response = await fetch(getUrl(`films/passed/${year}/?page=${page}`));
  } else {
    response = await fetch(getUrl(`films/passed/?page=${page}`));
  }
  return await response.json();
};

async function getFailed(page, year) {
  let response;
  if (year) {
    response = await fetch(getUrl(`films/failed/${year}/?page=${page}`));
  } else {
    response = await fetch(getUrl(`films/failed/?page=${page}`));
  }
  return await response.json();
};

async function getYears(page, year) {
  const response = await fetch(getUrl(`years`));
  return await response.json();
};

function getUrl(path) {
  if (path[0] === "/") throw error("Path must start without the /");
  return `${baseUrl}${path}`;
};

export default {
  getAll,
  getPassed,
  getFailed,
  getYears
}
