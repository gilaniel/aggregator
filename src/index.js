import lamoda from './lamoda';
import wild from './wild';

const pages = [{ page: /lamoda/, module: lamoda }, { page: /wildberries/, module: wild }];

pages.forEach((item) => {
  if (item.page.exec(document.URL)) {
    item.module();
  }
});