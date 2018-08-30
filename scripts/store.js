//eslint-disable-next-line no-unused-vars
const store = (function() {
  const addBookmark = function(bookmark) {
    this.list.push(bookmark);
  };

  return {
    list: [],
    adding: false,
    editing: null,
    expanded: null,
    filter: 0,
    error: null,

    addBookmark
  };
}());