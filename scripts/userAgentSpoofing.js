module.exports = async (pageOrDriver) => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    
    if (pageOrDriver.setUserAgent) { // Puppeteer
      await pageOrDriver.setUserAgent(userAgent);
    } else { // Selenium
      await pageOrDriver.executeScript(`Object.defineProperty(navigator, 'userAgent', {get: () => '${userAgent}'});`);
    }
  };
  