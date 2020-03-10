import BasePage from 'src/page/base.page'

class IndexPage extends BasePage{
  public get open(): void {
    return browser.url('');
  }

}

export default new IndexPage();
