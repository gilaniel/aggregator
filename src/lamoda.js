const buttonTemplate = '<button style="margin: 15px 0 0 0;" class="js-add-to-favorite-btn button button_blue button_active"><span class="button__title">Add to favorite</span></button>';

export default function() {

  const addButton = () => {
    $('.product__cart-add').append(buttonTemplate);
  }

  const addToFavorite = (page) => {
    chrome.runtime.sendMessage({ action: "add_to_favorite", page: page }, response => {
      console.log(response);
    });
  }

  addButton();

  $(function(){
    $('.js-add-to-favorite-btn').on('click', () => {
      addToFavorite(location.href);
    });
  });
}