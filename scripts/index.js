/* global api store bookmarkList */
$(function() {
  api.getBookmarks(response => {
    response.forEach(bookmark => {
      store.addBookmark(bookmark);
    });
    bookmarkList.render();
  });
  bookmarkList.bindEventListeners();
});