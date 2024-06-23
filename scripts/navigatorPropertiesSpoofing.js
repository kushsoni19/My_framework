module.exports = async (pageOrDriver) => {
    const spoofProperties = () => {
      const navigator = window.navigator;
      navigator.appCodeName = 'Mozilla';
      navigator.appName = 'Netscape';
      navigator.appVersion = '5.0 (Windows)';
      navigator.platform = 'Win32';
      navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    };
  
    if (pageOrDriver.evaluate) { // Puppeteer
      await pageOrDriver.evaluate(spoofProperties);
    } else { // Selenium
      await pageOrDriver.executeScript(`(${spoofProperties.toString()})();`);
    }
  };
  