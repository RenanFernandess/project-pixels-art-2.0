function saveItem(name, item) {
  localStorage.setItem(name, (JSON.stringify(item)));
}

const getSavedItem = (name) => JSON.parse(localStorage.getItem(name));

function saveItemSessionStorage(name, item) {
  sessionStorage.setItem(name, JSON.stringify(item));
}

const getItemSessionStorage = (name) => JSON.parse(sessionStorage.getItem(name));

if (typeof module !== 'undefined') {
  module.exports = {
    saveItem,
    getSavedItem,
    saveItemSessionStorage,
    getItemSessionStorage,
  };
}