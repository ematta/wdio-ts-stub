import { expect } from 'chai';
import IndexPage from 'src/page/index.page.ts';

describe('Internet Homepage', () => {
  it('should open the page', () => {
    IndexPage.open;
    expect(browser.getTitle()).to.be.equal('The Internet');
  });
});
