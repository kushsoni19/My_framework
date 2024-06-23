describe('Navigator Properties Spoofing', () => {
  it('should spoof navigator properties', () => {
    cy.visit('https://www.whatismybrowser.com/');
    cy.window().then((win) => {
      const properties = {
        appCodeName: win.navigator.appCodeName,
        appName: win.navigator.appName,
        appVersion: win.navigator.appVersion,
        platform: win.navigator.platform,
        userAgent: win.navigator.userAgent
      };
      cy.log(JSON.stringify(properties));
      // Add assertions to verify the spoofed properties
      expect(properties.appCodeName).to.not.equal('Mozilla');
    });
  });
});
