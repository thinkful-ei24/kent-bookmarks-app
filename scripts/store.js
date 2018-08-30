//eslint-disable-next-line no-unused-vars
const store = (function() {
  const addBookmark = function(bookmark) {
    this.list.push(bookmark);
  };

  const changeExpanded = function(id) {
    this.expanded = id;
  };

  return {
    list: [],
    adding: false,
    editing: null,
    expanded: null,
    filter: 0,
    error: null,

    addBookmark,
    changeExpanded
  };
}());