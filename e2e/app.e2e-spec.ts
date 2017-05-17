import { TrkAppSPage } from './app.po';

describe('trk-app-s App', () => {
  let page: TrkAppSPage;

  beforeEach(() => {
    page = new TrkAppSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
