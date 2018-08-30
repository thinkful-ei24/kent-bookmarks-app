//eslint-disable-next-line no-unused-vars
const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/kent/bookmarks';
  
  const getBookmarks = function(callback) {
    $.getJSON(BASE_URL, callback);
  };

  return {
    getBookmarks
  };
}());