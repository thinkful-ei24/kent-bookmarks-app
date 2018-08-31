/* global store api */
//eslint-disable-next-line no-unused-vars
const bookmarkList = (function() {
  function generateBookmarkElement(bookmark) {
    const bookmarkRating = generateBookmarkRatingText(bookmark.rating);
    let expanded = '';
    
    if (bookmark.id === store.expanded) {
      expanded =`
        <p class="bookmark-description">${bookmark.desc}</p>
        <a class="bookmark-visit" aria-label="Visit Website" href="${bookmark.url}">Visit Website: ${bookmark.url}</a>
        <div class="bookmark-buttons">
          <button class="bookmark-edit">Edit</button>
          <button class="bookmark-delete">Delete</button>
        </div>
      `;
    }

    return `
      <li class="bookmark-list-item" data-id="${bookmark.id}">
        <a href="#" role="button">
          <h2 class="bookmark-title">${bookmark.title}</h2>
          <span class="bookmark-rating">${bookmarkRating}</span>
          ${expanded}
        </a>
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
      <label for="rating-filter" name="rating-filter" class="hidden">Rating filter</label>
      <select name="rating-filter" id="rating-filter" class="rating-filter">
        <option value="0"  aria-label="Select minimum rating" ${filter === 0 ? 'selected="true"' : ''}>Minimum Rating</option>
        <option value="5" aria-label="5 stars only" ${filter === 5 ? 'selected="true"' : ''}>★★★★★</option>
        <option value="4" aria-label="4 stars and up" ${filter === 4 ? 'selected="true"' : ''}>★★★★☆ & up</option>
        <option value="3" aria-label="3 stars and up" ${filter === 3 ? 'selected="true"' : ''}>★★★☆☆ & up</option>
        <option value="2" aria-label="2 stars and up" ${filter === 2 ? 'selected="true"' : ''}>★★☆☆☆ & up</option>
        <option value="1" aria-label="1 star and up" ${filter === 1 ? 'selected="true"' : ''}>★☆☆☆☆ & up</option>
      </select>
      
      <button class="add-bookmark">Add Bookmark</button>
    `;
  }

  function generateAddListHtml() {
    return `
      <label for="bookmark-title" class="hidden">Title</label>
      <input type="text" name="title" class="short-textfield" aria-label="bookmark-title" placeholder="Title">
      <label for="bookmark-url" class="hidden">Url</label>
      <input type="text" class="short-textfield" name="url" aria-label="bookmark-url" placeholder="Website url">
      <div class=rating-input>
        <label for="rating" id="rating" class="rating hidden">Ratings</label>
        <div class="rating" role="radiogroup" aria-labelledby="rating">
          <label>
            <input type="radio" role="radio" name="rating" value="1"><span class="icon">★</span> 
          </label>
          <label>
            <input type="radio" role="radio" name="rating" value="2"><span class="icon">★★</span>
          </label>
          <label>
            <input type="radio" role="radio" name="rating" value="3"><span class="icon">★★★</span>
          </label>
          <label>
            <input type="radio" role="radio" name="rating" value="4"><span class="icon">★★★★</span>
          </label>
          <label>
            <input type="radio" role="radio" name="rating" value="5" checked="checked"><span class="icon">★★★★★</span>
          </label>
        </div>
      </div>
      <label for="bookmark-description" class="hidden">Description</label>
      <textarea name="desc" class="bookmark-description large-textfield" aria-label="bookmark-description" placeholder="Enter a description"></textarea>
      <button type="submit" class="bookmark-submit">Submit</button>
      <button type="button" id="cancel">Cancel</button>
    `;
  }

  function generateEditListHtml(editingBookmark) {
    return `
      <label for="bookmark-title" class="hidden">Title</label>
      <input type="text" class="short-textfield" name="title" aria-label="bookmark-title" placeholder="Title" value="${editingBookmark.title}">
      <label for="bookmark-url" class="hidden">Url</label>
      <input type="text" class="short-textfield" name="url" aria-label="bookmark-url" placeholder="Website url" value="${editingBookmark.url}">
      <div class=rating-input>
        <label for="rating" id="rating" class="rating hidden">Ratings</label>
        <div class="rating" role="radiogroup" aria-labelledby="rating">
          <label>
            <input type="radio" role="radio" name="rating" value="1" ${editingBookmark.rating === 1 ? 'checked="checked"' : ''}><span class="icon">★</span> 
          </label>
          <label>
            <input type="radio" role="radio" name="rating" value="2" ${editingBookmark.rating === 2 ? 'checked="checked"' : ''}><span class="icon">★★</span>
          </label>
          <label>
            <input type="radio" role="radio" name="rating" value="3" ${editingBookmark.rating === 3 ? 'checked="checked"' : ''}><span class="icon">★★★</span>
          </label>
          <label>
            <input type="radio" role="radio" name="rating" value="4" ${editingBookmark.rating === 4 ? 'checked="checked"' : ''}><span class="icon">★★★★</span>
          </label>
          <label>
            <input type="radio" role="radio" name="rating" value="5" ${editingBookmark.rating === 5 ? 'checked="checked"' : ''}><span class="icon">★★★★★</span>
          </label>
        </div>
      </div>
      <label for="bookmark-description" class="hidden">Description</label>
      <textarea name="desc" class="bookmark-description large-textfield" aria-label="bookmark-description" placeholder="Enter a description">${editingBookmark.desc}</textarea>
      <button type="submit" class="bookmark-submit">Submit</button>
      <button type="button" id="cancel">Cancel</button>
      <button type="button" id="delete" class="modify-list-delete">Delete</button>
    `;
  }

  function generateErrorMessageHtml() {
    return `<h2 class="error-message">${store.error}</h2>`;
  }

  function render() {
    console.log('ran');
    const headerHtml = generateHeaderHtml();
    const listFormHtml = store.adding || store.editing ? '' : generateListFormHtml(store.filter);
    const errorMessageHtml = store.error ? generateErrorMessageHtml() : '';
    $('aside').html(errorMessageHtml);

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
    $('aside').html(errorMessageHtml);
    $('.options').html(listFormHtml);
    $('.bookmark-list').html(listHtml);
    if (!store.error) {
      $('.modify-list').html(modifyListHtml);
    }
  }

  function handleListItemClicked() {
    $('.bookmark-list').on('click ', '.bookmark-list-item', function(e) {
      e.preventDefault();
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
        store.resetError();
        render();
      });
    });
  }

  function handleAddBookmarkButtonClicked() {
    $('.options').on('click', '.add-bookmark', function(e) {
      e.preventDefault();
      store.toggleAdding();
      store.resetError();
      render();
    });
  }

  function handleEditBookmarkButtonClicked() {
    $('.bookmark-list').on('click', '.bookmark-edit', function(e) {
      e.stopPropagation();
      const id = $(this).closest('.bookmark-list-item').attr('data-id');
      store.setEditing(id);
      store.resetError();
      render();
    });
  }

  function handleVisitWebsiteClicked() {
    $('.bookmark-list').on('click', '.bookmark-visit', function(e) {
      e.stopPropagation();
    });
  }

  function handleCancelButtonClicked() {
    $('.modify-list').on('click', '#cancel', function() {
      if (store.editing) store.clearEditing();
      if (store.adding) store.toggleAdding();
      store.resetError();
      render();
    });
  }

  function displayError(error) {
    const errorMessage = error.responseJSON.message;
    store.setError(errorMessage);
    render();
  }

  function handleBookmarkSubmitClicked() {
    $('.modify-list').on('submit', function(e) {
      e.preventDefault();
      if (store.adding) {
        const newBookmark = $(this).serializeJson();
        api.addBookmark(newBookmark, function(response) {
          store.addBookmark(response);
          store.toggleAdding();
          store.resetError();
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
          store.resetError();
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
    handleVisitWebsiteClicked();
  }

  return {
    render,
    bindEventListeners
  };
}());