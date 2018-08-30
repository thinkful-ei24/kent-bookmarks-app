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
        <option value="0" ${store.filter === 0 ? 'selected="true"' : ''}>Minimum Rating</option>
        <option value="5" ${store.filter === 5 ? 'selected="true"' : ''}>5</option>
        <option value="4" ${store.filter === 4 ? 'selected="true"' : ''}>4</option>
        <option value="3" ${store.filter === 3 ? 'selected="true"' : ''}>3</option>
        <option value="2" ${store.filter === 2 ? 'selected="true"' : ''}>2</option>
        <option value="1" ${store.filter === 1 ? 'selected="true"' : ''}>1</option>
      </select>
      <button>Add Bookmark</button>
    `;
  }
  function render() {
    const headerHtml = generateHeaderHtml();
    const listFormHtml = generateListFormHtml();

    const filteredList = store.list.filter(bookmark => bookmark.rating >= store.filter);
    const listHtml = filteredList.map(generateBookmarkElement).join('');
    
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

  function handleRatingFilterChange() {
    $('.options').on('change', '#rating-filter', function() {
      const selected = $(this).val();
      store.changeFilter(selected);
      render();
    });
  }

  function handleRemoveButtonClicked() {
    $('.bookmark-list').on('click', '.bookmark-delete', function() {
      const id = $(this).parent().attr('data-id');
      render();
    });
  }

  function bindEventListeners() {
    handleListItemClicked();
    handleRatingFilterChange();
    handleRemoveButtonClicked();
  }

  return {
    render,
    bindEventListeners
  };
}());