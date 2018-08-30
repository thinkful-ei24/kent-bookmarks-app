//eslint-disable-next-line no-unused-vars
const store = (function() {
  const addBookmark = function(bookmark) {
    this.list.push(bookmark);
  };

  const changeExpanded = function(id) {
    this.expanded = id;
  };

  const changeFilter = function(minimumRating) {
    this.filter = Number(minimumRating);
  };

  const findAndDelete = function(id) {
    this.list = this.list.filter(bookmark => bookmark.id !== id);
  };

  const toggleAdding = function() {
    this.adding = !this.adding;
  };

  const setError = function(errorMessage) {
    this.error = errorMessage;
  };

  return {
    list: [],
    adding: false,
    editing: null,
    expanded: null,
    filter: 0,
    error: null,

    addBookmark,
    changeExpanded,
    changeFilter,
    findAndDelete,
    toggleAdding,
    setError
  };
}());