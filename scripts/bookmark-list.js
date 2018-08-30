/* global store */
//eslint-disable-next-line no-unused-vars
const bookmarkList = (function() {
  function generateCollapsedBookmarkElement(bookmark) {
    return `
      <li class="bookmark-list-item" data-id="${bookmark.id}">
        <h3 class="bookmark-title">${bookmark.title}</h3>
        <meter value="${bookmark.rating}" min="0" max="5" class="bookmark-rating">${bookmark.rating}</meter>
        <hr>
      </li>
    `;
  }

  function generateExpandedBookmarkElement(bookmark) {
    return `
      <li class="bookmark-list-item" data-id="${bookmark.id}">
        <h3 class="bookmark-title">${bookmark.title}</h3>
        <meter value="${bookmark.rating}" min="0" max="5" class="bookmark-rating">${bookmark.rating}</meter>
        <p class="bookmark-description">${bookmark.desc}</p>
        <a class="bookmark-visit" href="${bookmark.url}">Visit Website</a>
        <button class="bookmark-edit">Edit</button>
        <button class="bookmark-delete">Delete</button>
        <hr>
      </li>
    `;
  }

  function generateBookmarkElement(bookmark) {
    if (bookmark.id === store.expanded) {
      return generateExpandedBookmarkElement(bookmark);
    } else {
      return generateCollapsedBookmarkElement(bookmark);
    }
  }

  function generateHeaderHtml() {
    return '<h1>Bookmarks</h1>';
  }

  function generateListFormHtml() {
    return `
      <select name="rating-filter" id="rating-filter">
        <option value="five-stars">5</option>
        <option value="four-stars">4</option>
        <option value="three-stars">3</option>
        <option value="two-stars">2</option>
        <option value="one-star">1</option>
      </select>
      <button>Add Bookmark</button>
    `;
  }
  function render() {
    const headerHtml = generateHeaderHtml();
    const listFormHtml = generateListFormHtml();
    const listHtml = store.list.map(generateBookmarkElement).join('');
    $('header').html(headerHtml);
    $('.options').html(listFormHtml);
    $('.bookmark-list').html(listHtml);
  }

  function handleListItemClicked() {
    $('.bookmark-list').on('click', '.bookmark-list-item', function() {
      const id = $(this).attr('data-id');
      store.changeExpanded(id);
      render();
    });
  }

  function bindEventListeners() {
    handleListItemClicked();
  }

  return {
    render,
    bindEventListeners
  };
}());