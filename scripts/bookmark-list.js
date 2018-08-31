/* global store api */
//eslint-disable-next-line no-unused-vars
const bookmarkList = (function() {
  function generateCollapsedBookmarkElement(bookmark, bookmarkRating) {
    return `
      <li class="bookmark-list-item" data-id="${bookmark.id}">
        <h2 class="bookmark-title">${bookmark.title}</h2>
        <meter value="${bookmark.rating}" min="0" max="5" class="bookmark-rating">${bookmarkRating}</meter>
      </li>
    `;
  }

  function generateExpandedBookmarkElement(bookmark, bookmarkRating) {
    return `
      <li class="bookmark-list-item" data-id="${bookmark.id}">
        <h2 class="bookmark-title">${bookmark.title}</h2>
        <meter value="${bookmark.rating}" min="0" max="5" class="bookmark-rating">${bookmarkRating}</meter>
        <p class="bookmark-description">${bookmark.desc}</p>
        <div class="bookmark-buttons">
          <a class="bookmark-visit" href="${bookmark.url}">Visit Website</a>
          <button class="bookmark-edit">Edit</button>
          <button class="bookmark-delete">Delete</button>
        </div>
      </li>
    `;
  }

  function generateBookmarkRatingText(bookmarkRating) {
    switch (bookmarkRating) {
      case 5: 
        return '<span class="orange">★★★★★</span>';
      case 4:
        return '<span class="orange">★★★★</span><span class="black">★</span>';
      case 3: 
        return '<span class="orange">★★★</span><span class="black">★★</span>';
      case 2: 
        return '<span class="orange">★★</span><span class="black">★★★</span>';
      case 1:
        return '<span class="orange">★</span><span class="black">★★★★</span>';
      default:
        return '<span class="black">★★★★★</span>';
    }
  }

  function generateBookmarkElement(bookmark) {
    const bookmarkRating = generateBookmarkRatingText(bookmark.rating);
    
    if (bookmark.id === store.expanded) {
      return generateExpandedBookmarkElement(bookmark, bookmarkRating);
    } else {
      return generateCollapsedBookmarkElement(bookmark, bookmarkRating);
    }
  }

  function generateHeaderHtml() {
    if (store.adding) {
      return '<h1>Add Bookmark</h1>';
    } else if (store.editing) {
      return '<h1>Edit Bookmark</h1>';
    } else {
      return '<h1>Bookmarks</h1>';
    }
  }

  function generateListFormHtml(filter) {
    return `
      <label for="rating-filter" name="minimum rating" class="hidden">Rating filter</label>
      <select name="rating-filter" id="rating-filter" class="rating-filter">
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

  function generateAddListHtml() {
    return `
      <input type="text" name="title" placeholder="Title">
      <br>
      <input type="text" name="url" placeholder="Website url">
      <br>
      <label for="rating" class="rating">Ratings</label>
        <div class="rating">
          <label>
            <input type="radio" name="rating" value="1"><span class="icon">★</span> 
          </label>
          <label>
            <input type="radio" name="rating" value="2"><span class="icon">★★</span>
          </label>
          <label>
            <input type="radio" name="rating" value="3"><span class="icon">★★★</span>
          </label>
          <label>
            <input type="radio" name="rating" value="4"><span class="icon">★★★★</span>
          </label>
          <label>
            <input type="radio" name="rating" value="5"><span class="icon">★★★★★</span>
          </label>
        </div> 
      <br>
      <input type="textfield" name="desc" placeholder="Enter a description">
      <br>
      <button type="submit">Add Bookmark</button>
      <button type="button" id="cancel">Cancel</button>
    `;
  }

  function generateEditListHtml(editingBookmark) {
    return `
      <input type="text" name="title" placeholder="Title" value="${editingBookmark.title}">
      <br>
      <input type="text" name="url" placeholder="Website url" value="${editingBookmark.url}">
      <br>
      <label for="rating">Ratings</label>
      <div class="rating">
        <label>
          <input type="radio" name="rating" value="1" ${editingBookmark.rating === 1 ? 'checked="checked"' : ''}><span class="icon">★</span> 
        </label>
        <label>
          <input type="radio" name="rating" value="2" ${editingBookmark.rating === 2 ? 'checked="checked"' : ''}><span class="icon">★★</span>
        </label>
        <label>
          <input type="radio" name="rating" value="3" ${editingBookmark.rating === 3 ? 'checked="checked"' : ''}><span class="icon">★★★</span>
        </label>
        <label>
          <input type="radio" name="rating" value="4" ${editingBookmark.rating === 4 ? 'checked="checked"' : ''}><span class="icon">★★★★</span>
        </label>
        <label>
          <input type="radio" name="rating" value="5" ${editingBookmark.rating === 5 ? 'checked="checked"' : ''}><span class="icon">★★★★★</span>
        </label>
      </div>
      <br>
      <input type="textfield" name="desc" placeholder="Enter a description" value="${editingBookmark.desc}">
      <br>
      <button type="submit">Edit Bookmark</button>
      <button type="button" id="cancel">Cancel</button>
      <button type="button" id="delete">Delete</button>
    `;
  }


  function generateErrorMessageHtml() {
    return store.error;
  }

  function renderErrorMessage() {
    const errorMessageHtml = generateErrorMessageHtml();
    store.resetError();
    $('aside').html(errorMessageHtml);
  }

  function render() {
    console.log('ran');
    const headerHtml = generateHeaderHtml();
    const listFormHtml = store.adding || store.editing ? '' : generateListFormHtml(store.filter);

    let modifyListHtml = '';
    if (store.adding) {
      modifyListHtml = generateAddListHtml();
    } else if (store.editing) {
      const editingBookmark = store.findBookmark(store.editing);
      modifyListHtml = generateEditListHtml(editingBookmark);
    }

    const filteredList = store.list.filter(bookmark => bookmark.rating >= store.filter);
    const listHtml = store.adding || store.editing ? '' : filteredList.map(generateBookmarkElement).join('');
    
    $('header').html(headerHtml);
    $('aside').html('');
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
    $('.bookmark-list').on('click', '.bookmark-delete', function(e) {
      e.stopPropagation();
      const id = $(this).closest('.bookmark-list-item').attr('data-id');
      api.deleteBookmark(id, function() {
        store.findAndDelete(id);
        render();
      });
    });
  }


  function handleDeleteButtonOnEditScreenClicked() {
    $('.modify-list').on('click', '#delete', function() {
      const id = store.editing;
      store.clearEditing();
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

  function handleEditBookmarkButtonClicked() {
    $('.bookmark-list').on('click', '.bookmark-edit', function(e) {
      e.stopPropagation();
      const id = $(this).closest('.bookmark-list-item').attr('data-id');
      store.setEditing(id);
      render();
    });
  }

  function handleCancelButtonClicked() {
    $('.modify-list').on('click', '#cancel', function() {
      if (store.editing) store.clearEditing();
      if (store.adding) store.toggleAdding();
      render();
    });
  }

  function displayError(error) {
    const errorMessage = error.responseJSON.message;
    store.setError(errorMessage);
    renderErrorMessage();
  }

  function handleBookmarkSubmitClicked() {
    $('.modify-list').on('submit', function(e) {
      e.preventDefault();
      if (store.adding) {
        const newBookmark = $(this).serializeJson();
        api.addBookmark(newBookmark, function(response) {
          store.addBookmark(response);
          store.toggleAdding();
          render();
        }, displayError);
      } else if (store.editing) {
        const updatedBookmark = $(this).serializeJson();
        const newParameters = (JSON.parse(updatedBookmark));
        newParameters.rating = Number(newParameters.rating);
        if (newParameters.desc === '') delete newParameters.desc;
        api.editBookmark(store.editing, JSON.stringify(newParameters), function(){
          store.findAndEdit(store.editing, newParameters);
          store.clearEditing();
          render();
        }, displayError);
      }
    });
  }

  function bindEventListeners() {
    handleListItemClicked();
    handleRatingFilterChange();
    handleRemoveButtonClicked();
    handleAddBookmarkButtonClicked();
    handleEditBookmarkButtonClicked();
    handleBookmarkSubmitClicked();
    handleDeleteButtonOnEditScreenClicked();
    handleCancelButtonClicked();
  }

  return {
    render,
    bindEventListeners
  };
}());