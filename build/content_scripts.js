!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=108)}({108:function(t,e,n){n.r(e);[{page:/lamoda/,module:function(){var t={text:"Add to favorite",disabled:!1},e=$('span[itemprop="sku"]').attr("content"),n=function(e){return'<button style="margin: 15px 0 0 0;" data-sku="'.concat(e,'" class="js-add-to-favorite-btn button button_blue button_active"><span class="button__title">').concat(t.text,"</span></button>")},o=function(){$(".js-add-to-favorite-btn").text(t.text),$(".js-add-to-favorite-btn").prop("disabled",t.disabled)},r=function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],r=arguments.length>1?arguments[1]:void 0,a=o.find(function(t){return t.sku===r.sku});return a&&(t.text="Added to favorite",t.disabled=!0),$(".js-add-to-favorite-btn").length||$(".product__cart-add").append(n(e)),a},a=function(e,n){e=e&&e.length?e:[],r(e,n)||(e.push(n),t.text="Added to favorite",t.disabled=!0,o()),chrome.storage.sync.set({collection:e})},i=function(t,e){chrome.storage.sync.get("collection",function(n){t(n.collection,e)})};chrome.runtime.sendMessage({action:"add_to_favorite",article:e},function(t){i(r,t.data[0])}),$("body").on("click",".js-add-to-favorite-btn",function(){location.href,chrome.runtime.sendMessage({action:"add_to_favorite",article:e},function(t){i(a,t.data[0])})}),chrome.runtime.onMessage.addListener(function(e,n,r){t.text="Add to favorite",t.disabled=!1,"remove"===e.type&&(r({body:"ok"}),o())})}},{page:/wildberries/,module:function(){console.log("wildberries")}}].forEach(function(t){t.page.exec(document.URL)&&t.module()})}});