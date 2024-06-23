describe('Browser Fingerprint Spoofing', () => {
    it('should spoof the user-agent', () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, 'userAgent', {
            value: 'Your User Agent',
            writable: false
          });
        }
      });
  
      cy.window().then((win) => {
        expect(win.navigator.userAgent).to.equal('Your User Agent');
      });
    });
  
    it('should spoof the screen resolution', () => {
      cy.viewport(1280, 720);
      cy.visit('/');
      cy.window().then((win) => {
        expect(win.screen.width).to.equal(1280);
        expect(win.screen.height).to.equal(720);
      });
    });
  
    it('should spoof the navigator properties', () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, 'language', {
            value: 'en-US',
            writable: false
          });
          Object.defineProperty(win.navigator, 'languages', {
            value: ['en-US'],
            writable: false
          });
        }
      });
  
      cy.window().then((win) => {
        expect(win.navigator.language).to.equal('en-US');
        expect(win.navigator.languages).to.include('en-US');
      });
    });
  
    it('should spoof plugins and mime types', () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          const plugins = [];
          const mimeTypes = [];
          Object.defineProperty(win.navigator, 'plugins', {
            value: plugins,
            writable: false
          });
          Object.defineProperty(win.navigator, 'mimeTypes', {
            value: mimeTypes,
            writable: false
          });
        }
      });
  
      cy.window().then((win) => {
        expect(win.navigator.plugins.length).to.equal(0);
        expect(win.navigator.mimeTypes.length).to.equal(0);
      });
    });
  
    it('should spoof the timezone', () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          const timeZone = 'America/New_York';
          cy.stub(win.Intl.DateTimeFormat.prototype, 'resolvedOptions').returns({
            timeZone: timeZone
          });
        }
      });
  
      cy.window().then((win) => {
        expect(Intl.DateTimeFormat().resolvedOptions().timeZone).to.equal('America/New_York');
      });
    });
  
    it('should spoof WebGL and WebRTC', () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          delete win.WebGLRenderingContext;
          delete win.RTCPeerConnection;
        }
      });
  
      cy.window().then((win) => {
        expect(win.WebGLRenderingContext).to.be.undefined;
        expect(win.RTCPeerConnection).to.be.undefined;
      });
    });
  });
  