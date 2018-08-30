//eslint-disable-next-line no-unused-vars
const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/kent';
  
  const getBookmarks = function(callback) {
    $.getJSON(BASE_URL + '/bookmarks', callback);
  };

  const deleteBookmark = function(id, callback) {
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'DELETE',
      success: callback
    });
  };

  const addBookmark = function(newBookmark, callback, errorCallback) {
    $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback,
      error: errorCallback
    });
  };

  const editBookmark = function(id, updatedBookmark, callback, errorCallback) {
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'PATCH',
      contentType: 'application/json',
      data: updatedBookmark,
      success: callback,
      error: errorCallback
    });
  };

  return {
    getBookmarks,
    deleteBookmark,
    addBookmark,
    editBookmark
  };
}());