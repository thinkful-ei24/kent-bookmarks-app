/* global api store bookmarkList */
$(function() {
  api.getBookmarks(response => {
    response.forEach(bookmark => {
      store.addBookmark(bookmark);
      console.log(store.list);
    });
    bookmarkList.render();
  });

});