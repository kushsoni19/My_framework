module.exports = async (pageOrDriver) => {
    const spoofTimezone = () => {
      const Intl = window.Intl;
      Intl.DateTimeFormat = class extends Intl.DateTimeFormat {
        constructor(locales, options) {
          super(locales, { ...options, timeZone: 'America/New_York' });
        }
      };
    };
  
    if (pageOrDriver.evaluate) { // Puppeteer
      await pageOrDriver.evaluate(spoofTimezone);
    } else { // Selenium
      await pageOrDriver.executeScript(`(${spoofTimezone.toString()})();`);
    }
  };
  