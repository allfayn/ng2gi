import { GigyaPage } from './app.po';

describe('gigya App', function() {
  let page: GigyaPage;

  beforeEach(() => {
    page = new GigyaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
