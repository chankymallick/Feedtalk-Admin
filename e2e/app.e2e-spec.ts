import { FeedtalkAdminPage } from './app.po';

describe('feedtalk-admin App', () => {
  let page: FeedtalkAdminPage;

  beforeEach(() => {
    page = new FeedtalkAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
