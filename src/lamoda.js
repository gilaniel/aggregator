
export default function() {
  let collection = [];
  let button = {
    text: 'Add to favorite',
    disabled: false
  };
  
  const article = $('span[itemprop="sku"]').attr('content');
  
  const buttonTemplate = (sku) => {
    return `<button style="margin: 15px 0 0 0;" data-sku="${sku}" class="js-add-to-favorite-btn button button_blue button_active"><span class="button__title">${button.text}</span></button>`;
  }

  const handleAddButton = () => {
    chrome.runtime.sendMessage({ action: "add_to_favorite", article: article }, response => {
      handleGetCollection(handleCheckInFavorites, response.data[0])
    });
  }

  const setButtonProps = () => {
    $('.js-add-to-favorite-btn').text(button.text);
    $('.js-add-to-favorite-btn').prop('disabled', button.disabled);
  }

  const handleCheckInFavorites = (collection, product) => {
    const item = collection.find((element) => {
      return element.sku === product.sku;
    });

    if (item) {
      button.text = 'Added to favorite';
      button.disabled = true;
    }

    if(!$('.js-add-to-favorite-btn').length) {
      $('.product__cart-add').append(buttonTemplate(article));
    }

    return item;
  }

  const handleSetCollection = (collection, product) => {
    collection = !collection || !collection.length ? [] : collection;

    if (!handleCheckInFavorites(collection, product)) {
      collection.push(product);

      button.text = 'Added to favorite';
      button.disabled = true;

      setButtonProps();
    }

    chrome.storage.sync.set({'collection': collection});

  }

  const handleGetCollection = (cb, product) => {
    chrome.storage.sync.get('collection', result => {
      cb(result.collection, product);
    });
  }

  const addToFavorite = (page) => {
    chrome.runtime.sendMessage({ action: "add_to_favorite", article: article }, response => {
      handleGetCollection(handleSetCollection, response.data[0])
    });
  }

  handleAddButton();

  $(function(){
    $('.js-add-to-favorite-btn').on('click', () => {
      addToFavorite(location.href);
    });
  });

  chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      button.text = 'Add to favorite';
      button.disabled = false;

      setButtonProps();
    }
  );
}