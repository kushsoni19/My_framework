module.exports = async (pageOrDriver) => {
    const spoofJavaScriptExecution = () => {
      const originalToString = Function.prototype.toString;
      Function.prototype.toString = function() {
        if (this === spoofJavaScriptExecution) {
          return 'function () { [native code] }';
        }
        return originalToString.apply(this, arguments);
      };
    };
  
    if (pageOrDriver.evaluate) { // Puppeteer
      await pageOrDriver.evaluate(spoofJavaScriptExecution);
    } else { // Selenium
      await pageOrDriver.executeScript(`(${spoofJavaScriptExecution.toString()})();`);
    }
  };
  