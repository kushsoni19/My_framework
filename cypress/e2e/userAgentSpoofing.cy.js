// cypress/e2e/userAgentSpoofing.cy.js
describe('User-Agent Spoofing', () => {
  it('should spoof the user-agent', () => {
      cy.intercept('**/*', (req) => {
          req.headers['User-Agent'] = 'Your User Agent';
      }).as('userAgentSpoofing');
      cy.visit('https://example.com', { onBeforeLoad: (win) => {
          Object.defineProperty(win.navigator, 'userAgent', {
              value: 'Your User Agent',
              writable: false
          });
      }});
  });
});
