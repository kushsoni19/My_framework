module.exports = async (pageOrDriver) => {
    const width = 1920;
    const height = 1080;
  
    if (pageOrDriver.setViewport) { // Puppeteer
      await pageOrDriver.setViewport({ width, height });
    } else { // Selenium
      await pageOrDriver.executeScript(`window.screen = {width: ${width}, height: ${height}};`);
    }
  };
  