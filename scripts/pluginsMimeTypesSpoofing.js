module.exports = async (pageOrDriver) => {
    const spoofPluginsAndMimeTypes = () => {
      const navigator = window.navigator;
  
      const fakePlugins = [
        { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
        { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '' },
        { name: 'Native Client', filename: 'internal-nacl-plugin', description: '' },
      ];
      const fakeMimeTypes = [
        { type: 'application/pdf', suffixes: 'pdf', description: '' },
        { type: 'application/x-nacl', suffixes: '', description: '' },
        { type: 'application/x-pnacl', suffixes: '', description: '' },
      ];
  
      navigator.plugins = fakePlugins;
      navigator.mimeTypes = fakeMimeTypes;
    };
  
    if (pageOrDriver.evaluate) { // Puppeteer
      await pageOrDriver.evaluate(spoofPluginsAndMimeTypes);
    } else { // Selenium
      await pageOrDriver.executeScript(`(${spoofPluginsAndMimeTypes.toString()})();`);
    }
  };
  