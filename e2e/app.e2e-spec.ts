import { PrimerAppPage } from './app.po';

describe('primer-app App', () => {
  let page: PrimerAppPage;

  beforeEach(() => {
    page = new PrimerAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
