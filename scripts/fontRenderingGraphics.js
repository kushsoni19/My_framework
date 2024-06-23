module.exports = async (pageOrDriver) => {
    const spoofFontRenderingGraphics = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.textBaseline = 'top';
      context.font = '14px Arial';
      context.fillText('Hello, world!', 2, 2);
  
      const fakeDataURL = 'data:image/png;base64,' + btoa('fakeImage');
      HTMLCanvasElement.prototype.toDataURL = function() {
        return fakeDataURL;
      };
    };
  
    if (pageOrDriver.evaluate) { // Puppeteer
      await pageOrDriver.evaluate(spoofFontRenderingGraphics);
    } else { // Selenium
      await pageOrDriver.executeScript(`(${spoofFontRenderingGraphics.toString()})();`);
    }
  };
  