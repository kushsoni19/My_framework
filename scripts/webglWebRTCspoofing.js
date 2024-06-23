module.exports = async (pageOrDriver) => {
    const spoofWebGLandWebRTC = () => {
      // Spoof WebGL properties
      const getParameter = WebGLRenderingContext.prototype.getParameter;
      WebGLRenderingContext.prototype.getParameter = function(parameter) {
        // Fake a specific GPU model
        if (parameter === 37446) {
          return 'Intel Open Source Technology Center';
        }
        if (parameter === 37447) {
          return 'Mesa DRI Intel(R) HD Graphics 620 (Kaby Lake GT2)';
        }
        return getParameter(parameter);
      };
  
      // Spoof WebRTC properties
      const getUserMedia = navigator.mediaDevices.getUserMedia;
      navigator.mediaDevices.getUserMedia = function(constraints) {
        const fakeStream = new MediaStream();
        return Promise.resolve(fakeStream);
      };
    };
  
    if (pageOrDriver.evaluate) { // Puppeteer
      await pageOrDriver.evaluate(spoofWebGLandWebRTC);
    } else { // Selenium
      await pageOrDriver.executeScript(`(${spoofWebGLandWebRTC.toString()})();`);
    }
  };
  