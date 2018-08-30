/* global store api */
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

  function generateListFormHtml(filter) {
    return `
      <select name="rating-filter" id="rating-filter">
        <option value="0" ${filter === 0 ? 'selected="true"' : ''}>Minimum Rating</option>
        <option value="5" ${filter === 5 ? 'selected="true"' : ''}>5</option>
        <option value="4" ${filter === 4 ? 'selected="true"' : ''}>4</option>
        <option value="3" ${filter === 3 ? 'selected="true"' : ''}>3</option>
        <option value="2" ${filter === 2 ? 'selected="true"' : ''}>2</option>
        <option value="1" ${filter === 1 ? 'selected="true"' : ''}>1</option>
      </select>
      <button class="add-bookmark">Add Bookmark</button>
    `;
  }

  function generateModifyListHtml() {
    return `
      <input type="text" name="title" placeholder="Title">
      <br>
      <input type="text" name="url" placeholder="Website url">
      <br>
      <label for="rating" class="rating">Ratings</label>
        <input type="radio" name="rating" value="1"><span class="icon">★</span> 
        <input type="radio" name="rating" value="2"><span class="icon">★★</span> 
        <input type="radio" name="rating" value="3"><span class="icon">★★★</span> 
        <input type="radio" name="rating" value="4"><span class="icon">★★★★</span> 
        <input type="radio" name="rating" value="5"><span class="icon">★★★★★</span> 
      <br>
      <input type="textfield" name="desc" placeholder="Enter a description">
      <br>
      <button type="submit">Add/Edit Bookmark</button>
    `;
  }
  function render() {
    const headerHtml = generateHeaderHtml();
    const listFormHtml = store.adding || store.editing ? '' : generateListFormHtml(store.filter);
    const modifyListHtml = store.adding || store.editing  ? generateModifyListHtml() : '';

    const filteredList = store.list.filter(bookmark => bookmark.rating >= store.filter);
    const listHtml = store.adding || store.editing ? '' : filteredList.map(generateBookmarkElement).join('');
    
    $('header').html(headerHtml);
    $('.options').html(listFormHtml);
    $('.modify-list').html(modifyListHtml);
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
      api.deleteBookmark(id, function() {
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleAddBookmarkButtonClicked() {
    $('.options').on('click', '.add-bookmark', function(e) {
      e.preventDefault();
      store.toggleAdding();
      render();
    });
  }

  function handleBookmarkSubmitClicked() {
    $('.modify-list').on('submit', function(e) {
      e.preventDefault();
      const bookmarkInfo = $(this).serializeJson();
      console.log(bookmarkInfo);
    });
  }

  function bindEventListeners() {
    handleListItemClicked();
    handleRatingFilterChange();
    handleRemoveButtonClicked();
    handleAddBookmarkButtonClicked();
    handleBookmarkSubmitClicked();
  }

  return {
    render,
    bindEventListeners
  };
}());