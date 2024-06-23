const { Builder, Capabilities } = require('selenium-webdriver');

(async function example() {
    let capabilities = Capabilities.chrome();
    capabilities.set('chromeOptions', {
        'args': ['--user-agent=Your User Agent']
    });

    let driver = await new Builder().forBrowser('chrome').withCapabilities(capabilities).build();
    try {
        await driver.get('http://localhost:8080');

        // Check User-Agent
        let userAgent = await driver.executeScript("return navigator.userAgent;");
        console.log('User-Agent:', userAgent);

        // Check Screen Resolution
        await driver.manage().window().setRect({ width: 1280, height: 720 });
        let width = await driver.executeScript("return screen.width;");
        let height = await driver.executeScript("return screen.height;");
        console.log('Screen Width:', width, 'Height:', height);

        // Check Navigator Properties
        let language = await driver.executeScript("return navigator.language;");
        console.log('Language:', language);

        // Check Plugins and MimeTypes
        let plugins = await driver.executeScript("return navigator.plugins.length;");
        let mimeTypes = await driver.executeScript("return navigator.mimeTypes.length;");
        console.log('Plugins:', plugins, 'MimeTypes:', mimeTypes);

        // Check Timezone
        let timeZone = await driver.executeScript("return Intl.DateTimeFormat().resolvedOptions().timeZone;");
        console.log('Timezone:', timeZone);

        // Check WebGL and WebRTC
        let webgl = await driver.executeScript("return window.WebGLRenderingContext;");
        let webrtc = await driver.executeScript("return window.RTCPeerConnection;");
        console.log('WebGL:', webgl, 'WebRTC:', webrtc);

    } finally {
        await driver.quit();
    }
})();
