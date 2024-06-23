module.exports = async (pageOrDriver) => {
    const spoofCSSandDOM = () => {
      const originalQuerySelector = Document.prototype.querySelector;
      Document.prototype.querySelector = function(selectors) {
        if (selectors === 'head') {
          return originalQuerySelector.call(document, 'html');
        }
        return originalQuerySelector.call(this, selectors);
      };
    };
  
    if (pageOrDriver.evaluate) { // Puppeteer
      await pageOrDriver.evaluate(spoofCSSandDOM);
    } else { // Selenium
      await pageOrDriver.executeScript(`(${spoofCSSandDOM.toString()})();`);
    }
  };
  