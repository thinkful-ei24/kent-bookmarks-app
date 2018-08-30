/* global */
//eslint-disable-next-line no-unused-vars
const bookmarkList = (function() {
  function render() {
    const headerHtml = '<h1>Bookmarks</h1>';
    const mainHtml = `
      <form class="options">
        <select name="rating-filter" id="rating-filter">
          <option value="five-stars">5</option>
          <option value="four-stars">4</option>
          <option value="three-stars">3</option>
          <option value="two-stars">2</option>
          <option value="one-star">1</option>
        </select>
        <button>Add Bookmark</button>
      </form>
      <ul class="bookmark-list">
        <li data-id="1">
          <h3 class="bookmark-title">Something</h3>
          <meter value="5" min="0" max="5" class="bookmark-rating">★★★★★</meter>
          <hr>
        </li>

        <li data-id="2">
          <h3 class="bookmark-title">Something</h3>
          <meter value="3" min="0" max="5" class="bookmark-rating">★★★☆☆</meter>
          <p class="bookmark-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat vero accusantium similique! Dignissimos id quidem ipsa earum qui dolore minima natus commodi! Sapiente repellendus natus quisquam odit optio, in laborum.</p>
          <button class="bookmark-visit">Visit Website</button>
          <button class="bookmark-edit">Edit</button>
          <button class="bookmark-delete">Delete</button>
          <hr>
        </li>

        <li data-id="3">
          <h3 class="bookmark-title">Something</h3>
          <meter value="2" min="0" max="5" class="bookmark-rating">★★☆☆☆</meter>
          <hr>
        </li>
        

        <li data-id="4">
          <h3 class="bookmark-title">Something</h3>
          <meter value="2" min="0" max="5" class="bookmark-rating">★★☆☆☆</meter>
          <hr>
        </li>


        <li data-id="5">
          <h3 class="bookmark-title">Something</h3>
          <meter value="2" min="0" max="5" class="bookmark-rating">★★☆☆☆</meter>
          <hr>
        </li>


        <li data-id="6">
          <h3 class="bookmark-title">Something</h3>
          <meter value="2" min="0" max="5" class="bookmark-rating">★★☆☆☆</meter>
          <hr>
        </li>


        <li data-id="7">
          <h3 class="bookmark-title">Something</h3>
          <meter value="2" min="0" max="5" class="bookmark-rating">★★☆☆☆</meter>
          <hr>
        </li>


        <li data-id="8">
          <h3 class="bookmark-title">Something</h3>
          <meter value="2" min="0" max="5" class="bookmark-rating">★★☆☆☆</meter>
          <hr>
        </li>

        <li data-id="9">
          <h3 class="bookmark-title">Something</h3>
          <meter value="2" min="0" max="5" class="bookmark-rating">★★☆☆☆</meter>
          <hr>
        </li>
      </ul>
    `;
    $('header').html(headerHtml);
    $('main').html(mainHtml);
  }

  return {
    render
  };
}());