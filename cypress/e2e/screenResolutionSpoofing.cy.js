describe('Screen Resolution Spoofing', () => {
  it('should spoof screen resolution', () => {
    cy.visit('https://www.whatismybrowser.com/');
    cy.window().then((win) => {
      const resolution = {
        width: win.screen.width,
        height: win.screen.height
      };
      cy.log(JSON.stringify(resolution));
      // Add assertions to verify the spoofed screen resolution
      expect(resolution.width).to.not.equal(win.innerWidth);
    });
  });
});
