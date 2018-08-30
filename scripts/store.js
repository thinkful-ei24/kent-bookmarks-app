//eslint-disable-next-line no-unused-vars
const store = (function() {
  const addBookmark = function(bookmark) {
    this.list.push(bookmark);
  };

  const changeExpanded = function(id) {
    if (this.expanded === id) {
      this.expanded = null;
    } else {
      this.expanded = id;
    }
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

  const setEditing = function(id) {
    this.editing = id;
  };

  const findBookmark = function(id) {
    return this.list.find(bookmark => bookmark.id === id);
  };

  const setError = function(errorMessage) {
    this.error = errorMessage;
  };

  const resetError = function() {
    this.error = null;
  };

  const findAndEdit = function(id, newProperties) {
    const oldBookmark = this.findBookmark(id);
    Object.assign(oldBookmark, newProperties);
  };

  const clearEditing = function() {
    this.editing = null;
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
    setEditing,
    setError,
    resetError,
    findBookmark,
    findAndEdit,
    clearEditing
  };
}());