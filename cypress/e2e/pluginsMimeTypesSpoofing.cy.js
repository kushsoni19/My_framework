describe('Plugins and Mime Types Spoofing', () => {
  it('should spoof plugins and mime types', () => {
    cy.visit('https://www.whatismybrowser.com/');
    cy.window().then((win) => {
      const plugins = Array.from(win.navigator.plugins).map(plugin => plugin.name);
      const mimeTypes = Array.from(win.navigator.mimeTypes).map(mimeType => mimeType.type);
      cy.log(JSON.stringify({ plugins, mimeTypes }));
      // Add assertions to verify the spoofed plugins and mime types
      expect(plugins).to.not.include('Chrome PDF Plugin');
    });
  });
});
