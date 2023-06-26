export default async function saveItem(name, item) {
  localStorage.setItem(name, (JSON.stringify(item)));
}

export const getSavedItem = (name) => JSON.parse(localStorage.getItem(name));

export async function saveItemSessionStorage(name, item) {
  sessionStorage.setItem(name, JSON.stringify(item));
}

export const getItemSessionStorage = (name) => JSON.parse(sessionStorage.getItem(name));
