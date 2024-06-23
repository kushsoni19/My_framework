Cypress.Commands.add('setUserAgent', (userAgent) => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        Object.defineProperty(win.navigator, 'userAgent', { value: userAgent });
      }
    });
  });
  
  Cypress.Commands.add('setScreenResolution', (width, height) => {
    cy.viewport(width, height);
  });
  
  Cypress.Commands.add('setNavigatorProperty', (property, value) => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        Object.defineProperty(win.navigator, property, { value: value });
      }
    });
  });
  
  Cypress.Commands.add('setPluginsAndMimeTypes', (plugins, mimeTypes) => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        Object.defineProperty(win.navigator, 'plugins', { value: plugins });
        Object.defineProperty(win.navigator, 'mimeTypes', { value: mimeTypes });
      }
    });
  });
  